Archive.grid.Types = function(config) {
    config = config || {};

	config.tbar = [{
        text		: _('archive.type_create'),
        cls			: 'primary-button',
        handler		: this.createType,
        scope		: this
    }, '->', {
        xtype		: 'textfield',
        name 		: 'archive-filter-search',
        id			: 'archive-filter-search',
        emptyText	: _('search')+'...',
        listeners	: {
	        'change'	: {
	        	fn			: this.filterSearch,
	        	scope		: this
	        },
	        'render'	: {
		        fn			: function(cmp) {
			        new Ext.KeyMap(cmp.getEl(), {
				        key		: Ext.EventObject.ENTER,
			        	fn		: this.blur,
				        scope	: cmp
			        });
		        },
		        scope		: this
	        }
        }
    }, {
    	xtype		: 'button',
    	cls			: 'x-form-filter-clear',
    	id			: 'archive-filter-clear',
    	text		: _('filter_clear'),
    	listeners	: {
        	'click'		: {
        		fn			: this.clearFilter,
        		scope		: this
        	}
        }
    }];
    
    expander = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p class="desc">{description_formatted}</p>'
        )
    });

    columns = new Ext.grid.ColumnModel({
       columns: [expander, {
            header		: _('archive.label_type_name'),
            dataIndex	: 'name_formatted',
            sortable	: true,
            editable	: false,
            width		: 150
        }, {
            header		: _('archive.label_type_template'),
            dataIndex	: 'template_name',
            sortable	: true,
            editable	: false,
            width		: 200,
            fixed 		: true
        }, {
            header		: _('archive.label_type_sort'),
            dataIndex	: 'sort_formatted',
            sortable	: true,
            editable	: false,
            width		: 200,
            fixed 		: true
        }, {
            header		: _('last_modified'),
            dataIndex	: 'editedon',
            sortable	: true,
            editable	: false,
            fixed		: true,
			width		: 200,
			renderer	: this.renderDate
        }]
    });
    
    Ext.applyIf(config, {
    	cm			: columns,
        id			: 'archive-grid-types',
        url			: Archive.config.connector_url,
        baseParams	: {
        	action		: 'mgr/types/getlist'
        },
        fields		: ['id', 'name', 'name_formatted', 'description', 'description_formatted', 'title', 'title_formatted', 'position', 'sort', 'sort_formatted', 'sort_field', 'sort_dir', 'sort_dd', 'class', 'template', 'template_name', 'child_template', 'child_template_name', 'active', 'editedon'],
        paging		: true,
        pageSize	: MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30,
        sortBy		: 'id',
        plugins		: expander,
        tools		: [{
            id			: 'plus',
            qtip 		: _('expand_all'),
            handler		: this.expandAll,
            scope		: this
        }, {
            id			: 'minus',
            hidden		: true,
            qtip 		: _('collapse_all'),
            handler		: this.collapseAll,
            scope		: this
        }]
    });
    
    Archive.grid.Types.superclass.constructor.call(this, config);
};

