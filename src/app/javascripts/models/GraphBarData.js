Ext.define("C3.data.graph.BarData", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'category', type: 'string'},
        {name: 'cost', type: 'int'},
        {name: 'savings', type: 'int'},
        {name: 'payback', type: 'string'}
    ]
})