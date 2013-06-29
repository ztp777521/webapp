Ext.define('eapp.view.hexiejiayuan.AddShop',
{
	extend: 'Ext.Container',
	xtype:'addshopview',
	
	config:
	{
		title: '申请商户',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
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
						title:'申请商户',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'shopnameid',
								name:'sshopname',
								placeHolder: '请输入商户名称',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
								xtype: 'textfield',
								id: 'shoptelid',
								name:'shoptelname',
								placeHolder: '请输入电话',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'shopfwdzid',
								name:'shopfwdzname',
								placeHolder: '请输入地址',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'shopfwid',
								name:'shopfwname',
								placeHolder: '请输入服务类别',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'shopfwcontentid',
								name:'shopfwcontentname',
								placeHolder: '请输入服务内容',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text: '提交',
						ui: 'confirm',
						id: 'shopsubmitid',
						name: 'shopsubmitname'
					},
				]
			},
		]
	}
});