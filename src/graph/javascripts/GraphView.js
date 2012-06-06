Ext.define("C3.PEAT.ux.Graph.View", {
    extend : "Ext.Component",

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        me.switcher = new C3.PEAT.ux.Graph.Switcher({
            dock: "top"
        });

        me.toolbar = new C3.PEAT.ux.Graph.Toolbar({
            dock: "top"
        });

        me.annualChart = new C3.PEAT.ux.Graph.AnnualChart({
            store: C3.PEAT.ux.Graph.data.annual
        });

        me.panel = new Ext.panel.Panel({
            width: 800,
            height: 400,
            layout: "fit",
            dockedItems: [ me.switcher, me.toolbar ],
            items: me.annualChart
        });

        me.toolbar.on({
            filter : function(event){
                me.panel.items.clear();

                if(event.type == "annual") {

                    me.panel.items.add("annual", me.annualChart);

                } else if(event.type == "monthly") {

                    me.monthlyChart = new C3.PEAT.ux.Graph.MonthlyChart({
                        store: C3.PEAT.ux.Graph.data.monthly
                    });
                    me.panel.items.add("monthly", me.monthlyChart);

                } else if(event.type == "daily") {

                }

                me.panel.doLayout();
            },
            overlay : function(event) {
                console.log(event.type);
            }
        });
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.panel.render(this.el);
    }
});