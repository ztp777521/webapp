/**
 * 个人设置
 */
Ext.define('eapp.view.SetPersonal', 
{
	extend: 'Ext.Container',
	xtype: 'setPersonalView',
	
	config:
	{
		title:'个人设置',
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
							labelWidth: '35%'
						},
						title: '用户设置',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'loginnameid',
								label: '登录名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textfield',
								id: 'usernameid',
								label: '用户名',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'telephonenumid',
								label: '手机号',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
								xtype: 'textfield',
								id: 'emailid',
								label: '电子邮件',
								autoCapitalize: true,
								clearIcon: true,
								
							},
							{
								xtype: 'textfield',
								id: 'interestid',
								label: '亲情号',
								autoCapitalize: true,
								clearIcon: true,
							}
						]
					},
					{
						xtype: 'button',
						text: '修改',
						ui: 'confirm',
						id: 'updateButtonid',
						name: 'updateButton'
					},
			   ]
		   }
		]
	},
	
});
