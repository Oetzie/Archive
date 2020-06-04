Archive.panel.Home = function(config) {
    config = config || {};

    Ext.apply(config, {
        id          : 'archive-panel-home',
        cls         : 'container',
        items       : [{
            html        : '<h2>' + _('archive') + '</h2>',
            cls         : 'modx-page-header'
        }, {
            layout      : 'form',
            items       : [{
                html        : '<p>' + _('archive.grids_desc') + '</p>',
                bodyCssClass : 'panel-desc'
            }, {
                xtype       : 'archive-grid-grids',
                cls         : 'main-wrapper',
                preventRender : true
            }]
        }]
    });

    Archive.panel.Home.superclass.constructor.call(this, config);
};

Ext.extend(Archive.panel.Home, MODx.FormPanel);

Ext.reg('archive-panel-home', Archive.panel.Home);