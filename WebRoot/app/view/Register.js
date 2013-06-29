/**
 * 用户注册
 */
Ext.define('eapp.view.Register', 
{
	extend: 'Ext.Container',
	xtype: 'registerView',
	
	config:
	{
		title:'用户注册',
		layout: 'fit',

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
						title: '用户注册',
						items: 
						[
							{
			                    xtype: 'textfield',
			                    id: 'loginnameid',
			                    name:'loginname',
								placeHolder: '请输入登录名',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'passwordfield',
			                    id: 'passwordid',
			                    name:'passwordname',
								placeHolder: '请输入登录密码',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
							 {
			                    xtype: 'textfield',
			                    id: 'usernameid',
			                    name:'username',
								placeHolder: '请输入用户名',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'textfield',
			                    id: 'telid',
			                    name:'telname',
								placeHolder: '请输入手机号',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'textfield',
			                    id: 'emailid',
			                    name:'emailname',
								placeHolder: '请输入电子邮件',
			                    autoCapitalize: true,
			                    clearIcon: true
			                },{
			                    xtype: 'textfield',
			                    id: 'numberid',
			                    name:'numbername',
								placeHolder: '请输入亲情号（可选）',
			                    autoCapitalize: true,
			                    clearIcon: true
			                },
						]
					},
					{
						xtype:'button',
						text:'注册',
						ui: 'confirm',
						id:'registerButton',
						name:'registerButton',
					}
			   ]
		   }
		]
	}
});
