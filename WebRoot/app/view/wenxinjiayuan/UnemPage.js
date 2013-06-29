Ext.define('eapp.view.wenxinjiayuan.UnemPage', 
{
	extend: 'Ext.Container',
	xtype: 'unempageview',

	config: 
	{
		pageName: 'indexpageview',
		title: '温情家园',
		layout:'fit',
		items: 
		[
        	{
				xtype: 'formpanel',
				items:
				[
					{
						xtype: 'spacer',
						cls: 'margin3'
					},
			       {
				   		xtype: 'fieldset',
						items:
						[
							//失业提交
							{
								xtype: 'labelEx',
								id:'aboutuspage',
								name:'unemsubmitname',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//我的信息
							{
								xtype: 'labelEx',
							    id:'suggestionpage',
								name:'unemmyinfoname',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   }
				]
			}	
    	]
	},

	initialize: function()
	{
		this.callParent();
	},
	
	/**
	 * 
	 */
	init:function()
	{
		var me = this;
		//失业提交
		var aboutuspage = me.down('labelEx[name="unemsubmitname"]');
		//我的信息
		var suggestionpage = me.down('labelEx[name="unemmyinfoname"]');
		
		aboutuspage.setContent('<div><div class="left myindexitem textcolor4 margin2">失业提交</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
		suggestionpage.setContent('<div><div class="left myindexitem textcolor4 margin2">我的信息</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
	},
});