Ext.ns("C3.PEAT.ux.Graph.data");

C3.PEAT.ux.Graph.data.annual = new Ext.data.JsonStore({
    fields: ["name", "data"],
    data: [
        {name: "Previous Year", data: 10},
        {name: "Current Year", data: 20},
        {name: "Efficient", data: 10},
        {name: "Average", data: 50}
    ]
});

C3.PEAT.ux.Graph.data.monthly = new Ext.data.JsonStore({
    fields: ["name", "total", "electricity", "gas"],
    data: [
        {name: "Jan", total: 10, electricity: 5, gas: 5},
        {name: "Feb", total: 20, electricity: 10, gas: 10},
        {name: "Mar", total: 10, electricity: 8, gas: 2},
        {name: "Apr", total: 50, electricity: 10, gas: 40},
        {name: "May", total: 40, electricity: 30, gas: 10},
        {name: "Jun", total: 10, electricity: 0, gas: 10},
        {name: "Jul", total: 70, electricity: 55, gas: 15},
        {name: "Aug", total: 20, electricity: 15, gas: 5},
        {name: "Sep", total: 80, electricity: 45, gas: 35},
        {name: "Oct", total: 90, electricity: 80, gas: 10},
        {name: "Nov", total: 70, electricity: 65, gas: 5},
        {name: "Dec", total: 30, electricity: 15, gas: 15}
    ]
});