Archive.panel.Resource = function(config) {
    config = config || {};

    Ext.apply(config, {
        id          : 'archive-panel-resource',
        layout      : 'form',
        anchor      : '100%',
        items       : [{
            html        : '<p>' + config.description + '</p>',
            bodyCssClass : 'panel-desc'
        }, {
            xtype       : 'archive-grid-resources',
            cls         : 'main-wrapper',
            preventRender : true,
            record      : config.record,
            resource    : config.resource
        }]
    });

    Archive.panel.Resource.superclass.constructor.call(this, config);
};

Ext.extend(Archive.panel.Resource, MODx.Panel);

Ext.reg('archive-panel-resource', Archive.panel.Resource);