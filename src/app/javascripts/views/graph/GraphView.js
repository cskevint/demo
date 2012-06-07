Ext.define("C3.ui.graph.View", {
    extend : "Ext.Component",

    dailyRawData : null,

    monthlyRawData : null,

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        var width = 800, height = 400, chartHeight = 0;

        me.switcher = new C3.ui.graph.Switcher({
            width : width,
            height : 40,
            dock: "top"
        });

        me.toolbar = new C3.ui.graph.Toolbar({
            width : width,
            height : 28,
            dock: "top"
        });

        chartHeight = height - me.switcher.height - me.toolbar.height;

        me.annualChart = new C3.ui.graph.BarDataChart({
            width : width,
            height : chartHeight,
            store: C3.data.annual
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
            filterChange : function(event){
                me.panel.items.clear();

                if(event.grainType == "annual") {

                    me.annualChart = new C3.ui.graph.BarDataChart({
                        width : width,
                        height : chartHeight,
                        filterData : me.toolbar.getFilterData(),
                        store: C3.data.annual
                    });

                    me.panel.items.add("annual", me.annualChart);

                } else if(event.grainType == "monthly") {

                    var monthlyChart = new C3.ui.graph.PointDataChart({
                        width : width,
                        height : chartHeight,
                        store: new C3.store.graph.PointData({
                            data : me.monthlyRawData
                        }),
                        filterData : me.toolbar.getFilterData()
                    });
                    me.panel.items.add("monthly", monthlyChart);

                } else if(event.grainType == "daily") {

                    var dailyChart = new C3.ui.graph.PointDataChart({
                        width : width,
                        height : chartHeight,
                        store: new C3.store.graph.PointData({
                            data : me.dailyRawData
                        }),
                        filterData : me.toolbar.getFilterData()
                    });
                    me.panel.items.add("monthly", dailyChart);

                }

                me.panel.doLayout();
            }
        });
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.panel.render(this.el);
    }
});