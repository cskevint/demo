Ext.define("C3.PEAT.ux.Graph.AnnualChart", {
    extend : "C3.PEAT.ux.Graph.AbstractChart",

    initComponent : function() {
        var me = this;

        me.chart = new Ext.chart.Chart({
            width : me.width,
            height : me.height,
            style: "background:#fff",
            store: me.store,
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

    }
});