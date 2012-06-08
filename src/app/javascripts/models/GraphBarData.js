Ext.define("C3.data.graph.BarData", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'type', type: 'string'},

        {name: 'total', type: 'int'},
        {name: 'electricity', type: 'int'},
        {name: 'gas', type: 'int'}
    ]
});