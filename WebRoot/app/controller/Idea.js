/**
 * 意见控制层
 */
Ext.define('eapp.controller.Idea',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview:'mainview',
			ideaView:'ideaView',
			ideapageview:'ideapageview',
			idealistview:'idealistview',
			
			ideasubmitname:{selector: 'ideaView formpanel button[name=ideasubmitname]'},
			suggestionpage:{selector: 'ideapageview formpanel fieldset labelEx[name=suggestionpage]'},
			aboutuspage:{selector: 'ideapageview formpanel fieldset labelEx[name=aboutuspage]'},
		},
	
		control:
		{
			ideasubmitname:
			{
				tap:'OnIdeasubmitnameTap',
			},
			suggestionpage:
			{
				tap:'OnSuggestionpageTap'
			},
			aboutuspage:
			{
				tap:'OnAboutuspageTap',
			}
		}
	},
	
	/**
	 * 跳转到提交意见页面
	 */
	OnAboutuspageTap:function()
	{
		var me = this;
		var ideaView = me.getIdeaView();
		if(ideaView == null || ideaView =='undefined')
		{
			ideaView = Ext.create('eapp.view.zhihuiyanlu.Idea');
		}
		var user = eapp.util.GlobalData.getCurrentUser();
		Ext.ComponentQuery.query('#ideausernameid', ideaView)[0].setValue(user.get('realname'));
		me.getMainview().push(ideaView);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len - 1] != 'ideaview')
		{
			eapp.app.pageStack.push('ideaview');
		}
	},
	
	/**
	 * 意见建议列表
	 */
	OnSuggestionpageTap:function()
	{
		var me = this;
		var idealistview = me.getIdealistview();
		if(idealistview == null || idealistview == 'undefined')
		{
			idealistview = Ext.create('eapp.view.zhihuiyanlu.IdeaList');
		}
		idealistview.init();
		me.getMainview().push(idealistview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len - 1] != 'idealistview')
		{
			eapp.app.pageStack.push('idealistview');
		}
	},
	
	/**
	 * 提交意见
	 */
	OnIdeasubmitnameTap:function()
	{
		var me = this;
		var ideaView = me.getIdeaView();
		if(ideaView == null || ideaView == 'undefined')
		{
			ideaView = Ext.create('eapp.view.zhihuiyanlu.Idea');
		}
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		var userName = user.get('realname');
		//电话
		var telephonenum = Ext.ComponentQuery.query('#ideaphoneid', ideaView)[0].getValue();
		//email
		var email = Ext.ComponentQuery.query('#ideaemailid', ideaView)[0].getValue();
		//意见内容
		var ideaContent = Ext.ComponentQuery.query('#remarkContent', ideaView)[0].getValue();
		
		if(userName == null || userName == 'undefined' || userName.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','用户名称不能为空!~');
			return;
		}
		if(userName == null || userName == 'undefined',userName.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','电话不能为空!~');
			return;
		}
		if(email == null || email == 'undefined' || email.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','email不能为空!~');
			return;
		}
		if(ideaContent == null || ideaContent == 'undefined' || ideaContent.lengthj <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','意见内容不能为空!~');
			return;
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var ideaService = Ext.create('eapp.business.IdeaService');
		/**
		 * userid,用户id
		 * userName,用户名
		 * telephonenum,电话
		 * email,email
		 * ideaContent,意见内容
		 */
		ideaService.addremark(userid,userName,telephonenum,email,ideaContent,
		{
			//jsonData 服务器返回的数据
			success:function(jsonData)
			{
				if(jsonData == 'OK')
				{
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
					eapp.view.Dialogs.showAlert('智慧潘家园','提交意见成功!~');
				}else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','提交意见失败!~');
				}
				Ext.Viewport.setMasked(false);
			},
			// message :请求服务器返回的错误信息
			failure:function(message)
			{
				Ext.Viewport.setMasked(false);
				console.log(message);
			}
		});
		
	},
});