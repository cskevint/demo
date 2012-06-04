Ext.onReady(function(){

    var drawComponent = Ext.create('Ext.draw.Component', {
        viewBox: true,
        items: [{
            type: 'circle',
            fill: '#79BB3F',
            radius: 100,
            x: 100,
            y: 100
        }]
    });


    Ext.create('Ext.Panel', {
        style: "1px solid red",
        width: 800,
        height: 400,
        layout: 'fit',
        items: [drawComponent]
    }).render(document.getElementById("chart"));

});

