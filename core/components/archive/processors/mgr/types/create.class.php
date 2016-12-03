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

	class ArchiveTypesCreateProcessor extends modObjectCreateProcessor {
		/**
		 * @acces public.
		 * @var String.
		 */
		public $classKey = 'ArchiveTypes';
		
		/**
		 * @acces public.
		 * @var Array.
		 */
		public $languageTopics = array('archive:default');
		
		/**
		 * @acces public.
		 * @var String.
		 */
		public $objectType = 'archive.types';
		
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
		
			list($field, $dir) = explode(':', $this->getProperty('sort'));
			
			$this->setDefaultProperties(array(
				'sort_field'	=> $field,
				'sort_dir'		=> $dir,
				'sort_dd'		=> 'menuindex' == $field ? 1 : 0
			));
			
			if (null === $this->getProperty('link_resources')) {
				$this->setProperty('link_resources', 0);
			}
			
			return parent::initialize();
		}
		
		/**
		 * @acces public.
		 * @return Mixed.
		 */
		public function beforeSave() {
			$criterea = array(
				'template'	=> $this->getProperty('template')	
			);
			
			if ($this->doesAlreadyExist($criterea)) {
				$this->addFieldError('template', $this->modx->lexicon('archive.archive_error_exists'));
			}

			return parent::beforeSave();
		}
		
		/**
		 * @acces public.
		 * @return Mixed.
		 */
		public function afterSave() {
			if (1 == $this->getProperty('link_resources')) {
				$criterea = array(
					'template' => $this->object->template
				);
				
				foreach ($this->modx->getCollection('modResource', $criterea) as $archive) {
					$criterea = array(
						'id:IN' 	=> $this->modx->getChildIds($archive->id, 10, array(
							'context' 	=> $archive->context_key
						)),
						'template' 	=> $this->object->child_template
					);
					
					foreach ($this->modx->getCollection('modResource', $criterea) as $resource) {
						$resource->fromArray(array(
							'class_key'		=> $this->object->get('class'),
							'show_in_tree'	=> 0
						));
						
						$resource->save();
					}
				}
			}
			
			return parent::afterSave();
		}
	}
	
	return 'ArchiveTypesCreateProcessor';
	
?>