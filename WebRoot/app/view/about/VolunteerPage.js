Ext.define('eapp.view.gongjianhexie.VolunteerPage', 
{
	extend: 'Ext.Container',
	xtype: 'volunteerpageview',

	config: 
	{
		pageName: 'volunteerpageview',
		title: '共建和谐',
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
							//社区网格
							{
								xtype: 'labelEx',
								id:'shequwanggeid',
								name:'shequwanggename',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//申请格长
							{
								xtype: 'labelEx',
							    id:'shenqinggezhangid',
								name:'shenqinggezhangname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//我的网格
							{
								xtype: 'labelEx',
							    id:'wodewanggeid',
								name:'wodewanggename',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//提交意见
							{
								xtype: 'labelEx',
							    id:'tijaoyijianid',
								name:'tijiaoyijianname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//格长风采
							{
								xtype: 'labelEx',
							    id:'gezhangfengcaiid',
								name:'gezhagnfengcainame',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//格长投票
							{
								xtype: 'labelEx',
							    id:'gezhangtoupiaoid',
								name:'gezhangtoupiaoname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
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
		// 社区网格
		var shequwanggename = me.down('labelEx[name="shequwanggename"]');
		// 申请格长
		var shenqinggezhangname = me.down('labelEx[name="shenqinggezhangname"]');
		// 我的网格
		var wodewanggename = me.down('labelEx[name="wodewanggename"]');
		// 提交意见
		var tijiaoyijianname = me.down('labelEx[name="tijiaoyijianname"]');
		// 格长风采
		var gezhagnfengcainame = me.down('labelEx[name="gezhagnfengcainame"]');
		// 格长投票
		var gezhangtoupiaoname = me.down('labelEx[name="gezhangtoupiaoname"]');
		
		shequwanggename.setContent('<div><div class="left myindexitem textcolor4 margin2">社区网格		</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
//		shenqinggezhangname.setContent('<div><div class="left myindexitem textcolor4 margin2">申请格长	</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
//		
//		wodewanggename.setContent('<div><div class="left myindexitem textcolor4 margin2">我的网格	</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
//		tijiaoyijianname.setContent('<div><div class="left myindexitem textcolor4 margin2">提交意见	</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
//		gezhagnfengcainame.setContent('<div><div class="left myindexitem textcolor4 margin2">格长风采	</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
//		gezhangtoupiaoname.setContent('<div><div class="left myindexitem textcolor4 margin2">格长投票	</div><div class="right textcolor3 myindexitem1 margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
	},
	
});