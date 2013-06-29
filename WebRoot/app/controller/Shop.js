/**
 * 意见控制层
 */
Ext.define('eapp.controller.Shop',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview:'mainview',
			shoppageview:'shoppageview',
			addshopview:'addshopview',
			shoplistview:'shoplistview',
			
			sqshopname:{selector: 'shoppageview formpanel fieldset labelEx[name=sqshopname]'},
			fbfwshopname:{selector: 'shoppageview formpanel fieldset labelEx[name=fbfwshopname]'},
			ckfwshopname:{selector: 'shoppageview formpanel fieldset labelEx[name=ckfwshopname]'},
			
			shopsubmitname:{selector: 'addshopview formpanel button[name=shopsubmitname]'},
		},
	
		control:
		{
			sqshopname:
			{
				tap:'OnSqshopnameTap',
			},
			fbfwshopname:
			{
				tap:'OnFbfwshopnameTap'
			},
			ckfwshopname:
			{
				tap:'OnCkfwshopnameTap',
			},
			shopsubmitname:
			{
				tap:'OnShopsubmitnameTap'
			}
		}
	},
	
	/**
	 * 申请商户
	 */
	OnShopsubmitnameTap:function()
	{
		var me = this;
		var addshopview = me.getAddshopview();
		if(addshopview == null || addshopview == 'undefined')
		{
			addshopview = Ext.create('eapp.view.hexiejiayuan.AddShop');
		} 
		//商户名称
		var shopname = Ext.ComponentQuery.query('#shopnameid', addshopview)[0].getValue();
		// 服务类别
		var shopfw = Ext.ComponentQuery.query('#shopfwid', addshopview)[0].getValue();
		// 电话
		var tel = Ext.ComponentQuery.query('#shoptelid', addshopview)[0].getValue();
		// 地址
		var shopfwdz = Ext.ComponentQuery.query('#shopfwdzid', addshopview)[0].getValue();
		// 服务内容
		var shopfwcontent = Ext.ComponentQuery.query('#shopfwcontentid', addshopview)[0].getValue();
		
		if(shopname == null || shopname == 'undefined' || shopname.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','商户名称不能为空!~');
			return;
		}
		if(shopfw == null || shopfw == 'undefined' || shopfw.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','服务类别不能为空!~');
			return;
		}
		if(tel == null || tel == 'undefined' || tel.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','电话不能为空!~');
			return;
		}
		if(shopfwdz == null || shopfwdz == 'undefined' || shopfwdz.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','商户地址不能为空!~');
			return;
		}
		if(shopfwcontent == null || shopfwcontent == 'undefined' || shopfwcontent.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','服务内容不能为空!~');
			return;
		}
		
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var shopService = Ext.create('eapp.business.ShopService');
		shopService.addshop(userid,shopname,tel,shopfw,shopfwdz,shopfwcontent,
		{
			success:function(josnData)
			{
				if(jsonData == "OK")
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请提交成功!~');
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
				}else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请提交失败!~');
				}
				console.log(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure: function(message) 
		    {
		    	console.log(message);
				Ext.Viewport.setMasked(false);
		    }
		});
	},
	
	/**
	 * 跳转到申请商户页面
	 */
	OnSqshopnameTap:function()
	{
		var me = this;
		var addshopview = me.getAddshopview();
		if(addshopview == null || addshopview == 'undefined')
		{
			addshopview = Ext.create('eapp.view.hexiejiayuan.AddShop');
		} 
		me.getMainview().push(addshopview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addshopview')
		{
			eapp.app.pageStack.push('addshopview');
		}
	},
	
	/**
	 * 显示服务列表
	 */
	OnFbfwshopnameTap:function()
	{
		var me = this;
		var shoplistview = me.getShoplistview();
		if(shoplistview == null || shoplistview == 'undefined')
		{
			shoplistview = Ext.create('eapp.view.hexiejiayuan.ShopList');
		}
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		var shopService = Ext.create('eapp.business.ShopService');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		shopService.findshoplist(userid,
		{
			success:function(jsonData)
			{
				shoplistview.init(jsonData);
				console.log(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure: function(message) 
		    {
		    	console.log(message);
				Ext.Viewport.setMasked(false);
		    }
		});
		
		me.getMainview().push(shoplistview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'shoplistview')
		{
			eapp.app.pageStack.push('shoplistview');
		}
	},
	
	/**
	 * 查看服务
	 */
	OnCkfwshopnameTap:function()
	{
		alert('查看服务');
	}
	
});