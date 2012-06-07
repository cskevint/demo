Ext.define("C3.ui.graph.OverlayButton", {

    extend : "Ext.button.Button",

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            enableToggle: true,
            cls: "overlayButton",
            overCls: "overlayButtonOver",
            pressedCls: "overlayButtonPressed"
        });
    }
});