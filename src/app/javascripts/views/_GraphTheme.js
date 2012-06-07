(function(){

    var hidden = "#FFFFFF",
        axisColor = "#666666",

        baseColor = "#000000",

        current = "#94CCFD",
        previous = "#FBC978",

        weatherLow = "#B9D8F0",
        weatherHigh = "#FDFBD3";

    function createTheme(themeId, colors) {
        Ext.define('Ext.chart.theme.PointDataTheme' + themeId, {
            extend: 'Ext.chart.theme.Base',

            constructor: function(config) {
                Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                    axis: {
                        fill: baseColor,
                        stroke: axisColor
                    },

                    axisLabelLeft: {
                        fill: baseColor
                    },
                    axisLabelTop: {
                        fill: baseColor
                    },
                    axisLabelRight: {
                        fill: baseColor
                    },
                    axisLabelBottom: {
                        fill: hidden
                    },

                    axisTitleRight: {
                        fill: baseColor
                    },
                    axisTitleBottom: {
                        fill: hidden
                    },
                    axisTitleLeft: {
                        fill: baseColor
                    },
                    axisTitleTop: {
                        fill: baseColor
                    },

                    colors: colors

                }, config));
            }
        });
    }

    /*
     * A 1 indicates that a particular series is being shown.
     * The order is current data, previous period data, weather data.
     */
    createTheme("100", [current]);
    createTheme("101", [current, weatherLow, weatherHigh]);
    createTheme("110", [current, previous]);
    createTheme("111", [current, previous, weatherLow, weatherHigh]);

})();