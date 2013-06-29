Ext.define('eapp.view.about.TongZhiGongGao',
{
	extend:'Ext.dataview.List',
	xtype:'tongzhigonggaolist',
	
	config:
	{
		title:'通知公告',
		iconCls: 'star',
		cls:'textcolor7',
		store:null,
		//layout: 'fit',
		itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}呵呵呵</span></div>',
			'		<div><span>{materialPublicDate}哈哈哈</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
	},

	/**
	 * 显示通知公告
	 */
	init:function(jsonData)
	{
		var me = this;
		var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
		console.log(store);
    	me.setStore(store);
	},
});