Ext.extend(Archive.grid.Types, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();
        
        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
	    this.getStore().baseParams.query = '';
	    
	    Ext.getCmp('archive-filter-search').reset();
	    
        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
	        text	: _('archive.type_update'),
	        handler	: this.updateType
	    }, '-', {
			text	: _('archive.type_link_resources'),
			handler	: this.linkResources 
		}, {
			text	: _('archive.type_unlink_resources'),
			handler	: this.unlinkResources 
		}, '-', {
		    text	: _('archive.type_remove'),
		    handler	: this.removeType
		}];
    },
    createType: function(btn, e) {
        if (this.createTypeWindow) {
	        this.createTypeWindow.destroy();
        }
        
        this.createTypeWindow = MODx.load({
	        xtype		: 'archive-window-type-create',
	        closeAction	:'close',
	        listeners	: {
		        'success'	: {
		        	fn			: function() {
	            		Ext.getCmp('modx-resource-tree').refresh();
	            		
	            		this.refresh();
	            	},
		        	scope		: this
		        }
	        }
        });
        
        this.createTypeWindow.show(e.target);
    },
    updateType: function(btn, e) {
        if (this.updateTypeWindow) {
	        this.updateTypeWindow.destroy();
        }
        
        this.updateTypeWindow = MODx.load({
	        xtype		: 'archive-window-type-update',
	        record		: this.menu.record,
	        closeAction	:'close',
	        listeners	: {
		        'success'	: {
		        	fn			: function() {
	            		Ext.getCmp('modx-resource-tree').refresh();
	            		
	            		this.refresh();
	            	},
		        	scope		: this
		        }
	        }
        });
        
        this.updateTypeWindow.setValues(this.menu.record);
        this.updateTypeWindow.show(e.target);
    },
    removeType: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.type_remove'),
        	text		: _('archive.type_remove_confirm'),
        	url			: Archive.config.connector_url,
        	params		: {
            	action		: 'mgr/types/remove',
            	id			: this.menu.record.id
            },
            listeners	: {
            	'success'	: {
            		fn			: function() {
	            		Ext.getCmp('modx-resource-tree').refresh();
	            		
	            		this.refresh();
	            	},
            		scope		: this
            	}
            }
    	});
    },
    linkResources: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.type_link_resources'),
        	text		: _('archive.type_link_resources_confirm', {
	        	template	: this.menu.record.child_template_name
	        }),
        	url			: Archive.config.connector_url,
        	params		: {
            	action		: 'mgr/types/link',
            	id			: this.menu.record.id,
            	type 		: 'link'
            },
            listeners	: {
            	'success'	: {
            		fn			: function() {
	            		Ext.getCmp('modx-resource-tree').refresh();
	            		
	            		this.refresh();
	            	},
            		scope		: this
            	}
            }
    	});
    },
    unlinkResources: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.type_unlink_resources'),
        	text		: _('archive.type_unlink_resources_confirm', {
	        	template	: this.menu.record.child_template_name
	        }),
        	url			: Archive.config.connector_url,
        	params		: {
            	action		: 'mgr/types/link',
            	id			: this.menu.record.id,
            	type 		: 'unlink'
            },
            listeners	: {
            	'success'	: {
            		fn			: function() {
	            		Ext.getCmp('modx-resource-tree').refresh();
	            		
	            		this.refresh();
	            	},
            		scope		: this
            	}
            }
    	});
    },
    renderBoolean: function(d, c) {
    	c.css = 1 == parseInt(d) || d ? 'green' : 'red';
    	
    	return 1 == parseInt(d) || d ? _('yes') : _('no');
    },
	renderDate: function(a) {
        if (Ext.isEmpty(a)) {
            return '—';
        }

        return a;
    }
});

Ext.reg('archive-grid-types', Archive.grid.Types);

Archive.window.CreateType = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
	    width		: 600,
    	autoHeight	: true,
        title 		: _('archive.type_create'),
        url			: Archive.config.connector_url,
        baseParams	: {
            action		: 'mgr/types/create'
        },
        fields		: [{
        	layout		: 'column',
        	border		: false,
            defaults	: {
                layout		: 'form',
                labelSeparator : ''
            },
        	items		: [{
	        	columnWidth	: .5,
	        	items		: [{
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_name'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_name_desc'),
		        	name		: 'name',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_name_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_title'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_title_desc'),
		        	name		: 'title',
		        	anchor		: '100%',
		        	value 		: 'archive.resources',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_title_desc'),
		            cls			: 'desc-under'
		        }, {
				    xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_description'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_description_desc'),
		        	name		: 'description',
		        	anchor		: '100%'
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_description_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'modx-combo-template',
		        	fieldLabel	: _('archive.label_type_template'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_template_desc'),
		        	hiddenName	: 'template',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_template_desc'),
		            cls			: 'desc-under'
		        }]
        	}, {
	        	columnWidth	: .5,
	        	style		: 'margin-right: 0;',
	        	items		: [{
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_class'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_class_desc'),
		        	name		: 'class',
		        	anchor		: '100%',
		        	allowBlank	: false,
		        	value 		: 'ArchiveResource'
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_class_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'archive-combo-position',
		        	fieldLabel	: _('archive.label_type_position'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_position_desc'),
		        	name		: 'position',
		        	anchor		: '100%',
		        	value		: 'tab',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_position_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'archive-combo-sort',
		        	fieldLabel	: _('archive.label_type_sort'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_sort_desc'),
		        	name		: 'sort',
		        	anchor		: '100%',
		        	value		: 'publishedon:DESC',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_sort_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'modx-combo-template',
		        	fieldLabel	: _('archive.label_type_template_child'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_template_child_desc'),
		        	hiddenName	: 'child_template',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_template_child_desc'),
		            cls			: 'desc-under'
		        }]
        	}]
        }, {
	        xtype		: 'checkbox',
	        hideLabel	: true,
	        boxLabel	: _('archive.label_type_link_resources'),
	        description	: MODx.expandHelp ? '' : _('archive.label_type_link_resources_desc'),
        	name		: 'link_resources',
        	inputValue	: 1,
        	checked		: true
        }, {
        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
            html		: _('archive.label_type_link_resources_desc'),
            cls			: 'desc-under'
        }]
    });
    
    Archive.window.CreateType.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.CreateType, MODx.Window);

