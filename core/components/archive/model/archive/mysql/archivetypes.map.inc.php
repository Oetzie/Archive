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

	$xpdo_meta_map['ArchiveTypes']= array(
		'package' 	=> 'archive',
		'version' 	=> '1.0',
		'table' 	=> 'archive_types',
		'extends' 	=> 'xPDOSimpleObject',
		'fields' 	=> array(
			'id'			=> null,
			'name' 			=> null,
			'description' 	=> null,
			'title'			=> null,
			'position' 		=> null,
			'sort_field'	=> null,
			'sort_dir'		=> null,
			'sort_dd'		=> null,
			'class'			=> null,
			'template'		=> null,
			'child_template' => null,
			'active'		=> null,
			'editedon' 		=> null
		),
		'fieldMeta'	=> array(
			'id' 		=> array(
				'dbtype' 	=> 'int',
				'precision' => '11',
				'phptype' 	=> 'integer',
				'null' 		=> false,
				'index' 	=> 'pk',
				'generated'	=> 'native'
			),
			'name' 		=> array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'description' => array(
				'dbtype' 	=> 'text',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'title' 	=> array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'position' 	=> array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'sort_field' => array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'sort_dir' 	=> array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'null' 		=> false
			),
			'sort_dd'	=> array(
				'dbtype' 	=> 'int',
				'precision' => '1',
				'phptype' 	=> 'integer',
				'default' 	=> 0
			),
			'class'	 	=> array(
				'dbtype' 	=> 'varchar',
				'precision' => '75',
				'phptype' 	=> 'string',
				'default' 	=> 'ArchiveResource'
			),
			'template'	=> array(
				'dbtype' 	=> 'int',
				'precision' => '11',
				'phptype' 	=> 'integer',
				'null' 		=> false
			),
			'child_template' => array(
				'dbtype' 	=> 'int',
				'precision' => '11',
				'phptype' 	=> 'integer',
				'null' 		=> false
			),
			'active'	=> array(
				'dbtype' 	=> 'int',
				'precision' => '1',
				'phptype' 	=> 'integer',
				'null' 		=> false,
				'default'	=> 1
			),
			'editedon' 	=> array(
				'dbtype' 	=> 'timestamp',
				'phptype' 	=> 'timestamp',
				'attributes' => 'ON UPDATE CURRENT_TIMESTAMP',
				'null' 		=> false
			)
		),
		'indexes'	=> array(
			'PRIMARY'	=> array(
				'alias' 	=> 'PRIMARY',
				'primary' 	=> true,
				'unique' 	=> true,
				'columns' 	=> array(
					'id' 		=> array(
						'collation' => 'A',
						'null' 		=> false,
					)
				)
			)
		),
		'aggregates' => array(
			'modTemplate' => array(
				'local'			=> 'template',
				'class' 		=> 'modTemplate',
				'foreign' 		=> 'id',
				'owner' 		=> 'foreign',
				'cardinality' 	=> 'one'
			),
			'modTemplateChild' => array(
				'local'			=> 'child_template',
				'class' 		=> 'modTemplate',
				'foreign' 		=> 'id',
				'owner' 		=> 'foreign',
				'cardinality' 	=> 'one'
			)
		)
	);

?>