Ext.ns("C3.PEAT.ux.Graph");

(function(Graph){

    var Chart = {};

    Graph.chart = Chart;

    Chart.annual = new Ext.chart.Chart({
        style: "background:#fff",
        store: C3.PEAT.ux.Graph.data.annual,
        shadow: false,
        axes: [{
            type: "Numeric",
            minimum: 0,
            maximum: 100,
            position: "left",
            fields: ["data"],
            dashSize: 0,
            title: "Dollars",
            grid: true
        }],
        series: [{
            type: "annualbarchart",
            axis: "left",
            xField: "name",
            yField: "data",
            label: {
                display: 'outside',
                'text-anchor': 'middle',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('$0'),
                orientation: 'horizontal',
                color: '#333'
            }
            ,renderer: function(sprite, storeItem, barAttr, i, store) {
                if(store.data.items.length > 3) {
                    switch(i) {
                        case 0:
                            barAttr.fill = "red";
                            barAttr.opacity = 0.5;
                            break;
                        case 1:
                            barAttr.fill = "red";
                            break;
                        case 2:
                            barAttr.fill = "green";
                            break;
                        case 3:
                            barAttr.fill = "gray";
                    }
                } else {
                    switch(i) {
                        case 0:
                            barAttr.fill = "red";
                            break;
                        case 1:
                            barAttr.fill = "green";
                            break;
                        case 2:
                            barAttr.fill = "gray";
                    }
                }
                return barAttr;
            }
        }]
    });

    Graph.getMonthlyChart = function(config) {
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

        Chart.monthly = new Ext.chart.Chart({
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

        Chart.monthly.on({
            render: function(){
                setTimeout(function(){
//                    Chart.monthly.series.items[1].hideAll();
//                    Chart.monthly.series.items[2].hideAll();
//                    Chart.monthly.series.items[0].showAll();
                }, 0);
            }
        });
    };

    var switcher = new C3.PEAT.ux.Graph.Switcher({
        dock: "top"
    });

    var toolbar = new C3.PEAT.ux.Graph.Toolbar({
        dock: "top"
    });

    Graph.panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        dockedItems: [ switcher, toolbar ],
        items: Chart.annual
    });

})(C3.PEAT.ux.Graph);
