Ext.define("C3.ui.graph.Switcher", {
    extend : "Ext.Component",

    eventTypes : ["spending", "electricity", "gas", "co2", "buildingUse"],

    initComponent : function(config) {
        var me = this;
        me.callParent(arguments);

        me.spending = new C3.ui.graph.SwitcherButton({
            eventType : "spending",
            toggleGroup: "switcher",
            pressed: true,
            text: C3.i18n.current.spending+"<br/>$1000"
        });

        me.electricity = new C3.ui.graph.SwitcherButton({
            eventType : "electricity",
            toggleGroup: "switcher",
            text: C3.i18n.current.electricity+"<br/>100kWh"
        });

        me.gas = new C3.ui.graph.SwitcherButton({
            eventType : "gas",
            toggleGroup: "switcher",
            text: C3.i18n.current.gas+"<br/>50therms"
        });

        me.co2 = new C3.ui.graph.SwitcherButton({
            eventType : "co2",
            toggleGroup: "switcher",
            text: C3.i18n.current.co2+"<br/>10tons</sub>"
        });

        me.buildingUse = new C3.ui.graph.SwitcherButton({
            eventType : "buildingUse",
            toggleGroup: "switcher",
            text: C3.i18n.current.buildingEndUse
        });

        me.buildingUse.addCls("last");

        Ext.each(me.eventTypes, function(o){
            me[o].on({
                switch : function(event) {
                    me.fireEvent("switch", event);
                }
            });
        });
    },

    onRender: function() {
        var me = this;
        me.callParent(arguments);

        me.container = new Ext.Container({
            width: me.width,
            height: me.height,
            layout: {
                type: "hbox",
                align: "stretch"
            },
            items : [
                me.spending,
                me.electricity,
                me.gas,
                me.co2,
                me.buildingUse
            ],
            renderTo: this.el
        });
    },

    getSelectedValue : function() {
        var me = this, value = me.eventTypes[0];
        Ext.each(me.eventTypes, function(o){
            if(me[o].pressed) {
                value = me[o].eventType;
            }
        });
        return value;
    }
});