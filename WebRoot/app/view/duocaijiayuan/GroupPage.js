Ext.define('eapp.view.duocaijiayuan.GroupPage', 
{
	extend: 'Ext.Container',
	xtype: 'grouppageview',

	config: 
	{
		title:'多彩家园',
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
						 	//创建活动群
							{
								xtype: 'labelEx',
								id: 'createactivityid',
								name: 'createactivityname',
								cls: 'line2',
								dataValue: 'shequwangge'
							},
						]
					},
					 {
				   		xtype: 'fieldset',
						items:
						[
							//关注或者取消关注群
							{
								xtype: 'labelEx',
							    id:'gzactivityid',
								name:'gzactivityname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//关注的活动群列表
							{
								xtype: 'labelEx',
							    id:'fqactivityid',
								name:'fqactivityname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//查看活动
							{
								xtype: 'labelEx',
							    id:'ckactivityid',
								name:'ckactivityname',
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
		// 创建活动群
		var myWeibo = Ext.ComponentQuery.query('#createactivityid',me)[0];
		// 群列表
		var shenqinggezhangname = me.down('labelEx[name="gzactivityname"]');
		// 关注的活动群列表
		var wodewanggename = me.down('labelEx[name="fqactivityname"]');
		// 查看活动列表
		var tijiaoyijianname = me.down('labelEx[name="ckactivityname"]');
		
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">创建活动群</div></div>');
		shenqinggezhangname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">群列表</div></div>');
		wodewanggename.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">关注的活动群</div></div>');
		tijiaoyijianname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">查看活动</div></div>');
	}
});