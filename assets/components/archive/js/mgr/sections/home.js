Ext.onReady(function() {
    MODx.load({
        xtype : 'archive-page-home'
    });
});

Archive.page.Home = function(config) {
    config = config || {};

    config.buttons = [];

    if (Archive.config.branding_url) {
        config.buttons.push({
            text        : 'Archive ' + Archive.config.version,
            cls         : 'x-btn-branding',
            handler     : this.loadBranding
        });
    }

    if (Archive.config.branding_url_help) {
        config.buttons.push({
            text        : _('help_ex'),
            handler     : MODx.loadHelpPane,
            scope       : this
        });
    }

    Ext.applyIf(config, {
        components  : [{
            xtype       : 'archive-panel-home',
            renderTo    : 'archive-panel-home-div'
        }]
    });

    Archive.page.Home.superclass.constructor.call(this, config);
};

Ext.extend(Archive.page.Home, MODx.Component, {
    loadBranding: function(btn) {
        window.open(Archive.config.branding_url);
    }
});

Ext.reg('archive-page-home', Archive.page.Home);