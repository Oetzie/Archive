<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveGridGetListProcessor extends modObjectGetListProcessor
{
    /**
     * @access public.
     * @var String.
     */
    public $classKey = 'ArchiveGrid';

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
    public $objectType = 'archive.grid';

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

        return parent::initialize();
    }

    /**
     * @access public.
     * @param xPDOQuery $criteria.
     * @return xPDOQuery.
     */
    public function prepareQueryBeforeCount(xPDOQuery $criteria)
    {
        $query = $this->getProperty('query');

        if (!empty($query)) {
            $criteria->where([
                'title:LIKE'            => '%' . $query . '%',
                'OR:description:LIKE'   => '%' . $query . '%'
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
            'title_formatted'       => $object->getTitleFormatted(),
            'description_formatted' => $object->getDescriptionFormatted(),
            'sort'                  => $object->get('sort_field') . ':' . strtoupper($object->get('sort_dir')),
            'sort_formatted'        => $this->modx->lexicon('archive.sort_field_' . $object->get('sort_field')) . ' (' . $this->modx->lexicon('archive.sort_dir_' . strtolower($object->get('sort_dir'))) . ')',
            'templates'             => [
                'parent'                => [],
                'child'                 => []
            ],
            'templates_formatted'   => [
                'parent'                => [],
                'child'                 => []
            ]
        ]);

        foreach (['parent', 'child'] as $type) {
            foreach ((array) $object->getTemplates($type) as $template) {
                $array['templates'][$type][] = [
                    'id'            => $template->get('id'),
                    'template_id'   => $template->get('template_id'),
                    'template_name' => $template->get('template_templatename')
                ];

                $array['templates_formatted'][$type][] = $template->get('template_id');
            }
        }

        if (in_array($object->get('editedon'), ['-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null], true)) {
            $array['editedon'] = '';
        } else {
            $array['editedon'] = date($this->getProperty('dateFormat'), strtotime($object->get('editedon')));
        }

        return $array;
    }
}

return 'ArchiveGridGetListProcessor';
