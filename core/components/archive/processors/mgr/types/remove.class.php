<?php

	/**
	 * Archive
	 *
	 * Copyright 2017 by Oene Tjeerd de Bruin <modx@oetzie.nl>
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
	 
	class ArchiveTypesRemoveProcessor extends modObjectRemoveProcessor {
		/**
		 * @access public.
		 * @var String.
		 */
		public $classKey = 'ArchiveTypes';
		
		/**
		 * @access public.
		 * @var Array.
		 */
		public $languageTopics = array('archive:default');
		
		/**
		 * @access public.
		 * @var String.
		 */
		public $objectType = 'archive.types';
		
		/**
		 * @access public.
		 * @var Object.
		 */
		public $archive;
		
		/**
		 * @access public.
		 * @return Mixed.
		 */
		public function initialize() {
			$this->archive = $this->modx->getService('archive', 'Archive', $this->modx->getOption('archive.core_path', null, $this->modx->getOption('core_path').'components/archive/').'model/archive/');

			return parent::initialize();
		}
		
		/**
		 * @access public.
		 * @return Mixed.
		 */
		public function afterRemove() {
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
						'class_key'		=> 'modDocument',
						'show_in_tree'	=> 1
					));

					$resource->save();
				}
			}

			return parent::afterRemove();
		}
	}
	
	return 'ArchiveTypesRemoveProcessor';
?>