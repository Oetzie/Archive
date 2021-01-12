Archive.grid.Grids = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('archive.grid_create'),
        cls         : 'primary-button',
        handler     : this.createGrid,
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'archive-filter-grids-search',
        id          : 'archive-filter-grids-search',
        emptyText   : _('search') + '...',
        listeners   : {
            'change'    : {
                fn          : this.filterSearch,
                scope       : this
            },
            'render'    : {
                fn          : function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key     : Ext.EventObject.ENTER,
                        fn      : this.blur,
                        scope   : cmp
                    });
                },
                scope       : this
            }
        }
    }, {
        xtype       : 'button',
        cls         : 'x-form-filter-clear',
        id          : 'archive-filter-grids-clear',
        text        : _('filter_clear'),
        listeners   : {
            'click'     : {
                fn          : this.clearFilter,
                scope       : this
            }
        }
    }];
    
    var expander = new Ext.grid.RowExpander({
        tpl : new Ext.Template('<p class="desc">{description_formatted}</p>')
    });

    var columns = new Ext.grid.ColumnModel({
        columns      : [expander, {
            header      : _('archive.label_title'),
            dataIndex   : 'title_formatted',
            sortable    : true,
            editable    : false,
            width       : 150
        }, {
            header      : _('archive.label_template'),
            dataIndex   : 'templates',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderTemplates,
            type        : 'parent'
        }, {
            header      : _('archive.label_template_child'),
            dataIndex   : 'templates',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderTemplates,
            type        : 'child'
        }, {
            header      : _('archive.label_sort'),
            dataIndex   : 'sort_formatted',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true
        }, {
            header      : _('last_modified'),
            dataIndex   : 'editedon',
            sortable    : true,
            editable    : false,
            width       : 200,
            fixed       : true,
            renderer    : this.renderDate
        }]
    });
    
    Ext.applyIf(config, {
        cm          : columns,
        id          : 'archive-grid-grids',
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/grids/getlist'
        },
        fields      : ['id', 'title', 'description', 'position', 'sort', 'sort_field', 'sort_dir', 'sort_dd', 'editedon', 'title_formatted', 'description_formatted', 'sort', 'sort_formatted', 'templates', 'templates_formatted'],
        paging      : true,
        pageSize    : MODx.config.default_per_page > 30 ? MODx.config.default_per_page : 30,
        sortBy      : 'id',
        plugins     : expander,
        tools       : [{
            id          : 'plus',
            qtip        : _('expand_all'),
            handler     : this.expandAll,
            scope       : this
        }, {
            id          : 'minus',
            hidden      : true,
            qtip        : _('collapse_all'),
            handler     : this.collapseAll,
            scope       : this
        }]
    });
    
    Archive.grid.Grids.superclass.constructor.call(this, config);
};

