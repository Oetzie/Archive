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
	 
	require_once MODX_CORE_PATH.'/model/modx/processors/resource/update.class.php'; 
	 
	class ArchiveResourceUpdateProcessor extends modResourceUpdateProcessor {
		public $beforeSaveEvent = '';
		public $afterSaveEvent = '';
    
		/**
		 * @acces public.
		 * @var String.
		 */
		public $classKey = 'modResource';
		
		/**
		 * @acces public.
		 * @var Array.
		 */
		public $languageTopics = array('archive:default');
		
		/**
		 * @acces public.
		 * @var String.
		 */
		public $objectType = 'archive.resources';
		
		/**
		 * @acces public.
		 * @var Object.
		 */
		public $archive;
    
		/**
		 * @acces public.
		 * @return Mixed.
		 */
		public function initialize() {
			$this->archive = $this->modx->getService('archive', 'Archive', $this->modx->getOption('archive.core_path', null, $this->modx->getOption('core_path').'components/archive/').'model/archive/');

			$this->setDefaultProperties(array(
				'parent' => $this->getProperty('new_parent')
			));
			
			return parent::initialize();
		}
		
		/**
		 * @acces public.
		 * @return Mixed.
		 */
		public function beforeSave() {			
			if (null !== ($parent = $this->modx->getObject($this->classKey, $this->getProperty('old_parent')))) {
				if (null !== ($newParent = $this->modx->getObject($this->classKey, $this->getProperty('new_parent')))) {
					if ($parent->template != $newParent->template) {
						if (null !== ($template = $this->modx->getObject('modTemplate', $parent->template))) {
							$this->addFieldError('parent-cmb', $this->modx->lexicon('archive.resource_error_wrong_parent', array(
								'template' => $name = $template->templatename
							)));
						} else {
							$this->addFieldError('parent-cmb', $this->modx->lexicon('archive.resource_error_wrong_parent'));
						}
					}
				}
			}

			return parent::beforeSave();
		}
	}
	
	return 'ArchiveResourceUpdateProcessor';
	
?>