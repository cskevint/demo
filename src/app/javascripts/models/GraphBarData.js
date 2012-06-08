Ext.define("C3.data.graph.BarData", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'type', type: 'string'},

        {name: 'spendingTotal', type: 'int'},
        {name: 'spendingElectricity', type: 'int'},
        {name: 'spendingGas', type: 'int'},

        {name: 'electricityUsage', type: 'int'},
        {name: 'gasUsage', type: 'int'},
        {name: 'co2Usage', type: 'int'}
    ]
});