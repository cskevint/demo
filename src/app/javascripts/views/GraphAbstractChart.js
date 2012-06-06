Ext.define("C3.PEAT.ux.Graph.AbstractChart", {
    extend : "Ext.Component",

    constructor: function(config){
        this.callParent(arguments);
        this.initConfig(config);

        this.store = config.store;

        this.width = config.width;

        this.height = config.height;
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.chart.render(this.el);
    }
});