Ext.ns("C3.PEAT.ux.Graph");
var Graph = C3.PEAT.ux.Graph;

Graph.current = "Monthly";

Graph.toggleHandler = function(button, state){
    if(Graph.current != button.text && state) {
        Graph.current = button.text;
        console.log("change to "+button.text);
    }
};

Graph.annualButton = new Ext.button.Button({
    text: 'Annual',
    toggleGroup: 'dateType',
    toggleHandler: Graph.toggleHandler
});

Graph.monthlyButton = new Ext.button.Button({
    text: 'Monthly',
    toggleGroup: 'dateType',
    toggleHandler: Graph.toggleHandler
});

Graph.dailyButton = new Ext.button.Button({
    text: 'Daily',
    toggleGroup: 'dateType',
    toggleHandler: Graph.toggleHandler
});

Graph.totalButton = new Ext.button.Button({
    text: 'Total'
});

Graph.toolbar = new Ext.toolbar.Toolbar({
    width: 1000,
    items: [
        Graph.annualButton,
        Graph.monthlyButton,
        Graph.dailyButton,
        {xtype: 'tbspacer', width: 50},
        Graph.totalButton
    ]
});

Graph.store1 = new Ext.data.JsonStore({
    fields: ['name', 'data1'],
    data: [
        {name: "Jan", data1: 10},
        {name: "Feb", data1: 20},
        {name: "Mar", data1: 10},
        {name: "Apr", data1: 50},
        {name: "May", data1: 40},
        {name: "Jun", data1: 10},
        {name: "Jul", data1: 70},
        {name: "Aug", data1: 20},
        {name: "Sep", data1: 10},
        {name: "Oct", data1: 90},
        {name: "Nov", data1: 70},
        {name: "Dec", data1: 30}
    ]
});

Graph.data1Series = {
    type: 'line',
    highlight: {
        size: 7,
        radius: 7
    },
    axis: 'left',
    xField: 'name',
    yField: 'data1',
    showMarkers : false,
    markerConfig: {
        type: 'cross',
        size: 4,
        radius: 4,
        'stroke-width': 0
    }
};

Graph.xAxes = {
    type: 'Numeric',
    minimum: 0,
    maximum: 100,
    position: 'left',
    fields: ['data1'],
    title: 'Number of Hits',
    minorTickSteps: 1
};

Graph.yAxes = {
    type: 'Category',
    position: 'bottom',
    fields: ['name'],
    title: 'Month of the Year',
    grid: true
};

Graph.chart = new Ext.chart.Chart({
    xtype: 'chart',
    style: 'background:#fff',
    animate: true,
    store: Graph.store1,
    shadow: true,
    //theme: 'Category1',
    axes: [Graph.xAxes, Graph.yAxes],
    series: [Graph.data1Series]
});

Ext.require(['Ext.chart.*','Ext.data.*']);
Ext.onReady(function () {
    Ext.create('Ext.panel.Panel', {
        width: 800,
        height: 400,
        tbar: Graph.toolbar,
        layout: 'fit',
        items: Graph.chart,
        renderTo: Ext.get(document.getElementById("chart"))
    });
});