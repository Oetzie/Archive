<?php
/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

if (in_array($modx->event->name, ['OnDocFormRender', 'OnDocFormSave'], true)) {
    $instance = $modx->getService('archiveplugins', 'ArchivePlugins', $modx->getOption('archive.core_path', null, $modx->getOption('core_path').'components/archive/') . 'model/archive/');

    if ($instance instanceof ArchivePlugins) {
        $method = lcfirst($modx->event->name);

        if (method_exists($instance, $method)) {
            $instance->$method($scriptProperties);
        }
    }
}