Ext.define('C3.PEAT.ux.chart.series.AnnualBarChart', {

    extend: 'Ext.chart.series.Bar',

    type: 'annualbarchart',

    alias: ['series.annualbarchart'],

    alternateClassName: [],

    column: true,

    /**
     * @cfg style Style properties that will override the theming series styles.
     */
    style: {
        color : '#0000FF',
        fill : '#0000FF'
    },

    /**
     * @cfg {Number} gutter The gutter space between single bars, as a percentage of the bar width
     */
    gutter: 0,

    /**
     * @cfg {Number} groupGutter The gutter space between groups of bars, as a percentage of the bar width
     */
    groupGutter: 0,

    /**
     * @cfg {Number} xPadding Padding between the left/right axes and the bars
     */
    xPadding: 0,

    /**
     * @cfg {Number} yPadding Padding between the top/bottom axes and the bars
     */
    yPadding: 0,

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,

            store = chart.getChartStore(),

            data = store.data.items,

            i, total, record,

            bounds = me.bounds = me.getBounds(),

            items = me.items = [],

            yFields = me.yField,

            gutter = me.gutter / 100,

            groupGutter = me.groupGutter / 100,

            bbox = bounds.bbox,

            barWidth = bounds.barWidth,

            shrunkBarWidth = bounds.shrunkBarWidth,

            xPadding = me.xPadding,

            barsLen = bounds.barsLen,

            colors = me.colorArrayStyle,

            colorLength = colors && colors.length || 0,

            j, yValue, height, bottom, top, hasShadow, barAttr, counter, floorY;


        var hasPrevious = data.length > 3;

        for (i = 0, total = data.length; i < total; i++) {
            record = data[i];
            bottom = bounds.zero;
            top = bounds.zero;
            hasShadow = false;

            for (j = 0, counter = 0; j < barsLen; j++) {

                yValue = record.get(bounds.bars[j]);

                height = Math.round((yValue - Math.max(bounds.minY, 0)) * bounds.scale);

                barAttr = {
                    fill: colors[(barsLen > 1 ? j : 0) % colorLength]
                };

                var padding = 50;
                if(i == 0 && hasPrevious) {
                    padding = 70;
                }

                var xCoord = 20 + ((i == 0 && hasPrevious)? 60 : 0)
                    + bbox.x
                    + xPadding
                    + (barWidth - shrunkBarWidth) * 0.5
                    + i * barWidth * (1 + gutter)
                    + counter * bounds.groupBarWidth * (1 + groupGutter);

                Ext.apply(barAttr, {
                    height: height,
                    width: Math.max(bounds.groupBarWidth, 0) - padding,
                    x: xCoord,
                    y: bottom - height
                });

                if (height < 0) {
                    barAttr.y = top;
                    barAttr.height = Math.abs(height);
                }

                barAttr.x = Math.floor(barAttr.x) + 1;

                floorY = Math.floor(barAttr.y);
                if (!Ext.isIE9 && barAttr.y > floorY) {
                    floorY--;
                }
                barAttr.y = floorY;

                barAttr.width = Math.floor(barAttr.width);

                barAttr.height = Math.floor(barAttr.height);

                items.push({
                    series: me,
                    yField: yFields[j],
                    storeItem: record,
                    value: [record.get(me.xField), yValue],
                    attr: barAttr,
                    point: [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height]
                });

                counter++;
            }
        }
    }
});