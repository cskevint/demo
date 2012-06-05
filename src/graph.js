Ext.ns("C3.PEAT.ux.Graph");


Ext.define("C3.PEAT.ux.Graph.SwitcherButton", {
    extend : "Ext.button.Button",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "switcherTab",
            overCls: "switcherTabOver",
            pressedCls: "switcherTabPressed",
            style: {
                "min-width":"100px"
            }
        });
    }
});

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
})

Ext.define("C3.PEAT.ux.Graph.FilterButton", {
    extend : "Ext.button.Button",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        Ext.apply(this, {
            cls: "graphTab",
            overCls: "graphTabOver",
            pressedCls: "graphTabPressed"
        });
    }
});


(function(Graph){

    var Button = {}, Chart = {};

    Graph.button = Button;
    Graph.chart = Chart;

    //<editor-fold desc="Graph.button">

    var dateTypeHandler = function() {
        var current = Graph.panel.items.get(0);
        Graph.panel.items.remove(current);
        if(Button.annual.pressed) {
            Graph.panel.items.add(Chart.annual);

        } else if(Button.monthly.pressed) {
            Graph.panel.items.add(Graph.getMonthlyChart({}));

        } else if(Button.daily.pressed) {
            Graph.panel.items.add(current);
            console.log("not implemented yet");
        }
        Graph.panel.doLayout();
    };

    Button.annual = new C3.PEAT.ux.Graph.FilterButton({
        text: "Annual",
        toggleGroup: "dateType",
        pressed: true,
        handler: dateTypeHandler
    });

    Button.monthly = new C3.PEAT.ux.Graph.FilterButton({
        text: "Monthly",
        toggleGroup: "dateType",
        handler: dateTypeHandler
    });

    Button.daily = new C3.PEAT.ux.Graph.FilterButton({
        text: "Daily",
        toggleGroup: "dateType",
        handler: dateTypeHandler
    });



    Button.total = new C3.PEAT.ux.Graph.FilterButton({
        text: "Total",
        toggleGroup: "spendType",
        pressed: true,
        handler: Ext.emptyFn
    });

    Button.eletricity = new C3.PEAT.ux.Graph.FilterButton({
        text: "Electricity",
        toggleGroup: "spendType",
        handler: Ext.emptyFn
    });

    Button.gas = new C3.PEAT.ux.Graph.FilterButton({
        text: "Gas",
        toggleGroup: "spendType",
        handler: Ext.emptyFn
    });



    Button.previous = new C3.PEAT.ux.Graph.FilterButton({
        text: "Previous Period",
        enableToggle: true,
        handler: Ext.emptyFn
    });

    Button.actions = new C3.PEAT.ux.Graph.FilterButton({
        text: "Plan Actions",
        enableToggle: true,
        handler: Ext.emptyFn
    });

    Button.weather = new C3.PEAT.ux.Graph.FilterButton({
        text: "Weather",
        enableToggle: true,
        handler: Ext.emptyFn
    });

    //</editor-fold>

    //<editor-fold desc="Graph.chart (annual)">

    Chart.annual = new Ext.chart.Chart({
        style: "background:#fff",
//        animate: true,
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
        }/*,{
            type: "Category",
            position: "bottom",
            fields: ["name"]
        }*/],
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
//                barAttr.x += parseInt(barAttr.width)/2-25;
//                barAttr.width = "50px";
                return barAttr;
            }
        }]
    });

    //</editor-fold>

    //<editor-fold desc="Graph.chart (monthly)">

    Graph.getMonthlyChart = function(config) {
        var totalSeries = {
            type: "line",
//        highlight: {
//            size: 7,
//            radius: 7
//        },
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
//        highlight: {
//            size: 7,
//            radius: 7
//        },
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
//        highlight: {
//            size: 7,
//            radius: 7
//        },
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
//        animate: true,
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
//                Chart.monthly.series.items[1].hideAll();
//                Chart.monthly.series.items[2].hideAll();
                    //Chart.monthly.series.items[0].showAll();
                }, 0);
            }
        });
    };

    //</editor-fold>

