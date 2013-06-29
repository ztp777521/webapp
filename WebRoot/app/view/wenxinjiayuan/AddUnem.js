Ext.define('eapp.view.wenxinjiayuan.AddUnem',
{
	extend: 'Ext.Container',
	xtype:'addunemview',
	
	config:
	{
		title: '失业提交',
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
						title:'失业信息提交',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'unemusernameid',
								name:'unemusername',
								placeHolder: '请输入用户姓名',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								// disabled: true
							},
							{
								xtype: 'textfield',
								id: 'unemphoneid',
								name:'unemphonename',
								placeHolder: '请输入电话',
								lable:'电话',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'unememailid',
								name:'unememailname',
								placeHolder: '请输入email',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							
							{
								xtype: 'textfield',
								id: 'unemhomeid',
								name:'unemhomename',
								placeHolder: '家庭状况',
								lable:'家庭状况',
								autoCapitalize: true,
								clearIcon: true
							},

							{
								xtype: 'textfield',
								id: 'unemjiuyeid',
								name:'unemjiuyename',
								placeHolder: '就业意向',
								lable:'就业意向',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'unempaddressid',
								name:'unemaddressname',
								placeHolder: '家庭住址',
								lable:'家庭住址',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 2,
								name: 'content',
								id: 'remarkontentid',
								placeHolder: '请输入就业意向',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype:'button',
						text:'提交',
						ui: 'confirm',
						id:'tijiaobuttonid',
						name:'tijiaobuttonname',
					}
				]
			},
		]
	}
});