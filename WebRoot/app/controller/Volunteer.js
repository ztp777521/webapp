/**
 * 共建和谐控制层
 */
Ext.define('eapp.controller.Volunteer',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			volunteerpageview:'volunteerpageview',
			addideaView:'addideaView',
			applyvolunteerview:'applyvolunteerview',
			applyvolunteertowview:'applyvolunteertowviewq',
			
			shequwanggename:{selector: 'volunteerpageview formpanel fieldset labelEx[name=shequwanggename]'},
			shenqinggezhangname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=shenqinggezhangname]'},
			wodewanggename:{selector: 'volunteerpageview formpanel fieldset labelEx[name=wodewanggename]'},
			tijiaoyijianname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=tijiaoyijianname]'},
			gezhagnfengcainame:{selector: 'volunteerpageview formpanel fieldset labelEx[name=gezhagnfengcainame]'},
			gezhangtoupiaoname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=gezhangtoupiaoname]'},
			
			nextbuttonname:{selector: 'applyvolunteerview formpanel button[name=nextbuttonname]'},
			
			addsublmitname:{selector: 'applyvolunteertowview formpanel button[name=addsublmitname]'},
		},
	
		control:
		{
			shequwanggename:
			{
				tap:'OnShequwanggenameTap',
			},
			shenqinggezhangname:
			{
				tap:'OnShenqinggezhangnameTap',
			},
			wodewanggename:
			{
				tap:'OnWodewanggenameTap',
			},
			tijiaoyijianname:
			{
				tap:'OnTijiaoyijiannameTap',
			},
			gezhagnfengcainame:
			{
				tap:'OnGezhagnfengcainameTap',
			},
			gezhangtoupiaoname:
			{
				tap:'OnGezhangtoupiaonameTap',
			},
			nextbuttonname:
			{
				tap:'OnNextbuttonnameTap'
			},
			addsublmitname:
			{
				tap:'OnAddsublmitnameTap',
			}
		}
	},
	
	/**
	 * 提交格长申请信息
	 */
	OnAddsublmitnameTap:function()
	{
		var me = this;
		var applyvolunteertowview = me.getApplyvolunteertowview();
		// 网格编号
		var number = Ext.ComponentQuery.query('#nonumberid',applyvolunteertowview)[0].getValue();
		// 意见内容
		var context = Ext.ComponentQuery.query('#remarkContentid',applyvolunteertowview)[0].getValue();
		
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var volunteerServiece = Ext.create('eapp.business.VolunteerService');
		volunteerServiece.addVolunteer(userid,number,context,
		{
			success:function(jsonData)
			{
				if(jsonData == 'OK')
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请成功!~');
				}else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请失败!~');
				}
				Ext.Viewport.setMasked(false);
			},
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	},
	
	/**
	 * 下一步
	 */
	OnNextbuttonnameTap:function()
	{
		var me = this;
		var applyvolunteerview = me.getApplyvolunteerview();
		if(applyvolunteerview == null || applyvolunteerview == 'undefined')
		{
			applyvolunteerview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteer');
		}
		var checkboxs = Ext.ComponentQuery.query('#checkboxs',applyvolunteerview)[0];
		var labels = '';
		for(var i = 0;i<checkboxs.getItems().length-1;i++)
		{
			if(checkboxs.getItems().items[i+1].getChecked())
			{
				 labels += checkboxs.getItems().items[i+1].getLabel()+',';
			}
		}
		if(labels == "" || labels.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','请选择网格编号!~');
			return;
		}
		
		var  applyvolunteertowview = me.getApplyvolunteertowview();
		if(applyvolunteertowview == null || applyvolunteertowview == '')
		{
			applyvolunteertowview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteerTow');
		}
		Ext.ComponentQuery.query('#nonumberid', applyvolunteertowview)[0].setValue(labels);
		me.getMainview().push(applyvolunteertowview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'applyvolunteertowview')
		{
			eapp.app.pageStack.push('applyvolunteertowview');
		}
	},
	
	/**
	 *  社区网格
	 */
	OnShequwanggenameTap:function()
	{
		alert(0);
	},
	
	/**
	 * 申请格长
	 */
	OnShenqinggezhangnameTap:function()
	{
		var me = this;
		var applyvolunteerview = me.getApplyvolunteerview();
		if(applyvolunteerview == null || applyvolunteerview == 'undefined')
		{
			applyvolunteerview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteer');
		}
		applyvolunteerview.init();
		me.getMainview().push(applyvolunteerview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'applyvolunteerview')
		{
			eapp.app.pageStack.push('applyvolunteerview');
		}
	},
	
	/**
	 * 我的网格
	 */
	OnWodewanggenameTap:function()
	{
		alert('我的网格');
	},
	
	/**
	 * 提交建议
	 */
	OnTijiaoyijiannameTap:function()
	{
		var me = this;
		var addideaView = me.getAddideaView();
		if(addideaView == null || addideaView == 'undefined')
		{
			addideaView = Ext.create('eapp.view.gongjianhexie.AddIdea');
		}
		me.getMainview().push(addideaView);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addideaview')
		{
			eapp.app.pageStack.push('addideaview');
		}
	},
	
	/**
	 * 格长风采
	 */
	OnGezhagnfengcainameTap:function()
	{
		alert('格长风采');
	},
	
	/**
	 * 显示所有格长列表
	 */
	OnGezhangtoupiaonameTap:function()
	{
		alert('格长投票');
	}
});