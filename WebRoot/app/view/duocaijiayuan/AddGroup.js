Ext.define('eapp.view.duocaijiayuan.AddGroup',
{
	extend: 'Ext.Container',
	xtype:'addgroupview',
	
	config:
	{
		title: '申请创建活动群',
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
						title:'申请创建活动群',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'groupid',
								name:'groupname',
								placeHolder: '请输入群名称',
								lable:'群名称',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'groupcontentname',
								id: 'groupcontentid',
								placeHolder: '请输入群说明',
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
						id: 'groupsubmitid',
						name: 'groupsubmitname'
					},
				]
			},
		]
	}
});