Ext.extend(Archive.grid.Grids, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();

        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('archive-filter-grids-search').reset();

        this.getBottomToolbar().changePage(1);
    },
    getMenu: function() {
        return [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + _('archive.grid_update'),
            handler : this.updateGrid,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-link"></i>' + _('archive.grid_link_resources'),
            handler : this.linkGridResources,
            scope   : this
        }, {
            text    : '<i class="x-menu-item-icon icon icon-unlink"></i>' + _('archive.grid_unlink_resources'),
            handler : this.unlinkGridResources,
            scope   : this
        }, '-', {
            text    : '<i class="x-menu-item-icon icon icon-times"></i>' + _('archive.grid_remove'),
            handler : this.removeGrid,
            scope   : this
        }];
    },
    createGrid: function(btn, e) {
        if (this.createGridWindow) {
            this.createGridWindow.destroy();
        }
        
        this.createGridWindow = MODx.load({
            xtype       : 'archive-window-grid-create',
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : function() {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree && tree.isVisible()) {
                            tree.refresh();
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
        
        this.createGridWindow.show(e.target);
    },
    updateGrid: function(btn, e) {
        if (this.updateGridWindow) {
            this.updateGridWindow.destroy();
        }

        this.updateGridWindow = MODx.load({
            xtype       : 'archive-window-grid-update',
            record      : this.menu.record,
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : function() {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree && tree.isVisible()) {
                            tree.refresh();
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
        
        this.updateGridWindow.setValues(this.menu.record);
        this.updateGridWindow.show(e.target);
    },
    removeGrid: function(btn, e) {
        var templates = {};

        Ext.iterate(this.menu.record.templates, function (type, values) {
            templates[type] = [];

            Ext.iterate(values, function (value) {
                templates[type].push(value.template_id);
            });
        });

        MODx.msg.confirm({
            title       : _('archive.grid_remove'),
            text        : _('archive.grid_remove_confirm'),
            url         : Archive.config.connector_url,
            params      : {
                action      : 'mgr/grids/remove',
                id          : this.menu.record.id,
                templates   : Ext.encode(templates)
            },
            listeners   : {
                'success'   : {
                    fn          : function() {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree && tree.isVisible()) {
                            tree.refresh();
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
    },
    linkGridResources: function(btn, e) {
        var templates       = {};
        var templateNames   = [];

        Ext.iterate(this.menu.record.templates, function (type, values) {
            templates[type] = [];

            Ext.iterate(values, function (value) {
                templates[type].push(value.template_id);

                if (type === 'child') {
                    templateNames.push(value.template_name);
                }
            });
        });

        MODx.msg.confirm({
            title       : _('archive.grid_unlink_resources'),
            text        : _('archive.grid_unlink_resources_confirm', {
                templates   : templateNames.join(', ')
            }),
            url         : Archive.config.connector_url,
            params      : {
                action      : 'mgr/grids/link',
                id          : this.menu.record.id,
                templates   : Ext.encode(templates),
                type        : 'link'
            },
            listeners   : {
                'success'   : {
                    fn          : function() {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree && tree.isVisible()) {
                            tree.refresh();
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
    },
    unlinkGridResources: function(btn, e) {
        var templates       = {};
        var templateNames   = [];

        Ext.iterate(this.menu.record.templates, function (type, values) {
            templates[type] = [];

            Ext.iterate(values, function (value) {
                templates[type].push(value.template_id);

                if (type === 'child') {
                    templateNames.push(value.template_name);
                }
            });
        });

        MODx.msg.confirm({
            title       : _('archive.grid_unlink_resources'),
            text        : _('archive.grid_unlink_resources_confirm', {
                templates   : templateNames.join(', ')
            }),
            url         : Archive.config.connector_url,
            params      : {
                action      : 'mgr/grids/link',
                id          : this.menu.record.id,
                templates   : Ext.encode(templates),
                type        : 'unlink'
            },
            listeners   : {
                'success'   : {
                    fn          : function() {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree && tree.isVisible()) {
                            tree.refresh();
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
    },
    renderTemplates: function(d, c) {
        var templates = [];

        Ext.iterate(d[this.type], function (value) {
            templates.push(value.template_name);
        });

        return templates.join(', ');
    },
    renderBoolean: function(d, c) {
        c.css = parseInt(d) === 1 || d ? 'green' : 'red';

        return parseInt(d) === 1 || d ? _('yes') : _('no');
    },
    renderDate: function(a) {
        if (Ext.isEmpty(a)) {
            return '—';
        }

        return a;
    }
});

Ext.reg('archive-grid-grids', Archive.grid.Grids);

Archive.window.CreateGrid = function(config) {
    config = config || {};
    
    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('archive.grid_create'),
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/grids/create'
        },
        fields      : [{
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('archive.label_type_title'),
                    description : MODx.expandHelp ? '' : _('archive.label_type_title_desc'),
                    name        : 'title',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_title_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'textarea',
                    fieldLabel  : _('archive.label_description'),
                    description : MODx.expandHelp ? '' : _('archive.label_description_desc'),
                    name        : 'description',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_description_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-template',
                    fieldLabel  : _('archive.label_template'),
                    description : MODx.expandHelp ? '' : _('archive.label_template_desc'),
                    hiddenName  : 'templates[parent]',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_template_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-template',
                    fieldLabel  : _('archive.label_template_child'),
                    description : MODx.expandHelp ? '' : _('archive.label_template_child_desc'),
                    hiddenName  : 'templates[child]',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_template_child_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'archive-combo-position',
                    fieldLabel  : _('archive.label_position'),
                    description : MODx.expandHelp ? '' : _('archive.label_position_desc'),
                    name        : 'position',
                    anchor      : '100%',
                    value       : 'tab',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_position_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-sort',
                    fieldLabel  : _('archive.label_sort'),
                    description : MODx.expandHelp ? '' : _('archive.label_sort_desc'),
                    name        : 'sort',
                    anchor      : '100%',
                    value       : 'publishedon:DESC',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_sort_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'checkbox',
                    hideLabel   : true,
                    boxLabel    : _('archive.label_link_resources'),
                    description : MODx.expandHelp ? '' : _('archive.label_link_resources_desc'),
                    name        : 'link_resources',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_link_resources_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }]
    });
    
    Archive.window.CreateGrid.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.CreateGrid, MODx.Window);

Ext.reg('archive-window-grid-create', Archive.window.CreateGrid);

Archive.window.UpdateGrid = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        width       : 600,
        autoHeight  : true,
        title       : _('archive.grid_update'),
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/grids/update'
        },
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            layout      : 'column',
            defaults    : {
                layout      : 'form',
                labelSeparator : ''
            },
            items       : [{
                columnWidth : .5,
                items       : [{
                    xtype       : 'textfield',
                    fieldLabel  : _('archive.label_type_title'),
                    description : MODx.expandHelp ? '' : _('archive.label_type_title_desc'),
                    name        : 'title',
                    anchor      : '100%',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_title_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'textarea',
                    fieldLabel  : _('archive.label_description'),
                    description : MODx.expandHelp ? '' : _('archive.label_description_desc'),
                    name        : 'description',
                    anchor      : '100%'
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_description_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-template',
                    fieldLabel  : _('archive.label_template'),
                    description : MODx.expandHelp ? '' : _('archive.label_template_desc'),
                    hiddenName  : 'templates[parent]',
                    anchor      : '100%',
                    allowBlank  : false,
                    value       : config.record.templates_formatted['parent']
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_template_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-template',
                    fieldLabel  : _('archive.label_template_child'),
                    description : MODx.expandHelp ? '' : _('archive.label_template_child_desc'),
                    hiddenName  : 'templates[child]',
                    anchor      : '100%',
                    allowBlank  : false,
                    value       : config.record.templates_formatted['child']
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_template_child_desc'),
                    cls         : 'desc-under'
                }]
            }, {
                columnWidth : .5,
                items       : [{
                    xtype       : 'archive-combo-position',
                    fieldLabel  : _('archive.label_position'),
                    description : MODx.expandHelp ? '' : _('archive.label_position_desc'),
                    name        : 'position',
                    anchor      : '100%',
                    value       : 'tab',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_position_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'archive-combo-sort',
                    fieldLabel  : _('archive.label_sort'),
                    description : MODx.expandHelp ? '' : _('archive.label_sort_desc'),
                    name        : 'sort',
                    anchor      : '100%',
                    value       : 'publishedon:DESC',
                    allowBlank  : false
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_sort_desc'),
                    cls         : 'desc-under'
                }, {
                    xtype       : 'checkbox',
                    hideLabel   : true,
                    boxLabel    : _('archive.label_link_resources'),
                    description : MODx.expandHelp ? '' : _('archive.label_link_resources_desc'),
                    name        : 'link_resources',
                    inputValue  : 1,
                    checked     : true
                }, {
                    xtype       : MODx.expandHelp ? 'label' : 'hidden',
                    html        : _('archive.label_link_resources_desc'),
                    cls         : 'desc-under'
                }]
            }]
        }]
    });
    
    Archive.window.UpdateGrid.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.UpdateGrid, MODx.Window);

Ext.reg('archive-window-grid-update', Archive.window.UpdateGrid);