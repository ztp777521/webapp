Ext.define('eapp.view.My', 
{
	extend: 'Ext.Container',
	xtype: 'myView',

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
							{
								xtype: 'labelEx',
								id: 'wanshanziliaoid',
								name: 'wanshanziliaoid',
								cls: 'line2',
								dataValue: 'ziliao'
							},
							{
								xtype: 'labelEx',
								id: 'uppasswordid',
								name: 'uppasswordid',
								cls: 'line2',
								dataValue: 'passWord'
							},
							{
								xtype: 'labelEx',
								id: 'cllloginid',
								name: 'cllloginid',
								cls: 'line2',
								dataValue: 'zhuXiao'
							},
						]
					}
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
		var myMessageList = Ext.ComponentQuery.query('#ruLuXinxiid',me)[0];
		var myWeibo = Ext.ComponentQuery.query('#wanshanziliaoid',me)[0];
		var myFriendList = Ext.ComponentQuery.query('#uppasswordid',me)[0];
		var myDiPan = Ext.ComponentQuery.query('#cllloginid',me)[0];
		var user = eapp.util.GlobalData.getCurrentUser();
		var username = user.get('realname');
		var userid = user.get('userid');
		Ext.ComponentQuery.query('#namecontainerid',me)[0].setHtml('当前用户:' + username);
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">完善个人信息</div></div>');
		myFriendList.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">修改密码</div></div>');
		myDiPan.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">注销退出</div></div>');
	}
});