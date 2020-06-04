<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveResourcesSortProcessor extends modProcessor
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
    public $objectType = 'archive.resources';

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
    public function process()
    {
        $index = 0;

        foreach ((array) explode(',', $this->getProperty('sort')) as $id) {
            $object = $this->modx->getObject($this->classKey, [
                'id' => $id
            ]);

            if ($object) {
                $object->fromArray([
                    'menuindex' => $index
                ]);

                if ($object->save()) {
                    $index++;
                }
            }
        }

        return $this->success();
    }
}

return 'ArchiveResourcesSortProcessor';
