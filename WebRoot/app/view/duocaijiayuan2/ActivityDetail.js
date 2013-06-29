Ext.define('eapp.view.duocaijiayuan.ActivityDetail',
{
	extend:'Ext.Container',
	
	xtype:'activitydeatilview',
	
	config:
	{
		title: '详情',
		layout: 'fit',
	    data: null,
		cid:0,
	    items: 
		[
	        {
	            xtype: 'formpanel',
				flex: 1,
	            items: [
				{
	                xtype: 'container',
	                name: 'sign',
	            }, 
	            {
	                xtype: 'container',
	                name: 'sendtime',
	            },
	            {
	                xtype: 'fieldset',
	                items: 
	                [
						{
		                    xtype: 'container',
		                    name: 'message'
		                }
					]
	            }, 
	            ]
	        },
		]
	},
	
	/**
	 * 显示详情
	 */
	init:function(record)
	{
		console.log(record);
		var me = this;
		me.down('container[name="sign"]').setHtml('<div class="communicationview_padding" style="font-weight: bold;">' + record.get('activityName') + '</div>');
		me.down('container[name="sendtime"]').setHtml('<div class="communicationview_padding" style="font-size:12px; float: right;">'  + record.get('activityDateStart') + '~到~' + record.get('activityDateEnd') + '</div>');
		me.down('container[name="message"]').setHtml('<div class="communicationview_padding" style="overflow:hidden;word-warp:break-word;word-break:break-all;padding-top:20px;padding-left:25px;padding-right:15px;">' + record.get('activityContent') + '</div><div style="height: 20px">&nbsp;</div></div>');
	}
});