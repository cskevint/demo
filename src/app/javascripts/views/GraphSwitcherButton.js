Ext.define("C3.ui.graph.SwitcherButton", {
    extend : "Ext.button.Button",

    /*
     * The type of switch event this button will fire.
     */
    eventType : "",

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "switcherButton",
            overCls: "switcherButtonOver",
            pressedCls: "switcherButtonPressed",
            style: {
                "min-width":"100px"
            },
            handler : function() {
                me.fireEvent("switch", { type : me.eventType });
            }
        });
    },

    onClick: function(e) {
        if(!this.pressed) {
            this.callParent(arguments);
        }
    }
});