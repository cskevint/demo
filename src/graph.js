Ext.require('Ext.chart.*');
Ext.require(['Ext.window.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

Ext.require(['Ext.data.*']);

Ext.onReady(function() {

    window.generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;

        floor = (!floor && floor !== 0)? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12].substring(0,3),
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }

        //console.log(data);

        return data;
    };



    window.store1 = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });


});

Ext.onReady(function () {

    var data1Series = {
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

    var data2Series = {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        smooth: false,
        fill: false,
        xField: 'name',
        yField: 'data2',
        showMarkers : false,
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    };

    var data3Series = {
        type: 'line',
        highlight: {
            size: 7,
            radius: 7
        },
        axis: 'left',
        smooth: false,
        fill: false,
        xField: 'name',
        yField: 'data3',
        showMarkers : false,
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    };

    var xAxes = {
        type: 'Numeric',
        minimum: 0,
        position: 'left',
        fields: ['data1', 'data2', 'data3'],
        title: 'Number of Hits',
        minorTickSteps: 1,
        grid: {
            odd: {
                opacity: 1,
                fill: '#eeeeee',
                stroke: '#eeeeee',
                'stroke-width': 0.5
            }
        }
    };

    var yAxes = {
        type: 'Category',
        position: 'bottom',
        fields: ['name'],
        title: 'Month of the Year'
    };

    var chart = Ext.create('Ext.chart.Chart', {
        xtype: 'chart',
        style: 'background:#fff',
        animate: true,
        store: store1,
        shadow: true,
        //theme: 'Category1',
        axes: [xAxes, yAxes],
        series: [data1Series, data2Series, data3Series]
    });

    var current = "Monthly";

    var toggleHandler = function(button, state){
        if(current != button.text && state) {
            current = button.text;
            console.log("change to "+button.text);
        }
    };

    Ext.create('Ext.panel.Panel', {
        width: 800,
        height: 400,
        tbar: [
            { xtype: 'button', text: 'Annual', toggleGroup: 'dateType', toggleHandler: toggleHandler },
            { xtype: 'button', text: 'Monthly', toggleGroup: 'dateType', toggleHandler: toggleHandler, pressed: true },
            { xtype: 'button', text: 'Daily', toggleGroup: 'dateType', toggleHandler: toggleHandler },
            { xtype: 'tbspacer', width: 50 },
            { xtype: 'button', text: 'Option 1', toggleGroup: 'option' },
            { xtype: 'button', text: 'Option 2', toggleGroup: 'option' }
        ],
        layout: 'fit',
        items: chart,
        renderTo: Ext.get(document.getElementById("chart"))
    });

});