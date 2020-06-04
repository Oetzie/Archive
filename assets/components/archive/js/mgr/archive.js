var Archive = function(config) {
    config = config || {};

    Archive.superclass.constructor.call(this, config);
};

Ext.extend(Archive, Ext.Component, {
    page    : {},
    window  : {},
    grid    : {},
    tree    : {},
    panel   : {},
    combo   : {},
    config  : {}
});

Ext.reg('archive', Archive);

Archive = new Archive();