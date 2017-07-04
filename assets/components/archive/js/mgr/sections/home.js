Ext.onReady(function() {
	MODx.load({xtype: 'archive-page-home'});
});

Archive.page.Home = function(config) {
	config = config || {};
	
	config.buttons = [];
	
	if (Archive.config.branding) {
		config.buttons.push({
			text 		: 'Archive ' + Archive.config.version,
			cls			: 'x-btn-branding',
			handler		: this.loadBranding
		});
	}
	
	config.buttons.push({
		text		: _('help_ex'),
		handler		: MODx.loadHelpPane,
		scope		: this
	});
	
	Ext.applyIf(config, {
		components	: [{
			xtype		: 'archive-panel-home',
			renderTo	: 'archive-panel-home-div'
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