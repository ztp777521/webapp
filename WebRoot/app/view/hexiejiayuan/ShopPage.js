Ext.define('eapp.view.hexiejiayuan.ShopPage', 
{
	extend: 'Ext.Container',
	xtype: 'shoppageview',

	config: 
	{
		title:'个人帐号',
		layout: 'fit',
		items:
		[
			{
				xtype:'formpanel',
				items:
				[
					{
						xtype: 'container',
						items:
						[
							{
					            xtype: 'container',
								id: 'namecontainerid',
								width: null
					        },
						]
					},
					{
						xtype: 'fieldset',
						items:
						[
						 	//申请商户
							{
								xtype: 'labelEx',
								id: 'sqshopid',
								name: 'sqshopname',
								cls: 'line2',
								dataValue: 'shequwangge'
							},
						]
					},
					 {
				   		xtype: 'fieldset',
						items:
						[
							//发布服务
							{
								xtype: 'labelEx',
							    id:'fbfwshopid',
								name:'fbfwshopname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//查看服务
							{
								xtype: 'labelEx',
							    id:'ckfwshopid',
								name:'ckfwshopname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				]
			}
		]
	},
	
	/**
	 * 显示用户信息
	 */
	init:function()
	{
		//this.element.dom.style.webkitTransform = '';
		
		var me = this;
		// 申请服务
		var myWeibo = Ext.ComponentQuery.query('#sqshopid',me)[0];
		// 发布服务
		var shenqinggezhangname = me.down('labelEx[name="fbfwshopname"]');
		// 查看服务
		var wodewanggename = me.down('labelEx[name="ckfwshopname"]');
		
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">申请服务</div></div>');
		shenqinggezhangname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">发布服务</div></div>');
		wodewanggename.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">查看服务</div></div>');
	}
});