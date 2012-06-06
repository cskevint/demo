Ext.define("C3.PEAT.ux.Graph.Toolbar", {

    extend : "Ext.Component",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        me.annual = new C3.PEAT.ux.Graph.FilterButton({
            text: "Annual",
            toggleGroup: "dateType",
            pressed: true,
            handler: function() {
                me.fireEvent("filter", { type : "annual" });
            }
        });

        me.monthly = new C3.PEAT.ux.Graph.FilterButton({
            text: "Monthly",
            toggleGroup: "dateType",
            handler: function(){
                me.fireEvent("filter", { type : "monthly" });
            }
        });

        me.daily = new C3.PEAT.ux.Graph.FilterButton({
            text: "Daily",
            toggleGroup: "dateType",
            handler: function() {
                me.fireEvent("filter", { type : "daily" });
            }
        });

        me.total = new C3.PEAT.ux.Graph.FilterButton({
            text: "Total",
            toggleGroup: "spendType",
            pressed: true,
            handler: function() {
                me.fireEvent("filter", { type : "total" });
            }
        });

        me.eletricity = new C3.PEAT.ux.Graph.FilterButton({
            text: "Electricity",
            toggleGroup: "spendType",
            handler: function() {
                me.fireEvent("filter", { type : "electricity" });
            }
        });

        me.gas = new C3.PEAT.ux.Graph.FilterButton({
            text: "Gas",
            toggleGroup: "spendType",
            handler: function() {
                me.fireEvent("filter", { type : "gas" });
            }
        });

        me.previous = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Previous Period",
            enableToggle: true,
            handler: function() {
                me.fireEvent("overlay", { type : "previous" });
            }
        });

        me.actions = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Plan Actions",
            enableToggle: true,
            handler: function() {
                me.fireEvent("overlay", { type : "actions" });
            }
        });

        me.weather = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Weather",
            enableToggle: true,
            handler: function() {
                me.fireEvent("overlay", { type : "weather" });
            }
        });

        me.subToolbar = new Ext.toolbar.Toolbar({
            style: {
                border: "0 none"
            },
            items: [
                me.total,
                me.eletricity,
                me.gas
            ]
        });

        me.toolbar = new Ext.toolbar.Toolbar({
            width: 800,
            items: [
                {xtype: "tbspacer", width: 25},
                me.annual,
                me.monthly,
                me.daily,
                {xtype: "tbspacer", width: 25},
                me.subToolbar,
                {xtype: "tbfill"},
                me.previous,
                me.actions,
                me.weather,
                {xtype: "tbspacer", width: 25}
            ]
        });

    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.toolbar.render(this.el);
    }
});