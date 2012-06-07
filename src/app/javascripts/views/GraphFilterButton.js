Ext.define("C3.ui.graph.FilterButton", {

    extend : "Ext.button.Button",

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "filterButton",
            overCls: "filterButtonOver",
            pressedCls: "filterButtonPressed"
        });
    },

    onClick: function(e) {
        if(!this.pressed) {
            this.callParent(arguments);
        }
    }
});