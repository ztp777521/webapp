/**
 * 关注的活动群列表
 */
Ext.define('eapp.view.duocaijiayuan.GroupList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'grouplistview',
    
    config: 
    {        
        title:'关注的群列表',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{groupName}</span></div>',
			//'		<div><span>{materialPublicDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Group', {data: jsonData.result});
    	me.setStore(store);
    }
});