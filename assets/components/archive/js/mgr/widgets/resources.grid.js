Archive.grid.Resources = function(config) {
    config = config || {};

    config.tbar = [{
        text        : _('archive.grid_' + config.record.title.toLowerCase() + '_create') || _('archive.resource_create'),
        cls         : 'primary-button',
        handler     : function() {
            MODx.loadPage('resource/create', 'parent=' + this.resource.id + '&template=' + this.record.template)
        },
        scope       : this
    }, '->', {
        xtype       : 'textfield',
        name        : 'archive-filter-search-resources',
        id          : 'archive-filter-search-resources',
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
        id          : 'archive-filter-clear-resources',
        text        : _('filter_clear'),
        listeners   : {
            'click'     : {
                fn          : this.clearFilter,
                scope       : this
            }
        }
    }];

    var expander = new Ext.grid.RowExpander({
        tpl : new Ext.Template('<p class="desc">{introtext}</p>'),
        getRowClass : function(record, rowIndex, p, ds) {
            return parseInt(record.json.deleted) === 1 || record.json.deleted ? 'x-grid3-row-collapsed grid-row-inactive' : 'x-grid3-row-collapsed';
        }
    });

    var columns = new Ext.grid.ColumnModel({
        columns     : [expander, {
            header      : _('archive.label_resource_title'),
            dataIndex   : 'title',
            sortable    : true,
            editable    : false,
            width       : 150,
            renderer    : this.renderName
        }, {
            header      : _('archive.label_resource_published'),
            dataIndex   : 'published',
            sortable    : true,
            editable    : false,
            width       : 125,
            fixed       : true,
            renderer    : this.renderBoolean
        }, {
            header      : _('archive.label_resource_publishedon'),
            dataIndex   : 'publishedon',
            sortable    : true,
            editable    : false,
            width       : 150,
            fixed       : true,
            renderer    : this.renderDate
        }, {
            header      : _('last_modified'),
            dataIndex   : 'editedon',
            sortable    : true,
            editable    : false,
            fixed       : true,
            width       : 150,
            renderer    : this.renderDate
        }, {
            header      : _('menuindex'),
            dataIndex   : 'menuindex',
            sortable    : true,
            hidden      : true,
            editable    : false
        }]
    });
    
    Ext.applyIf(config, {
        cm          : columns,
        id          : 'archive-grid-resources',
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/resources/getlist',
            archive     : config.record.id,
            resource    : config.resource.id
        },
        fields      : ['id', 'context_key', 'parent', 'parent_formatted', 'title', 'url', 'introtext', 'menuindex', 'alias', 'published', 'deleted', 'publishedon', 'editedon'],
        paging      : true,
        pageSize    : 15,
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

    if (parseInt(config.record.sort_dd) === 1) {
        Ext.applyIf(config, {
            enableDragDrop  : true,
            ddGroup         : 'archive-grid-resources',
        });
    }
    
    Archive.grid.Resources.superclass.constructor.call(this, config);

    this.on('afterrender', this.sortResources, this);
};

Ext.extend(Archive.grid.Resources, MODx.grid.Grid, {
    filterSearch: function(tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();
        
        this.getBottomToolbar().changePage(1);
    },
    clearFilter: function() {
        this.getStore().baseParams.query = '';

        Ext.getCmp('archive-filter-search-resources').reset();

        this.getBottomToolbar().changePage(1);
    },
    sortResources: function() {
        new Ext.dd.DropTarget(this.getView().mainBody, {
            ddGroup     : this.config.ddGroup,
            notifyDrop  : function(dd, e, data) {
                var index = dd.getDragData(e).rowIndex;

                if (undefined !== index) {
                    for (var i = 0; i < data.selections.length; i++) {
                        data.grid.getStore().remove(data.grid.getStore().getById(data.selections[i].id));
                        data.grid.getStore().insert(index, data.selections[i]);
                    }

                    var order = [];

                    Ext.each(data.grid.getStore().data.items, (function(record) {
                        order.push(record.id);
                    }).bind(this));

                    MODx.Ajax.request({
                        url         : Archive.config.connector_url,
                        params      : {
                            action      : 'mgr/resources/sort',
                            sort        : order.join(',')
                        },
                        listeners   : {
                            'success'   : {
                                fn          : function() {

                                },
                                scope       : this
                            }
                        }
                    });
                }
            }
        });
    },
    getMenu: function() {
        var menu = [{
            text    : '<i class="x-menu-item-icon icon icon-edit"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_update') || _('archive.resource_update')),
            handler : function() {
                MODx.loadPage('resource/update', 'id=' + this.menu.record.id);
            },
            scope   : this
        }, {
            text    : '<i class="x-menu-item-icon icon icon-copy"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_duplicate') || _('archive.resource_duplicate')),
            handler : this.duplicateResource,
            scope   : this
        }, {
            text    : '<i class="x-menu-item-icon icon icon-arrow-circle-right"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_move') || _('archive.resource_move')),
            handler : this.moveResource,
            scope   : this
        }];

        if (parseInt(this.menu.record.published) === 1 || this.menu.record.published) {
            menu.push('-', {
                text    : '<i class="x-menu-item-icon icon icon-eye-slash"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_unpublish') || _('archive.resource_unpublish')),
                handler : this.unpublishResource,
                scope   : this
            });
        } else {
            menu.push('-', {
                text    : '<i class="x-menu-item-icon icon icon-eye"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_publish') || _('archive.resource_publish')),
                handler : this.publishResource,
                scope   : this
            });
        }

        if (parseInt(this.menu.record.deleted) === 1 || this.menu.record.deleted) {
            menu.push({
                text    : '<i class="x-menu-item-icon icon icon-refresh"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_recover') || _('archive.resource_recover')),
                handler : this.recoverResource,
                scope   : this
            });
        } else {
            menu.push({
                text    : '<i class="x-menu-item-icon icon icon-times"></i>' + (_('archive.grid_' + this.record.title.toLowerCase() + '_remove') || _('archive.resource_remove')),
                handler : this.removeResource,
                scope   : this
            });
        }

        menu.push('-', {
            text    : _('archive.grid_' + this.record.title.toLowerCase() + '_show') || _('archive.resource_show'),
            handler : function() {
                window.open(this.menu.record.url, '_blank');
            },
            scope   : this
        });

        return menu;
    },
    duplicateResource: function(btn, e) {
        if (this.duplicateResourceWindow) {
            this.duplicateResourceWindow.destroy();
        }

        this.duplicateResourceWindow = MODx.load({
            xtype       : 'archive-window-resource-duplicate',
            record      : this.menu.record,
            title       : _('archive.grid_' + this.record.title.toLowerCase() + '_duplicate') || _('archive.resource_duplicate'),
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });
        
        this.duplicateResourceWindow.setValues(this.menu.record);
        this.duplicateResourceWindow.show(e.target);
    },
    moveResource: function(btn, e) {
        if (this.moveResourceWindow) {
            this.moveResourceWindow.destroy();
        }

        this.moveResourceWindow = MODx.load({
            xtype       : 'archive-window-resource-move',
            record      : this.menu.record,
            title       : _('archive.grid_' + this.record.title.toLowerCase() + '_move') || _('archive.resource_move'),
            closeAction : 'close',
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });

        this.moveResourceWindow.setValues(this.menu.record);
        this.moveResourceWindow.show(e.target);
    },
    unpublishResource: function(btn, e) {
        MODx.msg.confirm({
            title       : _('archive.grid_' + this.record.title.toLowerCase() + '_unpublish') || _('archive.resource_unpublish'),
            text        : _('archive.resource_unpublish_confirm'),
            url         : MODx.config.connector_url,
            params      : {
                action      : 'resource/unpublish',
                id          : this.menu.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });
    },
    publishResource: function(btn, e) {
        MODx.msg.confirm({
            title       : _('archive.grid_' + this.record.title.toLowerCase() + '_publish') || _('archive.resource_publish'),
            text        : _('archive.resource_publish_confirm'),
            url         : MODx.config.connector_url,
            params      : {
                action      : 'resource/publish',
                id          : this.menu.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : this.refresh,
                    scope       : this
                }
            }
        });
    },
    removeResource: function(btn, e) {
        MODx.msg.confirm({
            title       : _('archive.grid_' + this.record.title.toLowerCase() + '_remove') || _('archive.resource_remove'),
            text        : _('archive.resource_remove_confirm'),
            url         : MODx.config.connector_url,
            params      : {
                action      : 'resource/delete',
                id          : this.menu.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : function(data) {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree) {
                            var bin = tree.getTopToolbar().findById('emptifier');

                            if (bin) {
                                if (parseInt(data.object.deletedCount) === 0) {
                                    bin.disable();
                                } else {
                                    bin.enable();
                                }

                                bin.setTooltip(_('empty_recycle_bin') + ' (' + data.object.deletedCount + ')');
                            }
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
    },
    recoverResource: function(btn, e) {
        MODx.Ajax.request({
            url         : MODx.config.connector_url,
            params      : {
                action      : 'resource/undelete',
                id          : this.menu.record.id
            },
            listeners   : {
                'success'   : {
                    fn          : function(data) {
                        var tree = Ext.getCmp('modx-resource-tree');

                        if (tree) {
                            var bin = tree.getTopToolbar().findById('emptifier');

                            if (bin) {
                                if (parseInt(data.object.deletedCount) === 0) {
                                    bin.disable();
                                } else {
                                    bin.enable();
                                }

                                bin.setTooltip(_('empty_recycle_bin') + ' (' + data.object.deletedCount + ')');
                            }
                        }

                        this.refresh();
                    },
                    scope       : this
                }
            }
        });
    },
    renderName: function(d, c, e) {
        return '<a href="?a=resource/update&id=' + e.json.id + '" title="' + Ext.util.Format.htmlEncode(d) + '" class="x-grid-link">' + Ext.util.Format.htmlEncode(d) + '</a>';
    },
    renderBoolean: function(d, c) {
        c.css = parseInt(d) === 1|| d ? 'green' : 'red';

        return parseInt(d) === 1 || d ? _('yes') : _('no');
    },
    renderDate: function(a) {
        if (Ext.isEmpty(a)) {
            return '—';
        }

        return a;
    }
});

Ext.reg('archive-grid-resources', Archive.grid.Resources);

Archive.window.DuplicateResource = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('archive.resource_duplicate'),
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/resources/duplicate'
        },
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'textfield',
            fieldLabel  : _('archive.label_resource_title_duplicate'),
            description : MODx.expandHelp ? '' : _('archive.label_resource_title_duplicate_desc'),
            name        : 'name',
            anchor      : '100%',
            allowBlank  : false
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('archive.label_resource_title_duplicate_desc'),
            cls         : 'desc-under'
        }]
    });

    Archive.window.DuplicateResource.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.DuplicateResource, MODx.Window);

