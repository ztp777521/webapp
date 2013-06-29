/**
 * 主容器控制层
 */
Ext.define('eapp.controller.Main', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			actionButton: '#actionButton'
		},

		control:
		{
			mainview:
			{
				
				back: 'onBackButtonTap',
				initcomplete: 'onInitComplete'
			}
		}
	},
	
	onBackButtonTap: function(view,eOpts )
	{
		var stack =eapp.app.pageStack;
		var len = stack.length;
		if(len > 1)
		{
			stack.pop();
		}	
		
		this.doBackChanges();
	},
	
	doBackChanges: function()
	{
		var me = this;
		var stack =eapp.app.pageStack;
		console.log(stack);
		var len = stack.length;
		switch(stack[len - 1])
		{
			case 'main':
			{
				me.getMainview().getNavigationBar().hide();
				me.getActionButton().hide();
				
				break;
			}
			case 'communicationview':
			{
				this.getActionButton().show();
				this.getActionButton().setText('删除');
				break;
			}
			default: 
			{
				this.getActionButton().hide();
				break;
			}
		}
		console.log(eapp.app.pageStack);
	},
	onInitComplete: function()
	{
		var id = this.getParam('communicationid');
		if(id == null)
		{
			return;
		}
		
		var mainview = this.getMainview();
		var actionButton = this.getActionButton();
		if(id == 0)
		{
			var communication = Ext.create('eapp.view.Communication');
			communication.init();
			
			mainview.getNavigationBar().show();
			mainview.push(communication);
			eapp.app.pageStack.push('communication');
		}
		else
		{
			try
			{
				window.SQLite_query 
				( 
					function succss(data)
					{
						var store = Ext.create('eapp.store.Communication', {data: Ext.JSON.decode(data).data});
						for(var i = 0; i < store.getCount(); i++)
						{
							var model = store.getAt(i);
							var message = model.get('message');
							message = decodeURIComponent(message);
							
							model.set('message', message);
						
							if(model.get('id') == id)
							{
								var communicationview = Ext.create('eapp.view.CommunicationView');
								communicationview.setData(model);
								communicationview.init();
								
								actionButton.setText('删除');
								actionButton.show();
								mainview.getNavigationBar().show();
								mainview.push(communicationview);
								eapp.app.pageStack.push('communicationview');
							}
						}
					},
					function error(message)
					{
						eapp.view.Dialogs.showAlert('错误', '无法从数据库读取消息！');
					},
					'select * from tbcommunication where isdeleted = 0 order by id desc limit 20'
				); 
			}
			catch(e)
			{
				eapp.view.Dialogs.showAlert('错误', '从数据库读取消息失败！');
			}
		}
	},
	
	getParam: function(name)
	{
		var url = window.location + '';
		if(url.indexOf('?') > -1)
		{
			var paramPart = url.split('?')[1];
			var params = paramPart.split('&');
			for(var i = 0; i < params.length; i++)
			{
				var param = params[i];
				var temps = param.split('=');
				if(temps[0] == name)
				{
					return temps[1];
				}
			}
		}
		
		return null;
	}
});