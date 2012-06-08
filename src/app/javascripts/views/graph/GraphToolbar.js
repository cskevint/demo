Ext.define("C3.ui.graph.Toolbar", {

    extend : "Ext.Component",

    spendTypeEnabled : true,

    initComponent : function() {
        var me = this;
        me.callParent(arguments);

        var clickHandler = function() {
            me.fireEvent("filter", me.getFilterData());
        };

        /* Left Buttons */

        me.annual = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.annual,
            toggleGroup: "dateType",
            handler: clickHandler
        });

        me.monthly = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.monthly,
            toggleGroup: "dateType",
            handler: clickHandler
        });

        me.daily = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.daily,
            toggleGroup: "dateType",
            handler: clickHandler
        });

        /* Center Buttons */

        me.total = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.total,
            toggleGroup: "spendType",
            handler: clickHandler
        });

        me.electricity = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.electricity,
            toggleGroup: "spendType",
            handler: clickHandler
        });

        me.gas = new C3.ui.graph.FilterButton({
            text: C3.i18n.current.gas,
            toggleGroup: "spendType",
            handler: clickHandler
        });

        /* Right Buttons */

        me.previous = new C3.ui.graph.OverlayButton({
            text: C3.i18n.current.previousPeriod,
            handler: clickHandler
        });

        me.actions = new C3.ui.graph.OverlayButton({
            text: C3.i18n.current.planActions,
            handler: clickHandler
        });

        me.weather = new C3.ui.graph.OverlayButton({
            text: C3.i18n.current.weather,
            handler: clickHandler
        });

        /* Layout */

        me.toolbar = new Ext.toolbar.Toolbar({
            width: me.width,
            items: [
                {xtype: "tbspacer", width: 25},
                me.annual,
                me.monthly,
                me.daily,
                {xtype: "tbspacer", width: 25},
                me.total,
                me.electricity,
                me.gas,
                {xtype: "tbfill"},
                me.previous,
                me.actions,
                me.weather,
                {xtype: "tbspacer", width: 25}
            ]
        });

        me.applyStateLogic();

    },

    onRender : function() {
        var me = this;
        me.callParent(arguments);

        me.toolbar.render(this.el);
    },

    applyStateLogic : function() {
        var me = this;

        me.annual.pressed = true;
        me.total.pressed = true;
        me.actions.disabled = true;
        me.weather.disabled = true;

        me.annual.on({
            click : function(){
                me.actions.setDisabled(true);
                me.weather.setDisabled(true);

                // uncomment this if the disabled state should not be displayed when pressed
                //me.actions.toggle(false, true);
                //me.weather.toggle(false, true);
            }
        });

        me.monthly.on({
            click : function(){
                me.actions.setDisabled(false);
                me.weather.setDisabled(false);
            }
        });

        me.daily.on({
            click : function(){
                me.actions.setDisabled(false);
                me.weather.setDisabled(false);
            }
        });

    },

    setSpendTypeEnabled : function(enabled) {
        this.spendTypeEnabled = enabled;
        this.total.setVisible(enabled);
        this.electricity.setVisible(enabled);
        this.gas.setVisible(enabled);
    },

    getGrainType : function() {
        var me = this;
        return me.annual.pressed ? "annual" : (me.monthly.pressed ? "monthly" : "daily");
    },

    getSpendType : function() {
        var me = this, spendType =  me.total.pressed ? "total" : (me.electricity.pressed ? "electricity" : "gas");
        return me.spendTypeEnabled ? spendType : null;
    },

    getFilterData : function() {
        var me = this;
        return {
            grainType : me.getGrainType(),
            spendType : me.getSpendType(),
            previous : me.previous.pressed,
            actions : me.actions.pressed,
            weather : me.weather.pressed
        };
    }
});