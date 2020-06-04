<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveResourcesGetListProcessor extends modObjectGetListProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'modResource';

    /**
     * @access public.
     * @var Array.
     */
    public $languageTopics = ['archive:default', 'archive:grids'];

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortField = 'id';

    /**
     * @access public.
     * @var String.
     */
    public $defaultSortDirection = 'DESC';

    /**
     * @access public.
     * @var String.
     */
    public $objectType = 'archive.resources';

    /**
     * @access public.
     * @var Array.
     */
    public $templates = [];

    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('archive', 'Archive', $this->modx->getOption('archive.core_path', null, $this->modx->getOption('core_path') . 'components/archive/') . 'model/archive/');

        $this->setDefaultProperties([
            'dateFormat' => $this->modx->getOption('manager_date_format') . ', ' . $this->modx->getOption('manager_time_format')
        ]);

        $archive = $this->modx->getObject('ArchiveGrid', [
            'id' => $this->getProperty('archive')
        ]);

        if ($archive) {
            $this->defaultSortField     = $archive->get('sort_field');
            $this->defaultSortDirection = strtoupper($archive->get('sort_dir'));

            foreach ((array) $archive->getTemplates('child') as $template) {
                $this->templates[] = $template->get('template_id');
            }
        }

        return parent::initialize();
    }

    /**
     * @access public.
     * @param xPDOQuery $criteria.
     * @return xPDOQuery.
     */
    public function prepareQueryBeforeCount(xPDOQuery $criteria)
    {
        $criteria->where([
            'parent'        => $this->getProperty('resource'),
            'template:IN'   => $this->templates
        ]);

        $query = $this->getProperty('query');

        if (!empty($query)) {
            $criteria->where([
                'pagetitle:LIKE'    => '%' . $query . '%',
                'OR:longtitle:LIKE' => '%' . $query . '%'
            ]);
        }

        return $criteria;
    }

    /**
     * @access public.
     * @param xPDOObject $object.
     * @return Array.
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = array_merge($object->toArray(), [
            'url'               => $this->modx->makeUrl($object->get('id'), '', '', 'full'),
            'title'             => htmlentities($object->get('pagetitle') . ($this->modx->hasPermission('tree_show_resource_ids') ? ' (' . $object->get('id') . ')' : ''), ENT_COMPAT, $this->modx->getOption('modx_charset', null, 'UTF-8')),
            'parent_formatted'  => ''
        ]);

        $parent = $this->modx->getObject('modResource', [
            'id' => $object->get('parent')
        ]);

        if ($parent) {
            $array['parent_formatted'] = htmlentities($parent->get('pagetitle') . ($this->modx->hasPermission('tree_show_resource_ids') ? ' (' . $parent->get('id') . ')' : ''), ENT_COMPAT, $this->modx->getOption('modx_charset', null, 'UTF-8'));
        }

        if (in_array($object->get('publishedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', '0', null], false)) {
            $array['publishedon'] = '';
        } else {
            $array['publishedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('publishedon')));
        }

        if (in_array($object->get('editedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', '0', null], false)) {
            $array['editedon'] = '';
        } else {
            $array['editedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('editedon')));
        }

        return $array;
    }
}

return 'ArchiveResourcesGetListProcessor';
