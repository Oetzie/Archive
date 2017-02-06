Archive.grid.Resources = function(config) {
    config = config || {};
    
	config.tbar = [{
        text	: _('archive.resource_create'),
        cls		: 'primary-button',
        handler	: function() {
	        var action = (MODx.action && MODx.action['resource/create']) ? MODx.action['resource/create'] : 'resource/create';
	        
	        MODx.loadPage(action, 'parent=' + Archive.config.resource.id + '&class_key=' + Archive.config.archive.class + '&template=' + Archive.config.archive.child_template)
        },
        scope	: this
    }, '->', {
        xtype		: 'textfield',
        name 		: 'archive-filter-search-resources',
        id			: 'archive-filter-search-resources',
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
    	id			: 'archive-filter-clear-resources',
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
            '<p class="desc">{introtext}</p>'
        ),
	    getRowClass : function(record, rowIndex, p, ds) {
	        return record.json.deleted ? 'x-grid3-row-collapsed grid-row-inactive' : 'x-grid3-row-collapsed';
	    }
    });

    columns = new Ext.grid.ColumnModel({
        columns: [expander, {
            header		: _('archive.label_resource_title'),
            dataIndex	: 'title',
            sortable	: true,
            editable	: false,
            width		: 150,
            renderer	: this.renderName
        }, {
            header		: _('archive.label_resource_published'),
            dataIndex	: 'published',
            sortable	: true,
            editable	: false,
            width		: 125,
            fixed		: true,
			renderer	: this.renderBoolean
        }, {
            header		: _('archive.label_resource_publishedon'),
            dataIndex	: 'publishedon',
            sortable	: true,
            editable	: false,
            width		: 150,
            fixed		: true,
			renderer	: this.renderDate
        }, {
            header		: _('last_modified'),
            dataIndex	: 'editedon',
            sortable	: true,
            editable	: false,
            fixed		: true,
			width		: 150,
			renderer	: this.renderDate
        }, {
            header		: _('menuindex'),
            dataIndex	: 'menuindex',
			sortable	: true,
            hidden		: true,
            editable	: false
        }]
    });
    
    Ext.applyIf(config, {
    	cm			: columns,
        id			: 'archive-grid-resources',
        url			: Archive.config.connector_url,
        baseParams	: {
        	action		: 'mgr/archive/getlist',
        	archive 	: Archive.config.archive.id,
        	id 			: Archive.config.resource.id
        },
        fields		: ['id', 'context_key', 'parent', 'parent_formatted', 'title', 'url', 'introtext', 'menuindex', 'alias', 'published', 'deleted', 'publishedon', 'editedon'],
        paging		: true,
        pageSize	: 15,
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
        }],
        enableDragDrop : Archive.config.archive.sort_dd ? true : false,
	    ddGroup 	: 'archive-grid-resources',
	    listeners	: {
		    'afterrender' : {
			    fn 			: this.ddRow,
			    scope 		: this
		    }
	    }
    });
    
    Archive.grid.Resources.superclass.constructor.call(this, config);
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
    getMenu: function() {
        menu = [{
	        text	: _('archive.resource_update'),
	        handler	: function() {
		        var action = (MODx.action && MODx.action['resource/update']) ? MODx.action['resource/update'] : 'resource/update';
		        
				MODx.loadPage(action, 'id=' + this.menu.record.id);
	        },
	        scope 	: this
	    }, {
		    text	: _('archive.resource_duplicate'),
			handler	: this.duplicateResource
		}, {
			text 	: _('archive.resource_move'),
			handler : this.moveResource
		}];
		
		if (this.menu.record.published) {
			menu.push('-', {
		    	text	: _('archive.resource_unpublish'),
				handler	: this.unpublishResource
			});
		} else {
			menu.push('-', {
		    	text	: _('archive.resource_publish'),
				handler	: this.publishResource
			});
		}
	    
	    if (this.menu.record.deleted) {
		    menu.push({
		    	text	: _('archive.resource_recover'),
				handler	: this.recoverResource
			});
	    } else {
		    menu.push({
		    	text	: _('archive.resource_remove'),
				handler	: this.removeResource
			});
	    }
	    
	    menu.push('-', {
	    	text	: _('archive.resource_show'),
			handler	: function() {
				window.open(this.menu.record.url, '_blank');
			}
		});
	    
	    return menu;
    },
    duplicateResource: function(btn, e) {
        if (this.duplicateResourceWindow) {
	        this.duplicateResourceWindow.destroy();
        }
        this.duplicateResourceWindow = MODx.load({
	        xtype		: 'archive-window-resource-duplicate',
	        record		: this.menu.record,
	        closeAction	:'close',
	        listeners	: {
		        'success'	: {
		        	fn			: this.refresh,
		        	scope		: this
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
	        xtype		: 'archive-window-resource-move',
	        record		: this.menu.record,
	        closeAction	:'close',
	        listeners	: {
		        'success'	: {
		        	fn			: this.refresh,
		        	scope		: this
		        }
	         }
        });
        
        this.moveResourceWindow.setValues(this.menu.record);
        this.moveResourceWindow.show(e.target);
    },

    unpublishResource: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.resource_unpublish'),
        	text		: _('archive.resource_unpublish_confirm'),
        	url			: MODx.config.connector_url,
        	params		: {
            	action		: MODx.action && MODx.action['resource/unpublish'] ? MODx.action['resource/unpublish'] : 'resource/unpublish',
            	id			: this.menu.record.id
            },
            listeners	: {
            	'success'	: {
		        	fn			: this.refresh,
		        	scope		: this
		        }
            }
    	});
    },
    publishResource: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.resource_publish'),
        	text		: _('archive.resource_publish_confirm'),
        	url			: MODx.config.connector_url,
        	params		: {
            	action		: MODx.action && MODx.action['resource/publish'] ? MODx.action['resource/publish'] : 'resource/publish',
            	id			: this.menu.record.id
            },
            listeners	: {
            	'success'	: {
		        	fn			: this.refresh,
		        	scope		: this
		        }
            }
    	});
    },
    removeResource: function(btn, e) {
    	MODx.msg.confirm({
        	title 		: _('archive.resource_remove'),
        	text		: _('archive.resource_remove_confirm'),
        	url			: MODx.config.connector_url,
        	params		: {
            	action		: MODx.action && MODx.action['resource/delete'] ? MODx.action['resource/delete'] : 'resource/delete',
            	id			: this.menu.record.id
            },
            listeners	: {
            	'success'	: {
            		fn			: function(data) {
	            		if (undefined != (tree = Ext.getCmp('modx-resource-tree'))) {
							if (undefined != (trashButton = tree.getTopToolbar().findById('emptifier'))) {
								if (data.object.deletedCount == 0) {
									trashButton.disable();
		                        } else {
		                            trashButton.enable();
		                        }
		
		                        trashButton.setTooltip(_('empty_recycle_bin') + ' (' + data.object.deletedCount + ')');
							}
						}
	            		
	            		this.refresh();	
	            	},
            		scope		: this
            	}
            }
    	});
    },
    recoverResource: function(btn, e) {
	  	MODx.Ajax.request({
		    url 		: MODx.config.connector_url,
		    params 		: { 	
		        action 		: MODx.action && MODx.action['resource/undelete'] ? MODx.action['resource/undelete'] : 'resource/undelete',
		        id			: this.menu.record.id
		    },
		    listeners	: {
			    'success'	: {
            		fn			: function(data) {
	            		if (undefined != (tree = Ext.getCmp('modx-resource-tree'))) {
							if (undefined != (trashButton = tree.getTopToolbar().findById('emptifier'))) {
								if (data.object.deletedCount == 0) {
									trashButton.disable();
		                        } else {
		                            trashButton.enable();
		                        }
		
		                        trashButton.setTooltip(_('empty_recycle_bin') + ' (' + data.object.deletedCount + ')');
							}
						}
	            		
	            		this.refresh();	
	            	},
	            	scope 		: this
	            }
			}
		});  
    },
    ddRow: function() {
		var scope = this;

		var ddrow = new Ext.dd.DropTarget(this.getView().mainBody, {
        	ddGroup 	: this.config.ddGroup,
        	notifyDrop 	: function(dd, e, data) {
            	var sm = scope.getSelectionModel();
                var sels = sm.getSelections();
                var cindex = dd.getDragData(e).rowIndex;
                
                if (undefined != cindex) {
	                var record = scope.getStore().getAt(cindex);

	                if (sm.hasSelection()) {
                		for (i = 0; i < sels.length; i++) {
	                    	scope.getStore().remove(scope.getStore().getById(sels[i].id));
	                        scope.getStore().insert(cindex, sels[i]);
	                    }
	                    
	                    sm.selectRecords(sels);
	                }
	                
	                var sm = scope.getStore().data.items;
	                var sort = new Array();
	                
	                for (var i = 0; i < sm.length; i++) {
		                sort.push({
			                'id' : sm[i].id
			            });
	                }
	                
	                MODx.Ajax.request({
		                url			: Archive.config.connector_url,
		                params 		: {
			                action		: 'mgr/archive/sort',
			                sort 		: Ext.encode(sort)
		                },
		                listeners	: {
			                'success'	: {
				                fn 			: function(r) {
			            			scope.getSelectionModel().clearSelections(true);
			            			
			            			scope.refresh();
					            },
					            scope 		: this
					        }
				        }
		            });
                }
            }
        });
    },
    renderName: function(d, c, e) {
	    var action = (MODx.action && MODx.action['resource/update']) ? MODx.action['resource/update'] : 'resource/update';
	    
	    return String.format('<a href="?a={0}&id={1}" title="{2}" class="x-grid-link">{3}</a>', action, e.json.id, _('archive.resource_update'), Ext.util.Format.htmlEncode(d));
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

Ext.reg('archive-grid-resources', Archive.grid.Resources);

Archive.window.DuplicateResource = function(config) {
    config = config || {};

    Ext.applyIf(config, {
    	autoHeight	: true,
        title 		: _('archive.resource_duplicate'),
        url			: Archive.config.connector_url,
        baseParams	: {
            action		: 'mgr/archive/duplicate'
        },
        fields		: [{
			xtype		: 'hidden',
			name		: 'id'
		}, {
        	xtype		: 'textfield',
        	fieldLabel	: _('archive.label_resource_title_duplicate'),
        	description	: MODx.expandHelp ? '' : _('archive.label_resource_title_duplicate_desc'),
        	name		: 'name',
        	anchor		: '100%',
        	allowBlank	: false
        }, {
        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
            html		: _('archive.label_resource_title_duplicate_desc'),
            cls			: 'desc-under'
        }]
    });

    Archive.window.DuplicateResource.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.DuplicateResource, MODx.Window);

Ext.reg('archive-window-resource-duplicate', Archive.window.DuplicateResource);

Archive.window.MoveResource = function(config) {
    config = config || {};

    Ext.applyIf(config, {
    	autoHeight	: true,
        title 		: _('archive.resource_move'),
        url			: Archive.config.connector_url,
        baseParams	: {
            action		: 'mgr/archive/move'
        },
        id			: 'archive-window-resource-move',
        fields		: [{
			xtype		: 'hidden',
			name		: 'id'
		}, {
			xtype		: 'hidden',
			name		: 'old_parent',
			value 		: config.record.parent,
		}, {
			xtype		: 'hidden',
			name		: 'context_key',
			id			: 'archive-window-resource-move-context-key'
		}, {
			xtype		: 'hidden',
			name		: 'new_parent',
			id			: 'archive-window-resource-move-parent-hidden',
			value 		: config.record.parent
		}, {
    		xtype		: 'modx-field-parent-change',
    		fieldLabel	: _('archive.label_resource_parent'),
			description	: MODx.expandHelp ? '' : _('newsletter.label_resource_parent_desc'),
			anchor		: '100%',
			name		: 'parent-cmb',
			value 		: config.record.parent_formatted,
			allowBlank	: false,
			formpanel	: 'archive-window-resource-move',
			parentcmp	: 'archive-window-resource-move-parent-hidden',
			contextcmp	: 'archive-window-resource-move-context-key',
			currentid	: config.record.id
		}, {
        	xtype		: MODx.expandHelp ? 'label' : 'hidden',
            html		: _('archive.label_resource_parent_desc'),
            cls			: 'desc-under'
        }, {
			xtype		: 'hidden',
			name		: 'alias'
		}]
    });

    Archive.window.MoveResource.superclass.constructor.call(this, config);
};

Ext.extend(Archive.window.MoveResource, MODx.Window);

Ext.reg('archive-window-resource-move', Archive.window.MoveResource);