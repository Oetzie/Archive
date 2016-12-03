Ext.onReady(function() {
	MODx.load({xtype: 'archive-page-home'});
});

Archive.page.Home = function(config) {
	config = config || {};
	
	config.buttons = [{
		text		: _('help_ex'),
		handler		: MODx.loadHelpPane,
		scope		: this
	}];
	
	Ext.applyIf(config, {
		components	: [{
			xtype		: 'archive-panel-home',
			renderTo	: 'archive-panel-home-div'
		}]
	});
	
	Archive.page.Home.superclass.constructor.call(this, config);
};

Ext.extend(Archive.page.Home, MODx.Component);

Ext.reg('archive-page-home', Archive.page.Home);