<?php

	/**
	 * Archive
	 *
	 * Copyright 20167 by Oene Tjeerd de Bruin <modx@oetzie.nl>
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

	class ArchiveResourcesSortProcessor extends modProcessor {
		/**
		 * @access public.
		 * @var String.
		 */
		public $classKey = 'modResource';
		
		/**
		 * @access public.
		 * @var Array.
		 */
		public $languageTopics = array('archive:default');
		
		/**
		 * @access public.
		 * @var String.
		 */
		public $objectType = 'archive.resources';
		
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
		public function process() {
			$sort = $this->modx->fromJSON($this->getProperty('sort'));

			foreach ($sort as $key => $value) {
				if (null !== ($object = $this->modx->getObject($this->classKey, $value['id']))) {
					$object->fromArray(array(
						'menuindex' => $key
					));
					
					$object->save();
				}
			}

			return $this->outputArray(array());
		}
	}

	return 'ArchiveResourcesSortProcessor';

?>