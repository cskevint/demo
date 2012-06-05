Ext.define("C3.PEAT.ux.Graph.Switcher", {
    extend : "Ext.Component",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        me.spending = new C3.PEAT.ux.Graph.SwitcherButton({
            toggleGroup: "switcher",
            pressed: true,
            text: "Spending<br/>$1000"
        });
        me.electricity = new C3.PEAT.ux.Graph.SwitcherButton({
            toggleGroup: "switcher",
            text: "Electricity<br/>100kWh"
        });
        me.gas = new C3.PEAT.ux.Graph.SwitcherButton({
            toggleGroup: "switcher",
            text: "Gas<br/>50therms"
        });
        me.co2 = new C3.PEAT.ux.Graph.SwitcherButton({
            toggleGroup: "switcher",
            text: "CO<sub>2</sub><br/>10tons</sub>"
        });
        me.buildingUse = new C3.PEAT.ux.Graph.SwitcherButton({
            toggleGroup: "switcher",
            text: "Building End Use"
        });
        me.buildingUse.addCls("last");
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.container = new Ext.Container({
            width: 800,
            height: 40,
            layout: {
                type: "hbox",
                align: "stretch"
            },
            items : [
                me.spending,
                me.electricity,
                me.gas,
                me.co2,
                me.buildingUse
            ],
            renderTo: this.el
        })
    }
});