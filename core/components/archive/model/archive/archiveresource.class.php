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
	
	class ArchiveResource extends modResource {
		/**
		 * @access public.
		 * @var Object.
		 */
		public $archive;
		
		/**
		 * @access public
		 * @var Boolean.
		 */
		public $showInContextMenu = true;
		
		/**
		 * @access public.
		 * @param Object $xpdo.
		 */
		public function __construct(& $xpdo) {
        	parent::__construct($xpdo);
        	
        	$this->set('class_key', 'ArchiveResource');
			$this->set('show_in_tree', false);
        	
			$this->archive = $this->xpdo->getService('archive', 'Archive', $this->xpdo->getOption('archive.core_path', null, $this->xpdo->getOption('core_path').'components/archive/').'model/archive/');
    	}
    	
    	/**
	     * @access public.
	     * @return String.
	     */
	    public function getResourceTypeName() {
			return $this->xpdo->lexicon('archive.archiveresource');
		}
    	
    	/**
	     * @access public.
	     * @return Array.
	     */
    	public function getContextMenuText() {
	        return array(
	            'text_create' 		=> $this->xpdo->lexicon('archive.archiveresource'),
	            'text_create_here' 	=> $this->xpdo->lexicon('archive.archiveresource')
	        );
	    }

	    /**
	     * @access public.
	     * @return String.
	     */
	    public static function getControllerPath(xPDO &$modx) {
			return $modx->getOption('archive.core_path', null, $modx->getOption('core_path').'components/archive/').'controllers/';
		}
	}
		
?>