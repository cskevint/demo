Ext.ns("C3.PEAT.ux.Graph");
(function(Graph){

    //<editor-fold desc="Graph.button">

    Graph.button = {};

    Graph.button.dateTypeHandler = function() {
        var current = Graph.panel.items.get(0);
        Graph.panel.items.remove(current);
        if(Graph.button.annual.pressed) {
            Graph.panel.items.add(Graph.chart.annual);

        } else if(Graph.button.monthly.pressed) {
            Graph.panel.items.add(Graph.chart.monthly);

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
        pressed: true,
        toggleGroup: "data",
        handler: function(){

        }
    });

    Graph.button.electricity = new Ext.button.Button({
        text: "Electricity",
        toggleGroup: "data",
        handler: function(){

        }
    });

    Graph.button.gas = new Ext.button.Button({
        text: "Gas",
        toggleGroup: "data",
        handler: function(){

        }
    });

    Graph.button.byUse = new Ext.button.Button({
        text: "By Use",
        toggleGroup: "data",
        handler: function(){

        }
    });

    Graph.button.previous = new Ext.button.Button({
        text: "Previous Period",
        enableToggle: true,
        handler: function(){

        }
    });

    Graph.button.actions = new Ext.button.Button({
        text: "Plan Actions",
        enableToggle: true,
        handler: function(){

        }
    });

    Graph.button.weather = new Ext.button.Button({
        text: "Weather",
        enableToggle: true,
        handler: function(){

        }
    });

    //</editor-fold>

    //<editor-fold desc="Graph.chart">

    Graph.chart = {};
    Graph.data = {};
    
    Graph.data.annual = new Ext.data.JsonStore({
        fields: ["name", "data"],
        data: [
            {name: "Previous Year", data: 10},
            {name: "Current Year", data: 20},
            {name: "Efficient", data: 10},
            {name: "Average", data: 50}
        ]
    });

    Graph.chart.annual = new Ext.chart.Chart({
        style: "background:#fff",
//        animate: true,
        store: Graph.data.annual,
        shadow: true,
        axes: [{
            type: "Numeric",
            minimum: 0,
            maximum: 100,
            position: "left",
            fields: ["data"],
            title: "Dollars",
            grid: true
        },{
            type: "Category",
            position: "bottom",
            fields: ["name"]
        }],
        series: [{
            type: "column",
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
            },
            renderer: function(sprite, storeItem, barAttr, i, store) {
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

    Graph.data.monthly = new Ext.data.JsonStore({
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

    Graph.chart.monthly = new Ext.chart.Chart({
        style: "background:#fff",
//        animate: true,
        store: Graph.data.monthly,
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
                    this.setTitle(storeItem.get('name') + ':&nbsp;$' + storeItem.get('data'));
                }
            }
        }]
    });

    //</editor-fold>

    Graph.panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        tbar: {
            items: [
                {xtype: "tbspacer", width: 25},
                Graph.button.annual,
                Graph.button.monthly,
                Graph.button.daily,
                {xtype: "tbspacer", width: 25},
                Graph.button.total,
                Graph.button.electricity,
                Graph.button.gas,
                Graph.button.byUse,
                {xtype: "tbfill"},
                Graph.button.previous,
                Graph.button.actions,
                Graph.button.weather,
                {xtype: "tbspacer", width: 25}
            ]
        },
        items: Graph.chart.annual
    });

})(C3.PEAT.ux.Graph);