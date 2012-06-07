Ext.define("C3.data.graph.Monthly", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'key', type: 'int'},

        {name: 'startDate', type: 'string'},
        {name: 'endDate', type: 'string'},

        {name: 'spendingTotal', type: 'int'},
        {name: 'spendingElectricity', type: 'int'},
        {name: 'spendingGas', type: 'int'},

        {name: 'previousTotal', type: 'int'},
        {name: 'previousElectricity', type: 'int'},
        {name: 'previousGas', type: 'int'},

        {name: 'electricityUsage', type: 'int'},
        {name: 'gasUsage', type: 'int'},
        {name: 'co2Usage', type: 'int'},

        {name: 'weatherAverage', type: 'int'},
        {name: 'weatherLow', type: 'int'},
        {name: 'weatherHigh', type: 'int'}
    ]
});