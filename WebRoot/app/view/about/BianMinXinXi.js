Ext.define('eapp.view.about.BianMinXinXi',
{
	extend:'Ext.dataview.List',
	xtype:'bianminxinxilist',
	config:
	{
		title:'政务服务',
		iconCls: 'team',
		cls:'textcolor7',
		stroe:null,
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
	 * 显示便民信息
	 */
	init:function(jsonData)
	{
		var me = this;
		var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
		console.log(store);
    	me.setStore(store);
	}
});