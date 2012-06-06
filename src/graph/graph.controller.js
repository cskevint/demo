Ext.ns("C3.PEAT.ux.Graph");

(function(Graph){

    var switcher = new C3.PEAT.ux.Graph.Switcher({
        dock: "top"
    });

    var toolbar = new C3.PEAT.ux.Graph.Toolbar({
        dock: "top"
    });

    var annualChart = new C3.PEAT.ux.Graph.AnnualChart({
        store: C3.PEAT.ux.Graph.data.annual
    });

    Graph.panel = new Ext.panel.Panel({
        width: 800,
        height: 400,
        layout: "fit",
        dockedItems: [ switcher, toolbar ],
        items: annualChart
    });

})(C3.PEAT.ux.Graph);
