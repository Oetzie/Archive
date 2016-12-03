<?php

	/**
	 * Archive
	 *
	 * Copyright 2016 by Oene Tjeerd de Bruin <info@oetzie.nl>
	 *
	 * This file is part of Archive, a real estate property listings component
	 * for MODX Revolution.
	 *
	 * Archive is free software; you can redistribute it and/or modify it under
	 * the terms of the GNU General Public License as published by the Free Software
	 * Foundation; either version 2 of the License, or (at your option) any later
	 * version.
	 *
	 * Archive is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License along with
	 * Archive; if not, write to the Free Software Foundation, Inc., 59 Temple Place,
	 * Suite 330, Boston, MA 02111-1307 USA
	 */

	if ('mgr' == $modx->context->key) {
	    switch($modx->event->name) {
	        case 'OnDocFormRender':
	            if ('upd' == $mode) {
    	            $archive = $modx->getService('archive', 'Archive', $modx->getOption('archive.core_path', null, $modx->getOption('core_path').'components/archive/').'model/archive/');
    
                    if ($archive instanceof Archive) {
                        $criterea = array(
                            'template' => $resource->template
                        );
                        
                        if (null !== ($config = $modx->getObject('ArchiveTypes', $criterea))) {
                            $modx->regClientStartupHTMLBlock('<script type="text/javascript">
            					Ext.onReady(function() {
                					MODx.config.help_url = "http://rtfm.modx.com/extras/revo/'.$archive->getHelpUrl().'";
                			
                					Archive.config = '.$modx->toJSON(array_merge(array(
                					    'resource'  => array(
                					        'id'        => $resource->id
                				        ),
                				        'archive'   => $config->toArray(),
                					), $archive->config)).';
                					
                					Ext.applyIf(MODx.lang, '.$modx->toJSON($modx->lexicon->loadCache($archive->config['namespace'])).');
                					Ext.applyIf(MODx.lang, '.$modx->toJSON($modx->lexicon->loadCache($archive->config['namespace'], 'types')).');
                				});
                			</script>');
                			
                			$modx->regClientCSS($archive->config['css_url'].'/mgr/archive.css');
                			
                            $modx->regClientStartupScript($archive->config['js_url'].'/mgr/archive.js');
                            $modx->regClientStartupScript($archive->config['js_url'].'/mgr/widgets/resources.grid.js');
                            $modx->regClientStartupScript($archive->config['js_url'].'/mgr/widgets/resource.panel.js');
                            $modx->regClientStartupScript($archive->config['js_url'].'/mgr/sections/resource.panel.js');
                        }
                    }
	            }
	            
	            break;
	    }
	}

	return;
	
?>