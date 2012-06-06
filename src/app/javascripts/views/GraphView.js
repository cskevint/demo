Ext.define("C3.PEAT.ux.Graph.View", {
    extend : "Ext.Component",

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        var width = 800, height = 400, chartHeight = 0;

        me.switcher = new C3.PEAT.ux.Graph.Switcher({
            width : width,
            height : 40,
            dock: "top"
        });

        me.toolbar = new C3.PEAT.ux.Graph.Toolbar({
            width : width,
            height : 28,
            dock: "top"
        });

        chartHeight = height - me.switcher.height - me.toolbar.height;

        me.annualChart = new C3.PEAT.ux.Graph.AnnualChart({
            width : width,
            height : chartHeight,
            store: C3.PEAT.ux.Graph.data.annual
        });

        me.panel = new Ext.panel.Panel({
            width: width,
            height: height,
            dockedItems: [ me.switcher, me.toolbar ],
            items: me.annualChart
        });

        me.switcher.on({
            switch : function(event) {
                if(event.type == "spending") {
                    me.toolbar.setSpendTypeEnabled(true);
                } else {
                    me.toolbar.setSpendTypeEnabled(false);
                }
            }
        });

        me.toolbar.on({
            filter : function(event){
                me.panel.items.clear();

                if(event.grainType == "annual") {

                    me.panel.items.add("annual", me.annualChart);

                } else if(event.grainType == "monthly") {

                    me.monthlyChart = new C3.PEAT.ux.Graph.MonthlyChart({
                        width : width,
                        height : chartHeight,
                        store: C3.PEAT.ux.Graph.data.monthly,
                        filterData : me.toolbar.getFilterData()
                    });
                    me.panel.items.add("monthly", me.monthlyChart);

                } else if(event.grainType == "daily") {

                }

                me.panel.doLayout();
            },
            overlay : function(event) {
                console.log(me.toolbar.getFilterData());
            }
        });
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.panel.render(this.el);
    }
});