/**
 * 个人信息控层
 */
Ext.define('eapp.controller.My',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			myView:'myView',
			loginView:'loginView',
			setPersonalView:'setPersonalView',
			
			wanshanziliaoid:{selector: 'myView formpanel fieldset labelEx[name=wanshanziliaoid]'},
			uppasswordid:{selector: 'myView formpanel fieldset labelEx[name=uppasswordid]'},
			cllloginid:{selector: 'myView formpanel fieldset labelEx[name=cllloginid]'},
			updateButton:{selector: 'setPersonalView formpanel button[name=updateButton]'},
		},
	
		control:
		{
			wanshanziliaoid:
			{
				tap:'OnWanshanziliaoTap',
			},
			uppasswordid:
			{
				tap:'OnuppasswordTap',
			},
			cllloginid:
			{
				tap:'OnCllloginTap',
			},
			updateButton:
			{
				tap:'OnUpdateButtonTap',
			}
		}
	},
	
	/**
	 * 修改个人信息
	 */
	OnUpdateButtonTap:function()
	{
		var me = this;
		var user = eapp.util.GlobalData.getCurrentUser();
		var setPersonalView = me.getSetPersonalView();
		if(setPersonalView == null || setPersonalView == 'undefined')
		{
			setPersonalView = Ext.create('eapp.view.SetPersonal');
		}
		var userid = user.get('userid');
		var loginname = Ext.ComponentQuery.query('#loginnameid', setPersonalView)[0].getValue();
		//真实姓名
		var username = Ext.ComponentQuery.query('#usernameid', setPersonalView)[0].getValue();

		//手机号
		var telname = Ext.ComponentQuery.query('#telephonenumid', setPersonalView)[0].getValue();
		
		//EMAIL
		var emailname = Ext.ComponentQuery.query('#emailid', setPersonalView)[0].getValue();
		
		//亲情号
		var numbername = Ext.ComponentQuery.query('#interestid', setPersonalView)[0].getValue();
		
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var residentuserService = Ext.create('eapp.business.ResidentuserService');
		residentuserService.upuser(userid,loginname,username,telname,emailname,numbername,
		{
			success:function(jsonData)
			{
				if(jsonData != "null")
				{
					eapp.util.GlobalData.setCurrentUser(Ext.JSON.encode(jsonData));
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
					eapp.view.Dialogs.showAlert('智慧潘家园','修改成功!~');
				}else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','修改失败!~');
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
	 * 完善个人信息
	 */
	OnWanshanziliaoTap:function()
	{
		var me = this;
		var user = eapp.util.GlobalData.getCurrentUser();
		var setPersonalView = me.getSetPersonalView();
		if(setPersonalView == null || setPersonalView == 'undefined')
		{
			setPersonalView = Ext.create('eapp.view.SetPersonal');
		}
		var user = eapp.util.GlobalData.getCurrentUser();
		//登录名
		Ext.ComponentQuery.query('#loginnameid', setPersonalView)[0].setValue(user.get('loginname'));
		//真实姓名
		Ext.ComponentQuery.query('#usernameid', setPersonalView)[0].setValue(user.get('realname'));

		//手机号
		Ext.ComponentQuery.query('#telephonenumid', setPersonalView)[0].setValue(user.get('familyTelephonenum'));
		
		//EMAIL
		Ext.ComponentQuery.query('#emailid', setPersonalView)[0].setValue(user.get('email'));
		
		//亲情号
		Ext.ComponentQuery.query('#interestid', setPersonalView)[0].setValue(user.get('telephonenum'));
		
		me.getMainview().push(setPersonalView);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'setpersonalview')
		{
			eapp.app.pageStack.push('setpersonalview');
		}
		
	},
	
	/**
	 * 修改密码
	 */
	OnuppasswordTap:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','修改密码!~');
	},
	
	/**
	 * 注销登陆
	 */
	OnCllloginTap:function()
	{
		var me = this;
		eapp.view.Dialogs.showSearchComfirm('智慧潘家园','确认要注销么？',
		{
			yes:function()
			{
				eapp.util.GlobalData.setCurrentUser('');
				//注销了就不能使用自动登录功能  清空自动登录里面的值
				var loginView = me.getLoginView();
				if(loginView == null || loginView == 'undefined')
				{
					loginView = Ext.create('eapp.view.Login');
				}
				loginView.setIsautoFlag(false);
				//清空login页面的值
				Ext.ComponentQuery.query('#usernameLogin', loginView)[0].setValue('');
				Ext.ComponentQuery.query('#passwordLogin', loginView)[0].setValue('');
				//将用户名和密码从GlobalData里清空
				eapp.util.GlobalData.setUserName('');
				eapp.util.GlobalData.setPassword('');
				
				var backButton = me.getMainview().getNavigationBar().getBackButton();
				backButton.fireEvent('tap',backButton,null,null);
				//eapp.app.pageStack = ['main'];
			},
			on:function()
			{
				return;
			}
		});
	}
});