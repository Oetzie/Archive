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
	
	class ArchiveResource extends modResource {
		/**
		 * @acces public.
		 * @var Object.
		 */
		public $archive;
		
		/**
		 * @acces public
		 * @var Boolean.
		 */
		public $showInContextMenu = true;
		
		/**
		 * @acces public.
		 * @param Object $xpdo.
		 */
		function __construct(& $xpdo) {
        	parent::__construct($xpdo);
        	
        	$this->set('class_key', 'ArchiveResource');
			$this->set('show_in_tree', false);
        	
			$this->webshop = $this->xpdo->getService('archive', 'Archive', $this->xpdo->getOption('archive.core_path', null, $this->xpdo->getOption('core_path').'components/archive/').'model/archive/');
    	}
    	
    	/**
	     * @acces public.
	     * @return String.
	     */
	    public function getResourceTypeName() {
			return $this->xpdo->lexicon('archive.archiveresource');
		}
    	
    	/**
	     * @acces public.
	     * @return Array.
	     */
    	public function getContextMenuText() {
	        return array(
	            'text_create' 		=> $this->xpdo->lexicon('archive.archiveresource'),
	            'text_create_here' 	=> $this->xpdo->lexicon('archive.archiveresource')
	        );
	    }

	    /**
	     * @acces public.
	     * @return String.
	     */
	    public static function getControllerPath(xPDO &$modx) {
			return $modx->getOption('archive.core_path', null, $modx->getOption('core_path').'components/archive/').'controllers/';
		}
	}
	
?>