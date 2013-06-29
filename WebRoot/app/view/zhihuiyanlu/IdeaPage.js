Ext.define('eapp.view.zhihuiyanlu.IdeaPage', 
{
	extend: 'Ext.Container',
	xtype: 'ideapageview',

	config: 
	{
		pageName: 'indexpageview',
		title: '意见建议',
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
							//意见建议
							{
								xtype: 'labelEx',
								id:'aboutuspage',
								name:'aboutuspage',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//意见建议列表
							{
								xtype: 'labelEx',
							    id:'suggestionpage',
								name:'suggestionpage',
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
		var aboutuspage = me.down('labelEx[name="aboutuspage"]');
		var suggestionpage = me.down('labelEx[name="suggestionpage"]');
		
		aboutuspage.setContent('<div><div class="left myindexitem textcolor4 margin2">提交意见</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
		suggestionpage.setContent('<div><div class="left myindexitem textcolor4 margin2">建议列表</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
	},
});