Ext.reg('archive-window-resource-duplicate', Archive.window.DuplicateResource);

Archive.window.MoveResource = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        autoHeight  : true,
        title       : _('archive.resource_move'),
        url         : Archive.config.connector_url,
        baseParams  : {
            action      : 'mgr/resources/move'
        },
        id          : 'archive-window-resource-move',
        fields      : [{
            xtype       : 'hidden',
            name        : 'id'
        }, {
            xtype       : 'hidden',
            name        : 'old_parent',
            value       : config.record.parent,
        }, {
            xtype       : 'hidden',
            name        : 'context_key',
            id          : 'archive-window-resource-move-context-key'
        }, {
            xtype       : 'hidden',
            name        : 'new_parent',
            id          : 'archive-window-resource-move-parent-hidden',
            value       : config.record.parent
        }, {
            xtype       : 'modx-field-parent-change',
            fieldLabel  : _('archive.label_resource_parent'),
            description : MODx.expandHelp ? '' : _('newsletter.label_resource_parent_desc'),
            anchor      : '100%',
            name        : 'parent-cmb',
            value       : config.record.parent_formatted,
            allowBlank  : false,
            formpanel   : 'archive-window-resource-move',
            parentcmp   : 'archive-window-resource-move-parent-hidden',
            contextcmp  : 'archive-window-resource-move-context-key',
            currentid   : config.record.id
        }, {
            xtype       : MODx.expandHelp ? 'label' : 'hidden',
            html        : _('archive.label_resource_parent_desc'),
            cls         : 'desc-under'
        }, {
            xtype       : 'hidden',
            name        : 'alias'
        }]
    });

    Archive.window.MoveResource.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.MoveResource, MODx.Window);

Ext.reg('archive-window-resource-move', Archive.window.MoveResource);