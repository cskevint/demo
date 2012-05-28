var Graph = {
    button:{},
    chart:{}
};

Graph.button.dateTypeHandler = function() {
    var current = Graph.panel.items.get(0);
    Graph.panel.items.remove(current);
    if(Graph.button.annual.pressed) {
        Graph.panel.items.add(Graph.annualChart);

    } else if(Graph.button.monthly.pressed) {
        Graph.panel.items.add(Graph.monthlyChart);

    } else if(Graph.button.daily.pressed) {
        Graph.panel.items.add(current);
        window.alert("not implemented yet");
    }
    Graph.panel.doLayout();
};

Graph.button.annual = new Ext.button.Button({
    text: "Annual",
    toggleGroup: "dateType",
    pressed: true,
    handler: Graph.button.dateTypeHandler
});

Graph.button.monthly = new Ext.button.Button({
    text: "Monthly",
    toggleGroup: "dateType",
    handler: Graph.button.dateTypeHandler
});

Graph.button.daily = new Ext.button.Button({
    text: "Daily",
    toggleGroup: "dateType",
    handler: Graph.button.dateTypeHandler
});

Graph.button.total = new Ext.button.Button({
    text: "Total",
    handler: function(){

    }
});

Graph.button.electricity = new Ext.button.Button({
    text: "Electricity",
    handler: function(){

    }
});

Graph.button.gas = new Ext.button.Button({
    text: "Gas",
    handler: function(){

    }
});

Graph.button.byUse = new Ext.button.Button({
    text: "By Use",
    handler: function(){

    }
});

Graph.toolbar = new Ext.toolbar.Toolbar({
    width: 1000,
    items: [
        Graph.button.annual,
        Graph.button.monthly,
        Graph.button.daily,
        {xtype: "tbspacer", width: 50},
        Graph.button.total,
        Graph.button.electricity,
        Graph.button.gas,
        Graph.button.byUse
    ]
});


Graph.annualColors = ["url(#v-1)","url(#v-2)","url(#v-3)","url(#v-4)","url(#v-5)"];

Ext.define("Ext.chart.theme.Annual", {
    extend: "Ext.chart.theme.Base",

    constructor: function(config) {
        this.callParent([Ext.apply({
            colors: Graph.annualColors
        }, config)]);
    }
});

Graph.annualData = new Ext.data.JsonStore({
    fields: ["name", "data"],
    data: [
        {name: "Previous Year", data: 10},
        {name: "Current Year", data: 20},
        {name: "Efficient", data: 10},
        {name: "Average", data: 50}
    ]
});

Graph.annualChart = new Ext.chart.Chart({
    style: "background:#fff",
    theme: "Annual",
    animate: true,
    store: Graph.annualData,
    shadow: true,
    gradients: [{
            id: "v-1",
            angle: 0,
            stops: {
                0: {color: "rgb(212, 40, 40)"},
                100: {color: "rgb(117, 14, 14)"}
            }
        },{
            id: "v-2",
            angle: 0,
            stops: {
                0: {color: "rgb(180, 216, 42)"},
                100: {color: "rgb(94, 114, 13)"}
            }
        },{
            id: "v-3",
            angle: 0,
            stops: {
                0: {color: "rgb(43, 221, 115)"},
                100: {color: "rgb(14, 117, 56)"}
            }
        },{
            id: "v-4",
            angle: 0,
            stops: {
                0: {color: "rgb(45, 117, 226)"},
                100: {color: "rgb(14, 56, 117)"}
            }
        },{
            id: "v-5",
            angle: 0,
            stops: {
                0: {color: "rgb(187, 45, 222)"},
                100: {color: "rgb(85, 10, 103)"}
            }
        }],
    axes: [{
        type: "Numeric",
        minimum: 0,
//        maximum: 100,
        position: "left",
        fields: ["data"],
        title: "Dollars",
        minorTickSteps: 1,
        grid: true
    }, {
        type: "Category",
        position: "bottom",
        fields: ["name"]
    }],
    series: [{
        type: "column",
        highlight: {
            size: 7,
            radius: 7
        },
        axis: "left",
        xField: "name",
        yField: "data",
        showMarkers : false,
        markerConfig: {
            type: "cross",
            size: 4,
            radius: 4,
            'stroke-width': 0
        },
        renderer: function(sprite, storeItem, barAttr, i, store) {
            var colors = Graph.annualColors;
            barAttr.fill = Graph.annualColors[i % colors.length];
            return barAttr;
        }
    }]
});

Graph.monthlyData = new Ext.data.JsonStore({
    fields: ["name", "data"],
    data: [
        {name: "Jan", data: 10},
        {name: "Feb", data: 20},
        {name: "Mar", data: 10},
        {name: "Apr", data: 50},
        {name: "May", data: 40},
        {name: "Jun", data: 10},
        {name: "Jul", data: 70},
        {name: "Aug", data: 20},
        {name: "Sep", data: 10},
        {name: "Oct", data: 90},
        {name: "Nov", data: 70},
        {name: "Dec", data: 30}
    ]
});

Graph.monthlyChart = new Ext.chart.Chart({
    style: "background:#fff",
    animate: true,
    store: Graph.monthlyData,
    shadow: true,
    axes: [{
        type: "Numeric",
        minimum: 0,
        maximum: 100,
        position: "left",
        fields: ["data"],
        title: "Dollars",
        minorTickSteps: 1
    }, {
        type: "Category",
        position: "bottom",
        fields: ["name"],
        grid: true
    }],
    series: [{
        type: "line",
        highlight: {
            size: 7,
            radius: 7
        },
        axis: "left",
        xField: "name",
        yField: "data",
        showMarkers : false,
        markerConfig: {
            type: "cross",
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
});

Graph.panel = new Ext.panel.Panel({
    width: 800,
    height: 400,
    layout: "fit",
    tbar: Graph.toolbar,
    items: Graph.annualChart
});

Ext.onReady(function () {
    Graph.panel.render(document.getElementById("chart"));
});