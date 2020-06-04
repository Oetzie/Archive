<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveGridUpdateProcessor extends modObjectUpdateProcessor
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
    public $objectType = 'archive.grid';

    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('archive', 'Archive', $this->modx->getOption('archive.core_path', null, $this->modx->getOption('core_path') . 'components/archive/') . 'model/archive/');

        if ($this->getProperty('link_resources') === null) {
            $this->setProperty('link_resources', 0);
        }

        return parent::initialize();
    }
    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSet()
    {
        list($field, $dir) = explode(':', $this->getProperty('sort'));

        $this->setProperty('sort_field', $field);
        $this->setProperty('sort_dir', $dir);

        $this->setProperty('sort_dd', $field === 'menuindex');

        return parent::beforeSave();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function beforeSave()
    {
        foreach ((array) $this->getProperty('templates') as $key => $templates) {
            if ($key === 'parent') {
                foreach ((array) $templates as $template) {
                    $criterea = [
                        'grid_id:!='    => $this->object->get('id'),
                        'template_id'   => $template,
                        'type'          => 'parent'
                    ];

                    if ($this->modx->getCount('ArchiveGridTemplate', $criterea)) {
                        $this->addFieldError('title', $this->modx->lexicon('archive.archive_error_exists'));
                    }
                }
            }
        }

        return parent::beforeSave();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function afterSave()
    {
        $this->modx->removeCollection('ArchiveGridTemplate', [
            'grid_id' => $this->object->get('id')
        ]);

        $templates = (array) $this->getProperty('templates');

        if (isset($templates['parent'], $templates['child'])) {
            foreach ($templates as $key => $values) {
                foreach ((array) $values as $template) {
                    $object = $this->modx->newObject('ArchiveGridTemplate', [
                        'grid_id'       => $this->object->get('id'),
                        'template_id'   => $template,
                        'type'          => $key
                    ]);

                    if ($object) {
                        $object->save();
                    }
                }
            }

            if ((int) $this->getProperty('link_resources') === 1) {
                foreach ((array) $templates['parent'] as $template) {
                    $criteria = [
                        'template' => $template
                    ];

                    foreach ($this->modx->getCollection('modResource', $criteria) as $parent) {
                        $criteria = [
                            'parent'        => $parent->get('id'),
                            'context_key'   => $parent->get('context_key'),
                            'template:IN'   => (array) $templates['child']
                        ];

                        foreach ($this->modx->getCollection('modResource', $criteria) as $resource) {
                            $resource->fromArray([
                                'show_in_tree'  => 0
                            ]);

                            $resource->save();
                        }
                    }
                }
            }
        }

        return parent::afterSave();
    }
}

return 'ArchiveGridUpdateProcessor';
