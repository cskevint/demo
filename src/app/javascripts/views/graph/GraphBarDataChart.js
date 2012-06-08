Ext.define("C3.ui.graph.BarDataChart", {
    extend : "C3.ui.graph.AbstractChart",

    /*
     * Default filterData object used to create the series and visuals for the monthly chart.
     */
    filterData : {
        usage: "spending",
        spendType : "total",
        previous : false
    },

    initComponent : function() {
        var me = this;

        var yAxisField;

        if(me.filterData.usage == "spending") {
            if(me.filterData.spendType == "electricity") {
                yAxisField = "spendingElectricity";
            } else if(me.filterData.spendType == "gas") {
                yAxisField = "spendingGas";
            } else {
                yAxisField = "spendingTotal";
            }
        } else if(me.filterData.usage == "electricity") {
            yAxisField = "electricityUsage";
        } else if(me.filterData.usage == "gas") {
            yAxisField = "gasUsage";
        } else if(me.filterData.usage == "co2") {
            yAxisField = "co2Usage";
        }

        if(!me.filterData.previous) {
            me.store.filter("type",/(current|average|efficient)/);
        } else {
            me.store.clearFilter();
        }

        me.chartInner = new Ext.chart.Chart({
            flex : 1,
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
//                title: "Dollars",
                grid: true
            }],
            series: [{
                type: "annualbarchart",
                axis: "left",
                xField: "name",
                yField: yAxisField,
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

        Ext.define('AnnualGraphText', {
            extend: 'Ext.data.Model',
            fields: [
                { name:'accountName', type:'string' },
                { name:'similar', type:'string' },
                { name:'efficient', type:'string' }
            ]
        });

        me.textView = new Ext.view.View({
            width : 300,
            style : {
                'padding-left':"25px"
            },
            store: new Ext.data.Store({
                model: 'AnnualGraphText',
                data: [
                    { accountName : "Boondock Berkeley", similar : "18%", efficient : "32%" }
                ]
            }),
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div style="margin-top:50px">',
                        '<div style="margin-bottom:5px;">{accountName}</div>',
                        '<div style="margin-bottom:15px;">'+C3.i18n.current.annualEnergySpending+'</div>',
                        '<div style="margin-bottom:25px;">'+C3.i18n.current.howDoYouCompare+'</div>',
                        '<div style="margin-bottom:5px;margin-left: 30px">'+C3.i18n.applyArgs(C3.i18n.current.spendSimilar,"{similar}")+'</div>',
                        '<div style="margin-left:30px;">'+C3.i18n.applyArgs(C3.i18n.current.spendEfficient,"{efficient}")+'</div>',
                    '</div>',
                '</tpl>'
            )
        });

        me.chart = new Ext.Container({
            width : me.width,
            height : me.height,
            layout: {
                flex : true,
                type: "hbox",
                align: "stretch"
            },
            items : [
                me.textView,
                me.chartInner
            ]
        });

    }
});