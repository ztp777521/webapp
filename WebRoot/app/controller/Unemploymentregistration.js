/**
 * 关于温馨家园的控制层
 */
Ext.define('eapp.controller.Unemploymentregistration',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			unempageview:'unempageview',
			addunemview:'addunemview',
			myunemview:'myunemview',
			unemdetailview:'unemdetailview',
			
			unemsubmitname:{selector: 'unempageview formpanel fieldset labelEx[name=unemsubmitname]'},
			unemmyinfoname:{selector: 'unempageview formpanel fieldset labelEx[name=unemmyinfoname]'},
			tijiaobuttonname:{selector: 'addunemview formpanel button[name=tijiaobuttonname]'},
		},
	
		control:
		{
			unemsubmitname:
			{
				tap:'OnUnemsubmitnameTap',
			},
			unemmyinfoname:
			{
				tap:'OnUnemmyinfonameTap'
			},
			tijiaobuttonname:
			{
				tap:'OnTiajiaonameTap'
			},
			myunemview:
			{
				itemtap:'OnTiemTap',
			}
		}
	},
	
	/**
	 * 点击列表查看详细信息
	 */
	OnTiemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		var unemdetailview = Ext.create('eapp.view.wenxinjiayuan.UnemDetail');
		if(unemdetailview == null || unemdetailview == 'undefined')
		{
			unemdetailview = Ext.create('eapp.view.wenxinjiayuan.UnemDetail');
		}
		unemdetailview.init(record);
		me.getMainview().push(unemdetailview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'unemdetailview')
		{
			eapp.app.pageStack.push('unemdetailview');
		}
	},
	
	/**
	 * 失业提交
	 */
	OnTiajiaonameTap:function()
	{
		var me = this;
		var addunemview = me.getAddunemview();
		
		// 用户姓名
		var username = Ext.ComponentQuery.query('#unemusernameid', addunemview)[0].getValue();
		// 电话
		var unemphone = Ext.ComponentQuery.query('#unemphoneid', addunemview)[0].getValue();
		// email
		var unememail = Ext.ComponentQuery.query('#unememailid', addunemview)[0].getValue();
		// 家庭状况
		var unemhome = Ext.ComponentQuery.query('#unemhomeid', addunemview)[0].getValue();
		// 就业意向
		var unemjiuye = Ext.ComponentQuery.query('#unemjiuyeid', addunemview)[0].getValue();
		// 家庭住址
		var unempaddress = Ext.ComponentQuery.query('#unempaddressid', addunemview)[0].getValue();
		// 个人情况
		//var unempersonal = Ext.ComponentQuery.query('#unempersonalid', addunemview)[0].getValue();
		// 就业意向
		var remarkontent = Ext.ComponentQuery.query('#remarkontentid', addunemview)[0].getValue();
		if(username == null || username == 'undefined' || username.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','用户名不能为空!~');
			return;
		}
		if(unemphone == null || unemphone == 'undefined' || unemphone.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','电话不能为空!~');
			return;
		}
		if(unememail == null || unememail == 'undefined' || unememail.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','email不能为空!~');
			return;
		}
		if(unemhome == null || unemhome == 'undefined' || unemhome.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园',' 家庭状况不能为空!~');
			return;
		}
		if(unemjiuye == null || unemjiuye == 'undefined' || unemjiuye.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','就业意向不能为空!~');
			return;
		}
		if(unempaddress == null || unempaddress == 'undefined' || unempaddress.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','家庭住址不能为空!~');
			return;
		}
		if(unempersonal == null || unempersonal == 'undefined' || unempersonal.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','就业意向不能为空!~');
			return;
		}
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var unemploymentregistrationService = Ext.create('eapp.business.UnemploymentregistrationService');
		unemploymentregistrationService.addunem(userid,username,unemphone,unememail,unemhome,unemjiuye,unempaddress,unempersonal,
		{
			success:function(jsonData)
			{
				if(jsonData == 'OK')
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','提交成功!~');
				}
				else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','提交失败!~');
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
	 * 跳转到失业提交页面
	 */
	OnUnemsubmitnameTap:function()
	{
		var me = this;
		var addunemview = me.getAddunemview();
		if(addunemview == null || addunemview == 'undefined')
		{
			addunemview = Ext.create('eapp.view.wenxinjiayuan.AddUnem');
		}
		me.getMainview().push(addunemview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addunemview')
		{
			eapp.app.pageStack.push('addunemview');
		}
	},
	
	/**
	 * 跳转到我的信息页面
	 */
	OnUnemmyinfonameTap:function()
	{
		var me = this;
		var myunemview = me.getMyunemview();
		if(myunemview == null || myunemview == 'undefined')
		{
			myunemview = Ext.create('eapp.view.wenxinjiayuan.MyUnem');
		}
		myunemview.init();
		me.getMainview().push(myunemview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'myunemview')
		{
			eapp.app.pageStack.push('myunemview');
		}
	}
});