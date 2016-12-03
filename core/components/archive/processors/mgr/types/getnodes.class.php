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

	class ArchiveTypesFieldsGetNodesProcessor extends modProcessor {
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
			
			return parent::initialize();
		}
		
		/**
		 * @acces public.
		 * @return Array.
		 */
		public function process() {
			$fields = array('id', 'pagetitle', 'longtitle', 'description', 'menuindex', 'createdon', 'editedon', 'deletedon', 'publishedon', 'menutitle');

			$output = array();
			
			foreach ($fields as $key => $value) {
				$output[] = array(
					'type'	=> $value.':ASC',
					'label'	=> $this->modx->lexicon('archive.sort_field_'.$value).' ('.$this->modx->lexicon('archive.sort_dir_asc').')'	
				);
				
				$output[] = array(
					'type'	=> $value.':DESC',
					'label'	=> $this->modx->lexicon('archive.sort_field_'.$value).' ('.$this->modx->lexicon('archive.sort_dir_desc').')'	
				);
			}

			return $this->outputArray($output);
		}
	}

	return 'ArchiveTypesFieldsGetNodesProcessor';
	
?>