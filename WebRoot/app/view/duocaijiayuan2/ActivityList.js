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
        pageNo:1,
        pageSize:10,
        
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
    	var pageNo = me.getPageNo();
    	var pageSize = me.getPageSize();
    	if(pageNo == null || pageNo == 'undefined')
    		pageNo = 1;
    	if(pageSize == null || pageSize == 'undefined')
    		pageSize = 10;
    		
    	var store = Ext.create('eapp.store.Group', {data: jsonData.result});
    	me.setStore(store);
    	
//    	var user = eapp.util.GlobalData.getCurrentUser();
//		var userid = user.get('userid');
//		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
//		var groupService = Ext.create('eapp.business.GroupService');
//		groupService.findactivity(userid,pageNo,pageSize,
//		{
//			success:function(jsonData)
//			{
//				var store = Ext.create('eapp.store.Group', {data: jsonData.result});
//		    	me.setStore(store);
//				Ext.Viewport.setMasked(false);
//			},
//			failure: function(message) 
//		    {
//		    	console.log(message);
//				Ext.Viewport.setMasked(false);
//		    }
//		});
    },
});