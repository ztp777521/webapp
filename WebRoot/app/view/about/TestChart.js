
Ext.define('eapp.view.about.TestChart', 
{
    extend: 'Ext.chart.Chart',
    xtype: 'testchart',

    config: {
        animate: true,
        store: 'TestStore',
        axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['data1'],
            title: 'Sample Values',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: 'Sample Metrics'
        }],
        series: [{
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'data1',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }, {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            fill: true,
            xField: 'name',
            yField: 'data3',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]
    }
});