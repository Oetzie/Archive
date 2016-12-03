<?php

	if ($object->xpdo) {
	    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
	        case xPDOTransport::ACTION_INSTALL:
	            $modx =& $object->xpdo;
	            $modx->addPackage('archive', $modx->getOption('archive.core_path', null, $modx->getOption('core_path').'components/archive/').'model/');
	
				$modx->addExtensionPackage('archive', '[[++core_path]]components/archive/model/');
				
	            $manager = $modx->getManager();
	
	            $manager->createObjectContainer('ArchiveTypes');
	            
	            break;
	        case xPDOTransport::ACTION_UPGRADE:
	            break;
	    }
	}
	
	return true;