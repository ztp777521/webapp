Ext.define('eapp.view.gongjianhexie.ApplyVolunteerTow',
{
	extend: 'Ext.Container',
	xtype:'applyvolunteertowview',
	
	config:
	{
		title: '申请格长',
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
						id:'checkboxs',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'nonumberid',
								name:'nonumbername',
								placeHolder: '网格编号',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'remarkContentid',
								placeHolder: '请输入申请格长内容',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text:'提交',
						ui: 'confirm',
						id: 'addsubmitid',
						name: 'addsublmitname',
					},
				]
			},
		]
	},
	
	/**
	 * 查询所有编号列表
	 */
	init:function()
	{
		
		var me = this;
		var checkitems = Ext.ComponentQuery.query('#checkboxs',me)[0];
		
		
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var volunteerService = Ext.create('eapp.business.VolunteerService');
		volunteerService.findAll(
		{
			success:function(jsonData)
			{
				console.log(jsonData);
				var checkboxlist = jsonData.result;
				var checkboxs = [];
				for(var i = 0; i < checkboxlist.length;i++)
				{
					var checkbox = Ext.create('Ext.field.Checkbox',
					{
						xtype:'checkboxfield',
						name : 'checkbox'+i,
						label: checkboxlist[i].gridnum,
						value: 'tomato',
						//checked: false
					});
					checkboxs.push(checkbox);
				}
				
				checkitems.setItems(checkboxs);
				Ext.Viewport.setMasked(false);
			},
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});