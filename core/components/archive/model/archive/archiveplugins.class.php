<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

require_once __DIR__ . '/archive.class.php';

class ArchivePlugins extends Archive
{
    /**
     * @access public.
     * @param Array $properties.
     */
    public function onDocFormRender(array $properties = [])
    {
        if ($properties['mode'] === 'upd') {
            $archive = $this->getArchiveByTemplate($properties['resource']->get('template'));

            if ($archive) {
                $firstArchiveTemplate = $archive->getFirstTemplate('child');

                $this->modx->regClientStartupHTMLBlock('<script type="text/javascript">
                    Ext.onReady(function() {
                        MODx.config.help_url = "' . $this->getHelpUrl() . '";
    
                        Archive.config = ' . $this->modx->toJSON(array_merge($this->config, [
                            'branding_url'          => $this->getBrandingUrl(),
                            'branding_url_help'     => $this->getHelpUrl(),
                            'record'                => array_merge($archive->toArray(), [
                                'title_formatted'       => $archive->getTitleFormatted(),
                                'description_formatted' => $archive->getDescriptionFormatted(),
                                'template'              => $firstArchiveTemplate->get('template_id') ?: 0
                            ]),
                            'resource'              => [
                                'id'                    => $properties['resource']->get('id')
                            ]
                        ])) . ';
                    });
                </script>');

                $this->modx->regClientCSS($this->config['css_url'] . '/mgr/archive.css');

                $this->modx->regClientStartupScript($this->config['js_url'] . '/mgr/archive.js');

                $this->modx->regClientStartupScript($this->config['js_url'] . '/mgr/widgets/resources.grid.js');
                $this->modx->regClientStartupScript($this->config['js_url'] . '/mgr/widgets/resource.panel.js');

                $this->modx->regClientStartupScript($this->config['js_url'] . '/mgr/sections/resource.panel.js');

                if (is_array($this->config['lexicons'])) {
                    foreach ($this->config['lexicons'] as $lexicon) {
                        $this->modx->controller->addLexiconTopic($lexicon);
                    }
                } else {
                    $this->modx->controller->addLexiconTopic($this->config['lexicons']);
                }
            }
        }
    }

    /**
     * @access public.
     * @param Array $properties.
     */
    public function onDocFormSave(array $properties = [])
    {
        if (isset($properties['resource'])) {
            $archive = $this->getArchiveByResource($properties['resource']);

            if ($archive) {
                $properties['resource']->set('show_in_tree', 0);
            } else {
                $properties['resource']->set('show_in_tree', 1);
            }

            $properties['resource']->save();
        }
    }
}
