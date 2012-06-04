Ext.define("C3.PEAT.ux.ChartBar",{
    extend: "Ext.Component",

    constructor: function(config){
        this.callParent(arguments);
        this.initConfig(config);

        Ext.apply(this, config, {
            barColor: '#79BB3F',
            barX: 0,
            barHeight: 100,
            canvasHeight: 400
        });
    },

    onRender: function() {
        var barWidth = 50, y = this.canvasHeight-this.barHeight;

        Ext.create('Ext.draw.Component', {
            height: this.canvasHeight,
            viewBox: false,
//            autoSize: true,
            items: [
                {
                    type: 'rect',
                    fill: this.barColor,
                    x: 350+this.barX,
                    y: y,
                    height: this.barHeight,
                    width: barWidth
                }
            ],
            renderTo: this.el
        });
    }

});

Ext.define("C3.PEAT.ux.Chart", {
    extend: "Ext.Component",

    // chartWidth
    // chartHeight

    constructor: function(config) {
        this.callParent(arguments);
        this.initConfig(config);

        Ext.apply(this, config);
    },

    onRender: function() {

        var blueBar = new C3.PEAT.ux.ChartBar({
            canvasHeight: 400,
            style: {
                position: "absolute",
            },
            barColor: "blue",
            barX: 150,
            barHeight: 50,
            renderTo: this.el
        });

        var redBar = new C3.PEAT.ux.ChartBar({
            canvasHeight: 400,
            style: {
                position: "absolute",
            },
            barColor: "red",
            barX: 50,
            barHeight: 150,
            renderTo: this.el
        });

        var greenBar = new C3.PEAT.ux.ChartBar({
            canvasHeight: 400,
            style: {
                position: "absolute",
            },
            barColor: "green",
            barX: 250,
            barHeight: 200,
            renderTo: this.el
        });

    }

});


