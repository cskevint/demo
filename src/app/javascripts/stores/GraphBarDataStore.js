Ext.define("C3.store.graph.BarData", {
    extend: 'Ext.data.JsonStore',
    model: 'C3.data.graph.BarData',

    includePrevious : function(include) {
        var me = this;
        if (include) {
            me.clearFilter();
        } else {
            me.filter("type", /(current|average|efficient)/);
        }
    }
});