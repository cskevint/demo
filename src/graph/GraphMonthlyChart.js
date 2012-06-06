Ext.define("C3.PEAT.ux.Graph.MonthlyChart", {
    extend : "Ext.Component",

    initComponent : function(config) {
        var me = this;

        var totalSeries = {
            type: "line",
            axis: "left",
            xField: "name",
            yField: "total",
            showMarkers : true,
            markerConfig: {
                type: "circle",
                size: 4,
                radius: 4,
                'stroke-width': 1
            },
            tips: {
                trackMouse: true,
                width: 60,
                height: 20,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ':&nbsp;$' + storeItem.get('total'));
                }
            }
        };

        var electricitySeries = {
            type: "line",
            axis: "left",
            xField: "name",
            yField: "electricity",
            showMarkers : true,
            markerConfig: {
                type: "circle",
                size: 4,
                radius: 4,
                'stroke-width': 1
            },
            tips: {
                trackMouse: true,
                width: 60,
                height: 20,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ':&nbsp;$' + storeItem.get('total'));
                }
            }
        };

        var gasSeries = {
            type: "line",
            axis: "left",
            xField: "name",
            yField: "gas",
            showMarkers : true,
            markerConfig: {
                type: "circle",
                size: 4,
                radius: 4,
                'stroke-width': 1
            },
            tips: {
                trackMouse: true,
                width: 60,
                height: 20,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ':&nbsp;$' + storeItem.get('total'));
                }
            }
        };

        me.chart = new Ext.chart.Chart({
            style: "background:#fff",
            store: C3.PEAT.us.Graph.data.monthly,
            shadow: true,
            legend: true,
            axes: [{
                type: "Numeric",
                minimum: 0,
                maximum: 100,
                position: "left",
                fields: ["total"],
                title: "Dollars",
                minorTickSteps: 1
            }, {
                type: "Category",
                position: "bottom",
                fields: ["name"],
                grid: true
            }],
            series: [totalSeries, electricitySeries, gasSeries]
        });

        me.chart.on({
            render: function(){
                setTimeout(function(){
//                    Chart.monthly.series.items[1].hideAll();
//                    Chart.monthly.series.items[2].hideAll();
//                    Chart.monthly.series.items[0].showAll();
                }, 0);
            }
        });
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.chart.render(this.el);
    }
});