Ext.define("C3.PEAT.ux.Graph.FilterButton", {
    extend : "Ext.button.Button",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "graphTab",
            overCls: "graphTabOver",
            pressedCls: "graphTabPressed"
        });
    }
});