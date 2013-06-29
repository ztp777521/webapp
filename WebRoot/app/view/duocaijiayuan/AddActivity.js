Ext.define('eapp.view.duocaijiayuan.AddActivity',
{
	extend: 'Ext.Container',
	xtype:'addactivityview',
	
	config:
	{
		title: '发起活动',
		layout: 'fit',
		groupid:0,
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
						title:'发起活动',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'activityid',
								name:'activityname',
								placeHolder: '请输入活动名称',
								lable:'群名称',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
			                    xtype: 'datepickerfield',
			                    label: '开始',
			                    id:'startdayid',
								name: 'startday',
								dateFormat: 'Y-m-d',
			                    value: new Date(),
								picker:
								{
									cancelButton: '取消',
									doneButton: '确定',
									yearFrom: 1950
								}
			                },
			                {
			                    xtype: 'datepickerfield',
			                    label: '结束',
			                    id:'enddayid',
								name: 'endday',
								dateFormat: 'Y-m-d',
			                    value: new Date(),
								picker:
								{
									cancelButton: '取消',
									doneButton: '确定',
									yearFrom: 1950
								}
			                },
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'activitycontentname',
								id: 'activitycontentid',
								placeHolder: '请输入活动内容',
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
						id: 'activitysubmitid',
						name: 'activitysubmitname'
					},
				]
			},
		]
	}
});