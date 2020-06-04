Archive.combo.TypePosition = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        store       : new Ext.data.ArrayStore({
            mode        : 'local',
            fields      : ['type', 'label'],
            data        : [
                ['tab', _('archive.position_tab')],
                ['content', _('archive.position_content')]
            ]
        }),
        remoteSort  : ['label', 'asc'],
        hiddenName  : 'position',
        valueField  : 'type',
        displayField : 'label',
        mode        : 'local'
    });

    Archive.combo.TypePosition.superclass.constructor.call(this, config);
};

Ext.extend(Archive.combo.TypePosition, MODx.combo.ComboBox);

Ext.reg('archive-combo-position', Archive.combo.TypePosition);

Archive.combo.TypeSort = function(config) {
    config = config || {};

    var data = [];

    ['id', 'pagetitle', 'longtitle', 'description', 'menuindex', 'createdon', 'editedon', 'deletedon', 'publishedon', 'menutitle'].forEach(function (key) {
        data.push([key + ':ASC', _('archive.sort_field_' + key) + ' (' + _('archive.sort_dir_asc') + ')']);
        data.push([key + ':DESC', _('archive.sort_field_' + key) + ' (' + _('archive.sort_dir_desc') + ')']);
    });

    Ext.applyIf(config, {
        store       : new Ext.data.ArrayStore({
            mode        : 'local',
            fields      : ['type', 'label'],
            data        : data
        }),
        remoteSort  : ['label', 'asc'],
        hiddenName  : 'sort',
        valueField  : 'type',
        displayField : 'label',
        mode        : 'local'
    });

    Archive.combo.TypeSort.superclass.constructor.call(this, config);
};

Ext.extend(Archive.combo.TypeSort, MODx.combo.ComboBox);

Ext.reg('archive-combo-sort', Archive.combo.TypeSort);

Archive.combo.TypeSortDir = function(config) {
    config = config || {};

    Ext.applyIf(config, {
        store       : new Ext.data.ArrayStore({
            mode        : 'local',
            fields      : ['type', 'label'],
            data        : [
                ['asc', _('archive.sort_dir_asc')],
                ['desc', _('archive.sort_dir_desc')]
            ]
        }),
        remoteSort  : ['label', 'asc'],
        hiddenName  : 'sort_dir',
        valueField  : 'type',
        displayField : 'label',
        mode        : 'local'
    });

    Archive.combo.TypeSortDir.superclass.constructor.call(this, config);
};

Ext.extend(Archive.combo.TypeSortDir, MODx.combo.ComboBox);

Ext.reg('archive-combo-sort-dir', Archive.combo.TypeSortDir);

Archive.combo.Template = function(config) {
    config = config || {};

    Ext.applyIf(config,{
        name        : 'templates',
        hiddenName  : 'templates[]',
        valueField  : 'id',
        displayField : 'templatename',
        mode        : 'remote',
        clearBtnCls : 'x-form-trigger',
        expandBtnCls : 'x-form-trigger',
        triggerAction : 'all',
        typeAhead   : true,
        editable    : true,
        paging      : false,
        store       : new Ext.data.JsonStore({
            url         : MODx.config.connector_url,
            root        : 'results',
            totalProperty : 'total',
            fields      : ['id', 'templatename', 'description', 'category_name'],
            errorReader : MODx.util.JSONReader,
            baseParams  : {
                action      : 'element/template/getlist',
                combo       : 1
            },
            remoteSort  : false,
            autoDestroy : true,
            autoLoad    : true,
            listeners   : {
                'load'      : {
                    fn          : function() {
                        if (this.value) {
                            this.setValue(this.value);
                        }
                    },
                    scope       : this
                },
                'loadexception' : {
                    fn          : function(o, trans, resp) {
                        var status = _('code') + ': ' + resp.status + ' ' + resp.statusText + '<br/>';

                        MODx.msg.alert(_('error'), status + resp.responseText);
                    }
                }
            }
        }),
        tpl         : new Ext.XTemplate('<tpl for=".">' +
            '<div class="x-combo-list-item">' +
                '<span style="font-weight: bold">{templatename:htmlEncode}</span>' +
                '<tpl if="category_name">' +
                    ' - <span style="font-style: italic">{category_name:htmlEncode}</span>' +
                '</tpl>' +
                '<br />{description:htmlEncode()}' +
            '</div>' +
        '</tpl>')
    });

    Archive.combo.Template.superclass.constructor.call(this, config);
};

Ext.extend(Archive.combo.Template, Ext.ux.form.SuperBoxSelect);

Ext.reg('archive-combo-template', Archive.combo.Template);