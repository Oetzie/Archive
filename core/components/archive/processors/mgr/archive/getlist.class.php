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

	class ArchiveResourcesGetListProcessor extends modObjectGetListProcessor {
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
		public $defaultSortField = 'id';
		
		/**
		 * @access public.
		 * @var String.
		 */
		public $defaultSortDirection = 'DESC';
		
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
			
			$this->setDefaultProperties(array(
				'dateFormat' => $this->modx->getOption('manager_date_format') .', '. $this->modx->getOption('manager_time_format')
			));
			
			if (null !== ($archive = $this->modx->getObject('ArchiveTypes', $this->getProperty('archive')))) {
				$this->defaultSortField 	= $archive->sort_field;
				$this->defaultSortDirection	= strtoupper($archive->sort_dir);
				
				$this->setProperty('class', $archive->get('class'));
			}
			
			return parent::initialize();
		}
		
		/**
		 * @access public.
		 * @param Object $c.
		 * @return Object.
		 */
		public function prepareQueryBeforeCount(xPDOQuery $c) {
			$c->where(array(
				'parent'	=> $this->getProperty('id'),
				'class_key'	=> $this->getProperty('class')
			));
			
			$query = $this->getProperty('query');
			
			if (!empty($query)) {
				$c->where(array(
					'pagetitle:LIKE' 	=> '%'.$query.'%',
					'OR:longtitle:LIKE'	=> '%'.$query.'%'
				));
			}
			
			return $c;
		}
		
		/**
		 * @access public.
		 * @param Object $object.
		 * @return Array.
		 */
		public function prepareRow(xPDOObject $object) {
			$array = array_merge($object->toArray(), array(
				'url' 				=> $this->modx->makeUrl($object->id, '', '', 'full'),
				'title'				=> htmlentities($object->pagetitle.($this->modx->hasPermission('tree_show_resource_ids') ? ' ('.$object->id.')' : ''), ENT_COMPAT, $this->modx->getOption('modx_charset', null, 'UTF-8')),
				'parent_formatted'	=> ''
			));
			
			if (null !== ($parent = $this->modx->getObject('modResource', $object->parent))) {
				$array['parent_formatted'] = htmlentities($parent->pagetitle.($this->modx->hasPermission('tree_show_resource_ids') ? ' ('.$parent->id.')' : ''), ENT_COMPAT, $this->modx->getOption('modx_charset', null, 'UTF-8'));
			}
			
			if (in_array($array['publishedon'], array('-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null))) {
				$array['publishedon'] = '';
			} else {
				$array['publishedon'] = date($this->getProperty('dateFormat'), strtotime($array['publishedon']));
			}
			
			if (in_array($array['editedon'], array('-001-11-30 00:00:00', '-1-11-30 00:00:00', '0000-00-00 00:00:00', null))) {
				$array['editedon'] = '';
			} else {
				$array['editedon'] = date($this->getProperty('dateFormat'), strtotime($array['editedon']));
			}
			
			return $array;	
		}
	}

	return 'ArchiveResourcesGetListProcessor';
	
?>