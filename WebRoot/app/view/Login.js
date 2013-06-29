/**
 * 用户登录
 */
Ext.define('eapp.view.Login', 
{
	extend: 'Ext.Container',
	xtype: 'loginView',
	
	config:
	{
		title:'用户登录',
		iconCls:'',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		loginCallback: null,
		items:
		[
		   {
		   	   xtype: 'formpanel',
			   items:
			   [
			   		{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title: '用户登录',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'usernameLogin',
								name:'usernameLogin',
								placeHolder: '请输入用户名',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'passwordfield',
								id: 'passwordLogin',
								name:'passwordLogin',
								placeHolder: '请输入密码',
								autoCapitalize: true,
								clearIcon: true
							},
						]
					},
					{xtype: 'spacer'},
					{
						xtype: 'button',
						text: '登录',
						ui: 'confirm',
						id: 'loginButton',
						name: 'loginButton'
					},
					{xtype: 'spacer', cls:'margin1'},
					{
						xtype: 'button',
						text: '注册',
						id: 'regButton',
						name : 'regButton',
				   }
			   ]
		   }
		]
	},
});
