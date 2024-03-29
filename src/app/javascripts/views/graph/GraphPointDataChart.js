Ext.define("C3.ui.graph.PointDataChart", {
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

        var series = [],
            yAxisField = "spendingTotal",
            themeId = "1";

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

        } else if(me.filterData.usage == "electricity") {
            series.push(me.createSeries({
                yFieldKey: "electricityUsage"
            }));

        } else if(me.filterData.usage == "gas") {
            series.push(me.createSeries({
                yFieldKey: "gasUsage"
            }));
        } else if(me.filterData.usage == "co2") {
            series.push(me.createSeries({
                yFieldKey: "co2Usage"
            }));
        }

        if(me.filterData.previous) {
            themeId += "1";

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
        } else {
            themeId += "0";
        }

        if(me.filterData.weather) {
            themeId += "1";

            series.push(me.createSeries({
                yFieldKey: "weatherLow", weather : true
            }));

            series.push(me.createSeries({
                yFieldKey: "weatherHigh", weather : true
            }));
        } else {
            themeId += "0";
        }

        me.chart = new Ext.chart.Chart({

            width : me.width,
            height : me.height,

            style: "background:#fff",

            store: me.store,

            theme : "PointDataTheme" + themeId,

            shadow: false,

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
     *  Takes a config object with these possible values:
     *  yFieldKey {String, required} the data property to chart
     *  weather {Boolean} whether this series is for weather data or not
     */
    createSeries : function(config) {
        Ext.applyIf(config, {
            weather : false
        });

        var result = {
            type: "line",
            axis: "left",

            xField: "key",
            yField: config.yFieldKey,

            showMarkers : true,

            fill : config.weather,

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

        if(config.weather) {
            result.markerConfig = {
                type: "circle",
                radius: 4,
                'stroke-width': 0
            }
        }

        return result;
    }
});
