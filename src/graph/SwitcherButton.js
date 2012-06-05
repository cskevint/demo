Ext.define("C3.PEAT.ux.Graph.SwitcherButton", {
    extend : "Ext.button.Button",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "switcherTab",
            overCls: "switcherTabOver",
            pressedCls: "switcherTabPressed",
            style: {
                "min-width":"100px"
            }
        });
    }
});