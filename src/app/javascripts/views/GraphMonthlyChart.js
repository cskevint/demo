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

        var series = [], yAxisField = "spendingTotal";

        if(me.filterData.spendType == "total") {
            series.push(me.createSeries({
                yFieldKey: "spendingTotal"
            }));
        } else if(me.filterData.spendType == "electricity") {
            series.push(me.createSeries({
                yFieldKey: "spendingElectricity"
            }));
        } else if(me.filterData.spendType == "gas") {
            series.push(me.createSeries({
                yFieldKey: "spendingGas"
            }));
        } else {
            console.log("must be showing non-spending data");
        }

        if(me.filterData.previous) {
            if(me.filterData.spendType == "total") {
                series.push(me.createSeries({
                    yFieldKey: "previousTotal"
                }));
            } else if(me.filterData.spendType == "electricity") {
                series.push(me.createSeries({
                    yFieldKey: "previousElectricity"
                }));
            } else if(me.filterData.spendType == "gas") {
                series.push(me.createSeries({
                    yFieldKey: "previousGas"
                }));
            }
        }

        if(me.filterData.weather) {
            series.push(me.createSeries({
                yFieldKey: "weatherAverage"
            }));
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
                fields: [ yAxisField ],
//                title: "Dollars",
                minorTickSteps: 1
            }, {
                type: "Category",
                position: "bottom",
                fields: ["key"],
                grid: true
            }],
            series: series
        });

    },

    /*
     *  Takes a config object with these posible values:
     *  yFieldKey : the data property to chart
     */
    createSeries : function(config) {
        var result = {
            type: "line",
            axis: "left",

            xField: "key",
            yField: config.yFieldKey,

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
                    this.setTitle(storeItem.get('startDate') + ':&nbsp;$' + storeItem.get(config.yFieldKey));
                }
            }
        };
        return result;
    }
});