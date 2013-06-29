Ext.define('eapp.view.gongjianhexie.ApplyVolunteer',
{
	extend: 'Ext.Container',
	xtype:'applyvolunteerview',
	
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
						title:'选择格长申请网格的编号',
						id:'checkboxs',
						items: []
					},
					{
						xtype: 'button',
						text:'下一步',
						ui: 'confirm',
						id: 'nextbuttonid',
						name: 'nextbuttonname',
					},
//					{
//						xtype: 'toolbar',
//				        docked: 'bottom',
//						//xtype: 'button',
//						//ui: 'confirm',
//						//id: 'nextbuttonid',
//						//name: 'nextbuttonname',
//						items: 
//						[
//			                { xtype: 'spacer' },
//			                {
//			                    text: '下一步',
//			                    handler: function() 
//			                    {
//			                        var form = Ext.ComponentQuery.query('#checkboxs',this)[0];
//			                        console.log(form);
//			                            values = form.getValues();
//
//			                        Ext.Msg.alert(null,
//			                            "Tomato: " + ((values.tomato) ? "yes" : "no") +
//			                            "<br />Salami: " + ((values.salami) ? "yes" : "no")
//			                        );
//			                    }
//			                },
//			                { xtype: 'spacer' }
//				        ]
//					},
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