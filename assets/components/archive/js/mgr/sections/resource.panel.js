Ext.onReady(function() {
    if (Archive.config.record) {
        var record      = Archive.config.record;
        var resource    = Archive.config.resource;

        var title       = _('archive.resources');
        var description = _('archive.resources_desc');

        if (record.title_formatted) {
            title = record.title_formatted;
        }

        if (record.description_formatted) {
            description = record.description_formatted;
        }

        if (record.position === 'content') {
            var container = Ext.getCmp('modx-resource-content');

            if (container) {
                container.setTitle(title);

                container.remove('ta');

                container.add({
                    items       : [{
                        xtype       : 'archive-panel-resource',
                        record      : record,
                        resource    : resource,
                        description : description
                    }]
                });
            }
        } else if (record.position === 'tab') {
            var container = Ext.getCmp('modx-resource-tabs');

            if (container) {
                container.insert(0, {
                    title       : title,
                    items       : [{
                        xtype       : 'archive-panel-resource',
                        record      : record,
                        resource    : resource,
                        description : description
                    }]
                });

                container.setActiveTab(0);
            }
        }
    }
});