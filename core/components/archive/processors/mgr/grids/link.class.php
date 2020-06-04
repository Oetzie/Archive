<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveGridLinkProcessor extends modObjectGetProcessor
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

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Mixed.
     */
    public function process() {
        $templates = json_decode($this->getProperty('templates'), true);

        if (isset($templates['parent'], $templates['child'])) {
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
                        if ($this->getProperty('type') === 'unlink') {
                            $resource->fromArray([
                                'show_in_tree' => 1
                            ]);
                        } else {
                            $resource->fromArray([
                                'show_in_tree' => 0
                            ]);
                        }

                        $resource->save();
                    }
                }
            }
        }

        return parent::process();
    }
}

return 'ArchiveGridLinkProcessor';
