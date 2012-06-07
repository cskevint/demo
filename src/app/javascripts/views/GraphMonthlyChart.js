Ext.define("C3.ui.graph.MonthlyChart", {
    extend : "C3.ui.graph.AbstractChart",

    /*
     * Default filterData object used to create the series and visuals for the monthly chart.
     */
    filterData : {
        grainType : "annual",
        spendType : "total",
        previous : false,
        actions : false,
        weather : false
    },

    initComponent : function() {
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

        var series = [];

        if(me.filterData.spendType == "total") {
            series.push(totalSeries);
        } else if(me.filterData.spendType == "electricity") {
            series.push(electricitySeries);
        } else if(me.filterData.spendType == "gas") {
            series.push(gasSeries);
        } else {
            console.log("must be showing non-spending data");
        }

        me.chart = new Ext.chart.Chart({
            width : me.width,
            height : me.height,
            style: "background:#fff",
            store: me.store,
            shadow: false,
//            legend: true,
            axes: [{
                type: "Numeric",
                minimum: 0,
                maximum: 100,
                position: "left",
                fields: ["total"],
//                title: "Dollars",
                minorTickSteps: 1
            }, {
                type: "Category",
                position: "bottom",
                fields: ["name"],
                grid: true
            }],
            series: series
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
    }
});