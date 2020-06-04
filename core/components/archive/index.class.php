<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

abstract class ArchiveManagerController extends modExtraManagerController
{
    /**
     * @access public.
     * @return Mixed.
     */
    public function initialize()
    {
        $this->modx->getService('archive', 'Archive', $this->modx->getOption('archive.core_path', null, $this->modx->getOption('core_path') . 'components/archive/') . 'model/archive/');

        $this->addCss($this->modx->archive->config['css_url'] . 'mgr/archive.css');

        $this->addJavascript($this->modx->archive->config['js_url'] . 'mgr/archive.js');

        $this->addJavascript($this->modx->archive->config['js_url'] . 'mgr/extras/extras.js');

        $this->addHtml('<script type="text/javascript">
            Ext.onReady(function() {
                MODx.config.help_url = "' . $this->modx->archive->getHelpUrl() . '";
        
                Archive.config = ' . $this->modx->toJSON(array_merge($this->modx->archive->config, [
                    'branding_url'          => $this->modx->archive->getBrandingUrl(),
                    'branding_url_help'     => $this->modx->archive->getHelpUrl()
                ])) . ';
            });
        </script>');

        return parent::initialize();
    }

    /**
     * @access public.
     * @return Array.
     */
    public function getLanguageTopics()
    {
        return $this->modx->archive->config['lexicons'];
    }

    /**
     * @access public.
     * @returns Boolean.
     */
    public function checkPermissions()
    {
        return $this->modx->hasPermission('archive');
    }
}

class IndexManagerController extends ArchiveManagerController
{
    /**
     * @access public.
     * @return String.
     */
    public static function getDefaultController()
    {
        return 'home';
    }
}
