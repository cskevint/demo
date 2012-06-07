Ext.define("C3.ui.graph.OverlayButton", {

    extend : "Ext.button.Button",

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "overlayButton",
            overCls: "overlayButtonOver",
            pressedCls: "overlayButtonPressed"
        });
    }
});