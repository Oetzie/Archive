<?php

/**
 * Archive
 *
 * Copyright 2020 by Oene Tjeerd de Bruin <modx@oetzie.nl>
 */

$xpdo_meta_map['ArchiveGridTemplate'] = [
    'package'       => 'archive',
    'version'       => '1.0',
    'table'         => 'archive_grid_template',
    'extends'       => 'xPDOSimpleObject',
    'tableMeta'     => [
        'engine'        => 'InnoDB'
    ],
    'fields'        => [
        'id'            => null,
        'grid_id'       => null,
        'template_id'   => null,
        'type'          => null
    ],
    'fieldMeta'     => [
        'id'            => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false,
            'index'         => 'pk',
            'generated'     => 'native'
        ],
        'grid_id'       => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false
        ],
        'template_id'   => [
            'dbtype'        => 'int',
            'precision'     => '11',
            'phptype'       => 'integer',
            'null'          => false
        ],
        'type'          => [
            'dbtype'        => 'varchar',
            'precision'     => '10',
            'phptype'       => 'string',
            'null'          => false
        ]
    ],
    'indexes'       => [
        'PRIMARY'       => [
            'alias'         => 'PRIMARY',
            'primary'       => true,
            'unique'        => true,
            'columns'       => [
                'id'            => [
                    'collation'     => 'A',
                    'null'          => false
                ]
            ]
        ]
    ],
    'aggregates'    => [
        'Grid'          => [
            'local'         => 'grid_id',
            'class'         => 'ArchiveGrid',
            'foreign'       => 'id',
            'owner'         => 'local',
            'cardinality'   => 'one'
        ],
        'Template'      => [
            'local'         => 'template_id',
            'class'         => 'modTemplate',
            'foreign'       => 'id',
            'owner'         => 'local',
            'cardinality'   => 'one'
        ]
    ]
];