Ext.reg('archive-window-type-create', Archive.window.CreateType);

Archive.window.UpdateType = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
	    width 		: 600,
    	autoHeight	: true,
        title 		: _('archive.type_update'),
        url			: Archive.config.connector_url,
        baseParams	: {
            action		: 'mgr/types/update'
        },
        fields		: [{
            xtype		: 'hidden',
            name		: 'id'
        }, {
        	layout		: 'column',
        	border		: false,
            defaults	: {
                layout		: 'form',
                labelSeparator : ''
            },
        	items		: [{
	        	columnWidth	: .5,
	        	items		: [{
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_name'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_name_desc'),
		        	name		: 'name',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_name_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_title'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_title_desc'),
		        	name		: 'title',
		        	anchor		: '100%',
		        	value 		: 'archive.resources',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_title_desc'),
		            cls			: 'desc-under'
		        }, {
				    xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_description'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_description_desc'),
		        	name		: 'description',
		        	anchor		: '100%'
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_description_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'modx-combo-template',
		        	fieldLabel	: _('archive.label_type_template'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_template_desc'),
		        	hiddenName	: 'template',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_template_desc'),
		            cls			: 'desc-under'
		        }]
        	}, {
	        	columnWidth	: .5,
	        	style		: 'margin-right: 0;',
	        	items		: [{
		        	xtype		: 'textfield',
		        	fieldLabel	: _('archive.label_type_class'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_class_desc'),
		        	name		: 'class',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_class_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'archive-combo-position',
		        	fieldLabel	: _('archive.label_type_position'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_position_desc'),
		        	name		: 'position',
		        	anchor		: '100%',
		        	value		: 'tab',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_position_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'archive-combo-sort',
		        	fieldLabel	: _('archive.label_type_sort'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_sort_desc'),
		        	name		: 'sort',
		        	anchor		: '100%',
		        	value		: 'publishedon:DESC',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_sort_desc'),
		            cls			: 'desc-under'
		        }, {
		        	xtype		: 'modx-combo-template',
		        	fieldLabel	: _('archive.label_type_template_child'),
		        	description	: MODx.expandHelp ? '' : _('archive.label_type_template_child_desc'),
		        	hiddenName	: 'child_template',
		        	anchor		: '100%',
		        	allowBlank	: false
		        }, {
		        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
		            html		: _('archive.label_type_template_child_desc'),
		            cls			: 'desc-under'
		        }]
        	}]
        }]
    });
    
    Archive.window.UpdateType.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.UpdateType, MODx.Window);

Ext.reg('archive-window-type-update', Archive.window.UpdateType);

Archive.combo.TypePosition = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
        store: new Ext.data.ArrayStore({
            mode	: 'local',
            fields	: ['type','label'],
            data	: [
            	['tab', _('archive.position_tab')],
				['content', _('archive.position_content')]
            ]
        }),
        remoteSort	: ['label', 'asc'],
        hiddenName	: 'position',
        valueField	: 'type',
        displayField: 'label',
        mode		: 'local'
    });
    
    Archive.combo.TypePosition.superclass.constructor.call(this,config);
};

Ext.extend(Archive.combo.TypePosition, MODx.combo.ComboBox);

Ext.reg('archive-combo-position', Archive.combo.TypePosition);

Archive.combo.TypeSort = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
        url			: Archive.config.connector_url,
        baseParams 	: {
            action		: 'mgr/types/getnodes',
            combo		: true
        },
        fields		: ['type', 'label'],
        hiddenName	: 'sort',
        valueField	: 'type',
        displayField: 'label'
    });
    
    Archive.combo.TypeSort.superclass.constructor.call(this,config);
};

Ext.extend(Archive.combo.TypeSort, MODx.combo.ComboBox);

Ext.reg('archive-combo-sort', Archive.combo.TypeSort);

Archive.combo.TypeSortDir = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
        store: new Ext.data.ArrayStore({
            mode	: 'local',
            fields	: ['type','label'],
            data	: [
            	['asc', _('archive.sort_dir_asc')],
				['desc', _('archive.sort_dir_desc')]
            ]
        }),
        remoteSort	: ['label', 'asc'],
        hiddenName	: 'sort_dir',
        valueField	: 'type',
        displayField: 'label',
        mode		: 'local'
    });
    
    Archive.combo.TypeSortDir.superclass.constructor.call(this,config);
};

Ext.extend(Archive.combo.TypeSortDir, MODx.combo.ComboBox);

Ext.reg('archive-combo-sort-dir', Archive.combo.TypeSortDir);