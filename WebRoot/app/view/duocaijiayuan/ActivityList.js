/**
 * 活动列表页
 */
Ext.define('eapp.view.duocaijiayuan.ActivityList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'activitylistview',
    
    config: 
    {        
        title:'活动列表',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{activityName}</span></div>',
			//'		<div><span>结束时间{activityDateEnd}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Activity', {data: jsonData.result});
    	me.setStore(store);
    }
});