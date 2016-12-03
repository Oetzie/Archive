Archive.panel.Home = function(config) {
	config = config || {};
	
    Ext.apply(config, {
        id			: 'archive-panel-home',
        cls			: 'container',
        defaults	: {
        	collapsible	: false,
        	autoHeight	: true,
        	border 		: false
        },
        items		: [{
            html		: '<h2>'+_('archive')+'</h2>',
            id			: 'archive-header',
            cls			: 'modx-page-header'
        }, {
        	layout		: 'form',
        	border 		: true,
            defaults	: {
            	autoHeight	: true,
            	border		: false
            },
            items		: [{
            	html			: '<p>' + _('archive.types_desc') + '</p>',
                bodyCssClass	: 'panel-desc'
            }, {
                xtype			: 'archive-grid-types',
                cls				: 'main-wrapper',
                preventRender	: true
            }]
        }]
    });

	Archive.panel.Home.superclass.constructor.call(this, config);
};

Ext.extend(Archive.panel.Home, MODx.FormPanel);

Ext.reg('archive-panel-home', Archive.panel.Home);