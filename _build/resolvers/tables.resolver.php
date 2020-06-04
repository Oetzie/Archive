<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

if ($object->xpdo) {
    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
            $modx =& $object->xpdo;
            $modx->addPackage('archive', $modx->getOption('archive.core_path', null, $modx->getOption('core_path') . 'components/archive/') . 'model/');

            $manager = $modx->getManager();

            $manager->createObjectContainer('ArchiveGrid');
            $manager->createObjectContainer('ArchiveGridTemplate');

            break;
    }
}

return true;
