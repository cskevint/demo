Ext.define("C3.PEAT.ux.Graph.Toolbar", {

    extend : "Ext.Component",

    dateTypeHandler : function() {
        /*
        var current = Graph.panel.items.get(0);
        Graph.panel.items.remove(current);
        if(Button.annual.pressed) {
            Graph.panel.items.add(Chart.annual);

        } else if(Button.monthly.pressed) {
            Graph.panel.items.add(Graph.getMonthlyChart({}));

        } else if(Button.daily.pressed) {
            Graph.panel.items.add(current);
            console.log("not implemented yet");
        }
        Graph.panel.doLayout();
        */
    },

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        me.annual = new C3.PEAT.ux.Graph.FilterButton({
            text: "Annual",
            toggleGroup: "dateType",
            pressed: true,
            handler: me.dateTypeHandler
        });

        me.monthly = new C3.PEAT.ux.Graph.FilterButton({
            text: "Monthly",
            toggleGroup: "dateType",
            handler: me.dateTypeHandler
        });

        me.daily = new C3.PEAT.ux.Graph.FilterButton({
            text: "Daily",
            toggleGroup: "dateType",
            handler: me.dateTypeHandler
        });

        me.total = new C3.PEAT.ux.Graph.FilterButton({
            text: "Total",
            toggleGroup: "spendType",
            pressed: true,
            handler: Ext.emptyFn
        });

        me.eletricity = new C3.PEAT.ux.Graph.FilterButton({
            text: "Electricity",
            toggleGroup: "spendType",
            handler: Ext.emptyFn
        });

        me.gas = new C3.PEAT.ux.Graph.FilterButton({
            text: "Gas",
            toggleGroup: "spendType",
            handler: Ext.emptyFn
        });

        me.previous = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Previous Period",
            enableToggle: true,
            handler: Ext.emptyFn
        });

        me.actions = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Plan Actions",
            enableToggle: true,
            handler: Ext.emptyFn
        });

        me.weather = new C3.PEAT.ux.Graph.OverlayButton({
            text: "Weather",
            enableToggle: true,
            handler: Ext.emptyFn
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