<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

class ArchiveGrid extends xPDOSimpleObject
{
    /**
     * @access public.
     * @return String.
     */
    public function getTitleFormatted()
    {
        $lexicon    = 'archive.grid_' . $this->get('title');
        $formatted  = $this->xpdo->lexicon($lexicon);

        if ($formatted !== $lexicon) {
            return $formatted;
        }

        return $this->get('title');
    }

    /**
     * @access public.
     * @return String.
     */
    public function getDescriptionFormatted()
    {
        $lexicon    = 'archive.grid_' . $this->get('title') . '_desc';
        $formatted  = $this->xpdo->lexicon($lexicon);

        if ($formatted !== $lexicon) {
            return $formatted;
        }

        return $this->get('description');
    }

    /**
     * @access public.
     * @param String $type.
     * @return Array.
     */
    public function getTemplates($type = null)
    {
        $templates = [];

        $criteria = $this->xpdo->newQuery('ArchiveGridTemplate');

        $criteria->select($this->xpdo->getSelectColumns('ArchiveGridTemplate', 'ArchiveGridTemplate'));
        $criteria->select($this->xpdo->getSelectColumns('modTemplate', 'modTemplate', 'template_', ['templatename']));

        $criteria->innerJoin('modTemplate', 'modTemplate', 'modTemplate.id = ArchiveGridTemplate.template_id');

        $criteria->where([
            'ArchiveGridTemplate.grid_id'   => $this->get('id'),
            'ArchiveGridTemplate.type'      => $type
        ]);

        foreach ($this->xpdo->getCollection('ArchiveGridTemplate', $criteria) as $template) {
            $templates[] = $template;
        }

        return $templates;
    }

    /**
     * @access public.
     * @param String $type.
     * @return Object|Null.
     */
    public function getFirstTemplate($type = null)
    {
        $criteria = $this->xpdo->newQuery('ArchiveGridTemplate');

        $criteria->select($this->xpdo->getSelectColumns('ArchiveGridTemplate', 'ArchiveGridTemplate'));
        $criteria->select($this->xpdo->getSelectColumns('modTemplate', 'modTemplate', 'template_', ['templatename']));

        $criteria->innerJoin('modTemplate', 'modTemplate', 'modTemplate.id = ArchiveGridTemplate.template_id');

        $criteria->where([
            'ArchiveGridTemplate.grid_id'   => $this->get('id'),
            'ArchiveGridTemplate.type'      => $type
        ]);

        $criteria->limit(1);
        $criteria->sortby('ArchiveGridTemplate.id', 'ASC');

        return $this->xpdo->getObject('ArchiveGridTemplate', $criteria);
    }
}
