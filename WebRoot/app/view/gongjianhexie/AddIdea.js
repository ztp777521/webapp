Ext.define('eapp.view.gongjianhexie.AddIdea',
{
	extend: 'Ext.Container',
	xtype:'addideaView',
	
	config:
	{
		title: '提交意见',
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
						title:'提交意见',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'ideausernameid',
								name:'ideausername',
								placeHolder: '请输入用户姓名',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textfield',
								id: 'ideaphoneid',
								name:'ideaphonename',
								placeHolder: '请输入电话',
								lable:'电话',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'ideaemailid',
								name:'ideamailname',
								placeHolder: '请输入email',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'remarkContent',
								placeHolder: '请输入意见内容',
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
						id: 'ideasubmitid',
						name: 'ideasubmitname'
					},
				]
			},
		]
	}
});