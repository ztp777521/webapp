/**
 * 商户列表
 */
Ext.define('eapp.view.hexiejiayuan.ShopList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'shoplistview',
    
    config: 
    {        
        title:'群列表',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{shopName}</span></div>',
			//'		<div><span>{materialPublicDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Shop', {data: jsonData.result});
    	me.setStore(store);
    }
});