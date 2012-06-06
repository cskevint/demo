Ext.ns("C3.PEAT.ux.Graph");

(function(Graph){

    var switcher,
        toolbar,
        annualChart,
        monthlyChart,
        panel;

    switcher = new C3.PEAT.ux.Graph.Switcher({
        dock: "top"
    });

    toolbar = new C3.PEAT.ux.Graph.Toolbar({
        dock: "top"
    });

    annualChart = new C3.PEAT.ux.Graph.AnnualChart({
        store: C3.PEAT.ux.Graph.data.annual
    });

    panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        dockedItems: [ switcher, toolbar ],
        items: annualChart
    });

    toolbar.on({
        filter : function(event){
            panel.items.clear();

            if(event.type == "annual") {

                panel.items.add("annual", annualChart);

            } else if(event.type == "monthly") {

                monthlyChart = new C3.PEAT.ux.Graph.MonthlyChart({
                    store: C3.PEAT.ux.Graph.data.monthly
                });
                panel.items.add("monthly", monthlyChart);

            } else if(event.type == "daily") {

            }

            panel.doLayout();
        },
        overlay : function(event) {
            console.log(event.type);
        }
    });

    Graph.panel = panel;

})(C3.PEAT.ux.Graph);
