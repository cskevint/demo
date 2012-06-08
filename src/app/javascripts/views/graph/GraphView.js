Ext.define("C3.ui.graph.View", {
    extend : "Ext.Component",

    dailyRawData : null,

    monthlyRawData : null,

    annualRawData : null,

    width : 800,

    height : 400,

    chartHeight : 0,

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        me.switcher = new C3.ui.graph.Switcher({
            width : me.width,
            height : 40,
            dock: "top"
        });

        me.toolbar = new C3.ui.graph.Toolbar({
            width : me.width,
            height : 28,
            dock: "top"
        });

        me.chartHeight = me.height - me.switcher.height - me.toolbar.height;

        me.annualChart = new C3.ui.graph.BarDataChart({
            width : me.width,
            height : me.chartHeight,
            store: new C3.store.graph.BarData({
                data : me.annualRawData
            })
        });

        me.panel = new Ext.panel.Panel({
            width: me.width,
            height: me.height,
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
                me.renderChart();
            }
        });

        me.toolbar.on({
            filterChange : function(){
                me.renderChart();
            }
        });
    },

    onRender: function() {
        this.callParent(arguments);
        this.panel.render(this.el);
    },

    renderChart : function() {
        var me = this, filterData = me.getWrappedFilterData();
        me.panel.items.clear();

        if(filterData.grainType == "annual") {

            me.annualChart = new C3.ui.graph.BarDataChart({
                width : me.width,
                height : me.chartHeight,
                filterData : filterData,
                store: new C3.store.graph.BarData({
                    data : me.annualRawData
                })
            });

            me.panel.items.add("annual", me.annualChart);

        } else if(filterData.grainType == "monthly") {

            var monthlyChart = new C3.ui.graph.PointDataChart({
                width : me.width,
                height : me.chartHeight,
                store: new C3.store.graph.PointData({
                    data : me.monthlyRawData
                }),
                filterData : me.getWrappedFilterData()
            });
            me.panel.items.add("monthly", monthlyChart);

        } else if(filterData.grainType == "daily") {

            var dailyChart = new C3.ui.graph.PointDataChart({
                width : me.width,
                height : me.chartHeight,
                store: new C3.store.graph.PointData({
                    data : me.dailyRawData
                }),
                filterData : me.getWrappedFilterData()
            });
            me.panel.items.add("monthly", dailyChart);

        }

        me.panel.doLayout();
    },

    getWrappedFilterData : function() {
        var me = this;
        var result = me.toolbar.getFilterData();
        result.usage = me.switcher.getSelectedValue();
        return result;
    }
});