//    Graph.mainPanel = new Ext.panel.Panel({});

    Graph.switcher = new C3.PEAT.ux.Graph.Switcher({
        dock: "top"
    });

    Graph.subToolbar = new Ext.toolbar.Toolbar({
        style: {
            border: "0 none"
        },
        items: [
            Button.total, Button.eletricity, Button.gas
        ]
    });

    Graph.toolbar = new Ext.toolbar.Toolbar({
        dock: "top",
        items: [
            {xtype: "tbspacer", width: 25},
            Button.annual,
            Button.monthly,
            Button.daily,
            {xtype: "tbspacer", width: 25},
            Graph.subToolbar,
            {xtype: "tbfill"},
            Button.previous,
            Button.actions,
            Button.weather,
            {xtype: "tbspacer", width: 25}
        ]
    });

    Graph.panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        dockedItems: [ Graph.switcher, Graph.toolbar ],
        items: Chart.annual
    });

})(C3.PEAT.ux.Graph);

Ext.define('C3.PEAT.ux.chart.series.VariableWidthColumn', {

    extend: 'Ext.chart.series.Bar',

    type: 'annualbarchart',

    alias: ['series.annualbarchart'],

    alternateClassName: [],

    column: true,

    /**
     * @cfg style Style properties that will override the theming series styles.
     */
    style: {
        color : '#0000FF',
        fill : '#0000FF'
    },

    /**
     * @cfg {Number} gutter The gutter space between single bars, as a percentage of the bar width
     */
    gutter: 0,

    /**
     * @cfg {Number} groupGutter The gutter space between groups of bars, as a percentage of the bar width
     */
    groupGutter: 0,

    /**
     * @cfg {Number} xPadding Padding between the left/right axes and the bars
     */
    xPadding: 0,

    /**
     * @cfg {Number} yPadding Padding between the top/bottom axes and the bars
     */
    yPadding: 0,

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,

            store = chart.getChartStore(),

            data = store.data.items,

            i, total, record,

            bounds = me.bounds = me.getBounds(),

            items = me.items = [],

            yFields = me.yField,

            gutter = me.gutter / 100,

            groupGutter = me.groupGutter / 100,

            bbox = bounds.bbox,

            barWidth = bounds.barWidth,

            shrunkBarWidth = bounds.shrunkBarWidth,

            xPadding = me.xPadding,

            barsLen = bounds.barsLen,

            colors = me.colorArrayStyle,

            colorLength = colors && colors.length || 0,

            j, yValue, height, bottom, top, hasShadow, barAttr, counter, floorY;


        var hasPrevious = data.length > 3;

        for (i = 0, total = data.length; i < total; i++) {
            record = data[i];
            bottom = bounds.zero;
            top = bounds.zero;
            hasShadow = false;

            for (j = 0, counter = 0; j < barsLen; j++) {

                yValue = record.get(bounds.bars[j]);

                height = Math.round((yValue - Math.max(bounds.minY, 0)) * bounds.scale);

                barAttr = {
                    fill: colors[(barsLen > 1 ? j : 0) % colorLength]
                };

                var padding = 50;
                if(i == 0 && hasPrevious) {
                    padding = 70;
                }

                var xCoord = 20 + ((i == 0 && hasPrevious)? 60 : 0)
                        + bbox.x
                        + xPadding
                        + (barWidth - shrunkBarWidth) * 0.5
                        + i * barWidth * (1 + gutter)
                        + counter * bounds.groupBarWidth * (1 + groupGutter);

                Ext.apply(barAttr, {
                    height: height,
                    width: Math.max(bounds.groupBarWidth, 0) - padding,
                    x: xCoord,
                    y: bottom - height
                });

                if (height < 0) {
                    barAttr.y = top;
                    barAttr.height = Math.abs(height);
                }

                barAttr.x = Math.floor(barAttr.x) + 1;

                floorY = Math.floor(barAttr.y);
                if (!Ext.isIE9 && barAttr.y > floorY) {
                    floorY--;
                }
                barAttr.y = floorY;

                barAttr.width = Math.floor(barAttr.width);

                barAttr.height = Math.floor(barAttr.height);

                items.push({
                    series: me,
                    yField: yFields[j],
                    storeItem: record,
                    value: [record.get(me.xField), yValue],
                    attr: barAttr,
                    point: [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height]
                });

                counter++;
            }
        }
    }
});