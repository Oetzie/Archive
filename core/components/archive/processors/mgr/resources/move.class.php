<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once MODX_CORE_PATH . '/model/modx/processors/resource/update.class.php';

class ArchiveResourceUpdateProcessor extends modResourceUpdateProcessor
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

        $this->setDefaultProperties([
            'parent' => $this->getProperty('new_parent')
        ]);

        return parent::initialize();
    }
}

return 'ArchiveResourceUpdateProcessor';
