<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once dirname(__DIR__) . '/index.class.php';

class ArchiveHomeManagerController extends ArchiveManagerController
{
    /**
     * @access public.
     */
    public function loadCustomCssJs()
    {
        $this->addJavascript($this->modx->archive->config['js_url'] . 'mgr/widgets/home.panel.js');

        $this->addJavascript($this->modx->archive->config['js_url'] . 'mgr/widgets/grids.grid.js');

        $this->addLastJavascript($this->modx->archive->config['js_url'] . 'mgr/sections/home.js');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('archive');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getTemplateFile()
    {
        return $this->modx->archive->config['templates_path'] . 'home.tpl';
    }
}
