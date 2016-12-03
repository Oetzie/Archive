Ext.onReady(function() {
	if ('content' == Archive.config.archive.position) {
		if (undefined !== (content = Ext.getCmp('modx-resource-content'))) {
			content.add({
		        items		: [{
		        	xtype		: 'archive-panel-resource'
		        }]
		    });
		    
		    content.remove('ta');
		    
		    content.setTitle(undefined == _(Archive.config.archive.title) ? _('archive.resources') : _(Archive.config.archive.title));
		}
	} else {
		if (undefined !== (tabs = Ext.getCmp('modx-resource-tabs'))) {
			tabs.insert(0, {
				title		: undefined == _(Archive.config.archive.title) ? _('archive.resources') : _(Archive.config.archive.title),
		        items		: [{
		        	xtype		: 'archive-panel-resource'
		        }]
		    });
		    
		    tabs.setActiveTab(0);
		}
	}
});