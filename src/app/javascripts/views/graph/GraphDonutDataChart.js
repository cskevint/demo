Ext.define("C3.ui.graph.DonutDataChart", {
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

        me.chartInner = new Ext.chart.Chart({
            flex : 1,
            store: new Ext.data.JsonStore({
                fields : ["name", "data"],
                data : [
                    { name: "Kevin1", data : 5 },
                    { name: "Kevin2", data : 10 },
                    { name: "Kevin3", data : 15 },
                    { name: "Kevin4", data : 20 },
                    { name: "Kevin5", data : 25 }
                ]
            }),
            shadow: false,
            legend: {
                position: 'right'
            },
            series: [{
                type: 'pie',
                field: 'data',
                showInLegend: true,
                donut: 75
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