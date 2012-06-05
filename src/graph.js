Ext.ns("C3.PEAT.ux.Graph");
(function(Graph){

    var Button = {}, Chart = {}, Data = {};

    Graph.button = Button;
    Graph.chart = Chart;
    Graph.data = Data;

    //<editor-fold desc="Graph.button">

    var dateTypeHandler = function() {
        var current = Graph.panel.items.get(0);
        Graph.panel.items.remove(current);
        if(Button.annual.pressed) {
            Graph.panel.items.add(Chart.annual);

        } else if(Button.monthly.pressed) {
            Graph.panel.items.add(Chart.monthly);

        } else if(Button.daily.pressed) {
            Graph.panel.items.add(current);
            console.log("not implemented yet");
        }
        Graph.panel.doLayout();
    };

    Button.annual = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Annual",
        toggleGroup: "dateType",
        pressed: true,
        handler: dateTypeHandler
    });

    Button.monthly = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Monthly",
        toggleGroup: "dateType",
        handler: dateTypeHandler
    });

    Button.daily = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Daily",
        toggleGroup: "dateType",
        handler: dateTypeHandler
    });

    Button.total = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Total",
        pressed: true,
        toggleGroup: "data",
        handler: function(){
            Chart.monthly.series.items[0].toggleAll(true);
            Chart.monthly.series.items[1].toggleAll(false)
            Chart.monthly.series.items[2].toggleAll(false)
//            Chart.monthly.series.items[1].hideAll(0);
//            Chart.monthly.series.items[2].hideAll(0);
//            Chart.monthly.series.items[0].showAll(0);

        }
    });

    Button.electricity = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Electricity",
        toggleGroup: "data",
        handler: function(){
            Chart.monthly.series.items[0].hideAll(0);
            Chart.monthly.series.items[2].hideAll(0);
            Chart.monthly.series.items[1].showAll(0);
        }
    });

    Button.gas = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Gas",
        toggleGroup: "data",
        handler: function(){
            Chart.monthly.series.items[0].hideAll(0);
            Chart.monthly.series.items[1].hideAll(0);
            Chart.monthly.series.items[2].showAll(0);
        }
    });

    Button.byUse = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "By Use",
        toggleGroup: "data",
        handler: function(){

        }
    });

    Button.previous = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Previous Period",
        enableToggle: true,
        handler: function(){

        }
    });

    Button.actions = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Plan Actions",
        enableToggle: true,
        handler: function(){

        }
    });

    Button.weather = new Ext.button.Button({
        cls: "graphTab",
        overCls: "graphTabOver",
        pressedCls: "graphTabPressed",
        text: "Weather",
        enableToggle: true,
        handler: function(){

        }
    });

    //</editor-fold>

    //<editor-fold desc="Graph.chart (annual)">

    Data.annual = new Ext.data.JsonStore({
        fields: ["name", "data"],
        data: [
            {name: "Previous Year", data: 10},
            {name: "Current Year", data: 20},
            {name: "Efficient", data: 10},
            {name: "Average", data: 50}
        ]
    });

    Chart.annual = new Ext.chart.Chart({
        style: "background:#fff",
//        animate: true,
        store: Data.annual,
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

    Data.monthly = new Ext.data.JsonStore({
        fields: ["name", "total", "electricity", "gas"],
        data: [
            {name: "Jan", total: 10, electricity: 5, gas: 5},
            {name: "Feb", total: 20, electricity: 10, gas: 10},
            {name: "Mar", total: 10, electricity: 8, gas: 2},
            {name: "Apr", total: 50, electricity: 10, gas: 40},
            {name: "May", total: 40, electricity: 30, gas: 10},
            {name: "Jun", total: 10, electricity: 0, gas: 10},
            {name: "Jul", total: 70, electricity: 55, gas: 15},
            {name: "Aug", total: 20, electricity: 15, gas: 5},
            {name: "Sep", total: 80, electricity: 45, gas: 35},
            {name: "Oct", total: 90, electricity: 80, gas: 10},
            {name: "Nov", total: 70, electricity: 65, gas: 5},
            {name: "Dec", total: 30, electricity: 15, gas: 15}
        ]
    });

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
        store: Data.monthly,
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

    //</editor-fold>

    Graph.panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        tbar: {
            items: [
                {xtype: "tbspacer", width: 25},
                Button.annual,
                Button.monthly,
                Button.daily,
                {xtype: "tbspacer", width: 25},
                Button.total,
                Button.electricity,
                Button.gas,
                Button.byUse,
                {xtype: "tbfill"},
                Button.previous,
                Button.actions,
                Button.weather,
                {xtype: "tbspacer", width: 25}
            ]
        },
        items: Chart.annual
    });

})(C3.PEAT.ux.Graph);

Ext.define('C3.ui.widget.chart.series.VariableWidthColumn', {

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