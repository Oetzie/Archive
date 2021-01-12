<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class Archive
{
    /**
     * @access public.
     * @var modX.
     */
    public $modx;

    /**
     * @access public.
     * @var Array.
     */
    public $config = [];

    /**
     * @access public.
     * @param modX $modx.
     * @param Array $config.
     */
    public function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;

        $corePath   = $this->modx->getOption('archive.core_path', $config, $this->modx->getOption('core_path') . 'components/archive/');
        $assetsUrl  = $this->modx->getOption('archive.assets_url', $config, $this->modx->getOption('assets_url') . 'components/archive/');
        $assetsPath = $this->modx->getOption('archive.assets_path', $config, $this->modx->getOption('assets_path') . 'components/archive/');

        $this->config = array_merge([
            'namespace'             => 'archive',
            'lexicons'              => ['archive:default', 'archive:grids'],
            'base_path'             => $corePath,
            'core_path'             => $corePath,
            'model_path'            => $corePath . 'model/',
            'processors_path'       => $corePath . 'processors/',
            'elements_path'         => $corePath . 'elements/',
            'chunks_path'           => $corePath . 'elements/chunks/',
            'plugins_path'          => $corePath . 'elements/plugins/',
            'snippets_path'         => $corePath . 'elements/snippets/',
            'templates_path'        => $corePath . 'templates/',
            'assets_path'           => $assetsPath,
            'js_url'                => $assetsUrl . 'js/',
            'css_url'               => $assetsUrl . 'css/',
            'assets_url'            => $assetsUrl,
            'connector_url'         => $assetsUrl . 'connector.php',
            'version'               => '1.1.1',
            'branding_url'          => $this->modx->getOption('archive.branding_url', null, ''),
            'branding_help_url'     => $this->modx->getOption('archive.branding_url_help', null, ''),
        ], $config);

        $this->modx->addPackage('archive', $this->config['model_path']);

        if (is_array($this->config['lexicons'])) {
            foreach ($this->config['lexicons'] as $lexicon) {
                $this->modx->lexicon->load($lexicon);
            }
        } else {
            $this->modx->lexicon->load($this->config['lexicons']);
        }
    }

    /**
     * @access public.
     * @return String|Boolean.
     */
    public function getHelpUrl()
    {
        if (!empty($this->config['branding_help_url'])) {
            return $this->config['branding_help_url'] . '?v=' . $this->config['version'];
        }

        return false;
    }

    /**
     * @access public.
     * @return String|Boolean.
     */
    public function getBrandingUrl()
    {
        if (!empty($this->config['branding_url'])) {
            return $this->config['branding_url'];
        }

        return false;
    }

    /**
     * @access public.
     * @param String $key.
     * @param Array $options.
     * @param Mixed $default.
     * @return Mixed.
     */
    public function getOption($key, array $options = [], $default = null)
    {
        if (isset($options[$key])) {
            return $options[$key];
        }

        if (isset($this->config[$key])) {
            return $this->config[$key];
        }

        return $this->modx->getOption($this->config['namespace'] . '.' . $key, $options, $default);
    }

    /**
     * @access public.
     * @param Integer $template.
     * @return Object|Null.
     */
    public function getArchiveByTemplate($template)
    {
        $criteria = $this->modx->newQuery('ArchiveGrid');

        $criteria->select($this->modx->getSelectColumns('ArchiveGrid', 'ArchiveGrid'));

        $criteria->innerJoin('ArchiveGridTemplate', 'ArchiveGridTemplate', [
            'ArchiveGridTemplate.type = "parent"',
            'ArchiveGridTemplate.grid_id = ArchiveGrid.id'
        ]);

        $criteria->where([
            'ArchiveGridTemplate.template_id' => $template
        ]);

        return $this->modx->getObject('ArchiveGrid', $criteria);
    }

    /**
     * @access public.
     * @param Object $resource.
     * @return Object|Null.
     */
    public function getArchiveByResource($resource)
    {
        if ($resource) {
            $criteria = $this->modx->newQuery('ArchiveGrid');

            $criteria->select($this->modx->getSelectColumns('ArchiveGrid', 'ArchiveGrid'));

            $criteria->innerJoin('ArchiveGridTemplate', 'ArchiveGridTemplateParent', [
                'ArchiveGridTemplateParent.type = "parent"',
                'ArchiveGridTemplateParent.grid_id = ArchiveGrid.id'
            ]);

            $criteria->innerJoin('ArchiveGridTemplate', 'ArchiveGridTemplateChild', [
                'ArchiveGridTemplateChild.type = "child"',
                'ArchiveGridTemplateChild.grid_id = ArchiveGrid.id'
            ]);

            $criteria->innerJoin('modResource', 'modResource', [
                'modResource.template = ArchiveGridTemplateParent.template_id'
            ]);

            $criteria->where([
                'modResource.id'                        => $resource->get('parent'),
                'ArchiveGridTemplateChild.template_id'  => $resource->get('template'),
            ]);

            return $this->modx->getObject('ArchiveGrid', $criteria);
        }

        return null;
    }
}
