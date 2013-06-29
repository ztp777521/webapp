Ext.define('eapp.view.about.Test001',
{
   
    extend: 'Ext.Container',
    xtype:'testview',
    
    config: 
    {
		title:'进度条',
		fullscreen: true,
		items:
		[
			 {
//				 	xtype: 'formpanel',
					// ui:'neutral',
					// docked: 'top',
					// scrollable: false,
				 	items:
			 		[
						{
						    xtype: 'sliderfield',
						    label: 'Percentage',
						    id:'sliderid',
						    name:'slideridname',
						    value: 1,
						    minValue: 0,
						    maxValue: 300
						}
			 		] 
			 }
		]
    },
    
    init:function()
    {
    	var me = this;
    	var slider = me.down('sliderfield[name=slideridname]');
    	me.timeOut(slider);
    	console.log(slider);
    },
    
    timeOut:function(slider)
    {
    	var me = this;
        setTimeout(function()
    	{
    		var value = slider.getValue();
    		console.log(value);
    		value = (value-0) +1;
    		slider.setValue(value);
    		if(value >= 300)
    			return;
    		else
    			me.timeOut(slider);
    	}, 1000);
    }
    
});