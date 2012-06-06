Ext.define("C3.PEAT.ux.Graph.OverlayButton", {

    extend : "Ext.button.Button",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "overlayButton",
            overCls: "overlayButtonOver",
            pressedCls: "overlayButtonPressed"
        });
    }
});