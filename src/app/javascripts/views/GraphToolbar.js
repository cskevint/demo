Ext.define("C3.PEAT.ux.Graph.Toolbar", {

    extend : "Ext.Component",

    spendTypeEnabled : true,

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        me.annual = new C3.PEAT.ux.Graph.FilterButton({
            text: "Annual",
            toggleGroup: "dateType",
            pressed: true,
            handler: function() {
                me.fireEvent("filter", { grainType : "annual", spendType : me.getSpendType() });
            }
        });

        me.monthly = new C3.PEAT.ux.Graph.FilterButton({
            text: "Monthly",
            toggleGroup: "dateType",
            handler: function(){
                me.fireEvent("filter", { grainType : "monthly", spendType : me.getSpendType() });
            }
        });

        me.daily = new C3.PEAT.ux.Graph.FilterButton({
            text: "Daily",
            toggleGroup: "dateType",
            handler: function() {
                me.fireEvent("filter", { grainType : "daily", spendType : me.getSpendType() });
            }
        });





        me.total = new C3.PEAT.ux.Graph.FilterButton({
            text: "Total",
            toggleGroup: "spendType",
            pressed: true,
            handler: function() {
                me.fireEvent("filter", { grainType : me.getGrainType(), spendType : "total" });
            }
        });

        me.electricity = new C3.PEAT.ux.Graph.FilterButton({
            text: "Electricity",
            toggleGroup: "spendType",
            handler: function() {
                me.fireEvent("filter", { grainType : me.getGrainType(), spendType : "electricity" });
            }
        });

        me.gas = new C3.PEAT.ux.Graph.FilterButton({
            text: "Gas",
            toggleGroup: "spendType",
            handler: function() {
                me.fireEvent("filter", { grainType : me.getGrainType(), spendType : "gas" });
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

        me.toolbar = new Ext.toolbar.Toolbar({
            width: me.width,
            items: [
                {xtype: "tbspacer", width: 25},
                me.annual,
                me.monthly,
                me.daily,
                {xtype: "tbspacer", width: 25},
                me.total,
                me.electricity,
                me.gas,
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
    },

    setSpendTypeEnabled : function(enabled) {
        this.spendTypeEnabled = enabled;
        this.total.setVisible(enabled);
        this.electricity.setVisible(enabled);
        this.gas.setVisible(enabled);
    },

    getGrainType : function() {
        var me = this;
        return me.annual.pressed ? "annual" : (me.monthly.pressed ? "monthly" : "daily");
    },

    getSpendType : function() {
        var me = this, spendType =  me.total.pressed ? "total" : (me.electricity.pressed ? "electricity" : "gas");
        return me.spendTypeEnabled ? spendType : null;
    },

    getFilterData : function() {
        var me = this;
        return {
            grainType : me.getGrainType(),
            spendType : me.getSpendType(),
            previous : me.previous.pressed,
            actions : me.actions.pressed,
            weather : me.weather.pressed
        };
    }
});