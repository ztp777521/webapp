/**
 * 用户控制层
 */
Ext.define('eapp.controller.Login',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			loginView:'loginView',
			registerView:'registerView',
			
			loginButton:{selector: 'loginView formpanel button[name=loginButton]'},
			regButton:{selector: 'loginView formpanel button[name=regButton]'},
			
			registerButton:{selector: 'registerView formpanel button[name=registerButton]'},
			
		},
	
		control:
		{
			loginButton:
			{
				tap:'OnLoginButtonTap',
			},
			regButton:
			{
				tap:'OnRegButtonTap',
			},
			registerButton:
			{
				tap:'OnRegisterButtonTap'
			}
		}
	},
	
	/**
	 * 用户注册
	 */
	OnRegisterButtonTap:function()
	{
		var me = this;
		var registerView = me.getRegisterView();
		if(registerView == null || registerView == 'undefined')
		{
			registerView = Ext.create('eapp.view.Register');
		}
		var loginname = Ext.ComponentQuery.query('#loginnameid', registerView)[0].getValue();
		var passwordname = Ext.ComponentQuery.query('#passwordid', registerView)[0].getValue();
		var username = Ext.ComponentQuery.query('#usernameid', registerView)[0].getValue();
		var telname = Ext.ComponentQuery.query('#telid', registerView)[0].getValue();
		var emailname = Ext.ComponentQuery.query('#emailid', registerView)[0].getValue();
		var numbername = Ext.ComponentQuery.query('#numberid', registerView)[0].getValue();
		if(loginname == null || loginname == 'undefined' || loginname.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','登录名不能为空');
			return;
		}
		if(passwordname == null || passwordname == 'undefined' || passwordname.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','登录密码不能为空');
			return;
		}
		if(username == null || username == 'undefined' || username.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','用户名不能为空');
			return;
		}
		if(telname == null || telname == 'undefined' || telname.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','手机号不能为空');
			return;
		}
		if(emailname == null || emailname == 'undefined' || emailname.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','邮箱不能为空');
			return;
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var managerService = Ext.create('eapp.business.ResidentuserService');
		managerService.register(loginname,passwordname,username,telname,emailname,numbername,
		{
			success:function(jsonData)
			{
				if(jsonData != 'false')
				{
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
					eapp.view.Dialogs.showAlert('智慧潘家园','注册成功!~');
				}
				else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','注册失败!~');
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
	 * 用户登录
	 */
	OnLoginButtonTap:function()
	{
		var me = this;
		var loginView = me.getLoginView();
		if(loginView == null || loginView == 'undefined')
		{
			loginView = Ext.create('eapp.view.Login');
		}
		var username = Ext.ComponentQuery.query('#usernameLogin', loginView)[0].getValue();
		var password = Ext.ComponentQuery.query('#passwordLogin', loginView)[0].getValue();
		if(username == null || username == 'undefined' || username.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','用户名不能为空');
			return;
		}
		
		if(password == null || password == 'undefined' || password.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','密码不能为空');
			return;
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var managerService = Ext.create('eapp.business.ResidentuserService');
		managerService.login(username,password,
		{
			success:function(jsonData)
			{
				console.log(jsonData);
				eapp.util.GlobalData.setCurrentUser(Ext.JSON.encode(jsonData));
				eapp.util.GlobalData.setUserName(username);
				eapp.util.GlobalData.setPassword(password);
				if(jsonData != 'null')
				{
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
					eapp.view.Dialogs.showAlert('智慧潘家园','登录成功!~');
				}
				else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','登录失败!~');
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
	 * 跳转到注册页面
	 */
	OnRegButtonTap:function()
	{
		var me = this;
		var registerView = me.getRegisterView();
		if(registerView == null || registerView == 'undefined')
		{
			registerView = Ext.create('eapp.view.Register');
		}
		me.getMainview().push(registerView);
		eapp.app.pageStack.push('registerview');
	},
});