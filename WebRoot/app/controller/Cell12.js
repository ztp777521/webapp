Ext.define('eapp.controller.Cell12',
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview:'mainview',
			cell12view: 'cell12view',
			myView:'myView',
			loginView:'loginView',
			integratemateriallist:'integratemateriallist',
			integratemateriallisttow:'integratemateriallisttow',
			integratemateriallistshree:'integratemateriallistshree',
			integratemateriallistfour:'integratemateriallistfour',
			ideaView:'ideaView',
			idealistview:'idealistview',
			indexpage:'indexpage',
			ideapageview:'ideapageview',
			volunteerpageview:'volunteerpageview',
			unempageview:'unempageview',
			grouppageview:'grouppageview',
			shoppageview:'shoppageview',
			mapview:'#mapview',
			
			testview:'testview',
			
			actionButton:'#actionButton',
			m1: {selector: 'img[name=m1]'},
			m2: {selector: 'img[name=m2]'},
			m3: {selector: 'img[name=m3]'},
			m4: {selector: 'img[name=m4]'},
			m5: {selector: 'img[name=m5]'},
			m6: {selector: 'img[name=m6]'},
			m7: {selector: 'img[name=m7]'},
			m8: {selector: 'img[name=m8]'},
			m9: {selector: 'img[name=m9]'},
			m10: {selector: 'img[name=m10]'},
			m11: {selector: 'img[name=m11]'},
			m12: {selector: 'img[name=m12]'},
			login: {selector: 'spacer[name=login]'},
		},

		control:
		{
			m1:
			{
				tap: 'onMainMenuTaped1',
			},
			m2:
			{
				tap: 'onMainMenuTaped2',
			},
			m3:
			{
				tap: 'onMainMenuTaped3',
			},
			m4:
			{
				tap: 'onMainMenuTaped4',
			},
			m5:
			{
				tap: 'onMainMenuTaped5',
			},
			m6:
			{
				tap: 'onMainMenuTaped6',
			},
			m7:
			{
				tap: 'onMainMenuTaped7',
			},
			m8:
			{
				tap: 'onMainMenuTaped8',
			},
			m9:
			{
				tap: 'onMainMenuTaped9',
			},
			m10:
			{
				tap: 'onMainMenuTaped10',
			},
			m11:
			{
				tap: 'onMainMenuTaped11',
			},
			m12:
			{
				tap: 'onMainMenuTaped12',
			},
			login:
			{
				login:'OnLogin',
			}
		}
	},
	
	/**
	 * 跳转到登录页面
	 */
	OnLogin:function()
	{
		var me = this;
		if(eapp.util.GlobalData.isLoged())
		{
			var myView = me.getMyView();
			if(myView == null || myView == 'undefined')
			{
				myView = Ext.create('eapp.view.My');
			}
			myView.init();
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(myView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'myview')
			{
				eapp.app.pageStack.push('myview');
			}
		}
		else
		{
			var loginView = me.getLoginView();
			if(loginView == null || loginView == 'undefined')
			{
				loginView = Ext.create('eapp.view.Login');
			}
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(loginView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'loginview')
			{
				eapp.app.pageStack.push('loginview');
			}
		}
		
	},
	
	/**
	 * 智慧之窗
	 */
	onMainMenuTaped1:function()
	{
		var me = this;
		var integratematerialList = me.getIntegratemateriallist();
		if(integratematerialList == null || integratematerialList == 'undefined')
		{
			integratematerialList = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialList');
		}
		
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     */
		integratematerialList.init(1,2,1);
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(integratematerialList);
		Ext.Viewport.setMasked(false);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratemateriallist')
		{
			eapp.app.pageStack.push('integratemateriallist');
		}
	},
	
	/**
	 * 幸福家园
	 */
	onMainMenuTaped2:function()
	{
		var me = this;
		var integratemateriallisttow = me.getIntegratemateriallisttow();
		if(integratemateriallisttow == null || integratemateriallisttow == 'undefined')
		{
			integratemateriallisttow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialListTow');
		}
		
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     */
		integratemateriallisttow.init(2,2,4);
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(integratemateriallisttow);
		Ext.Viewport.setMasked(false);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratemateriallisttow')
		{
			eapp.app.pageStack.push('integratemateriallisttow');
		}
	},
	
	
	/**
	 * 社工加油站
	 */
	onMainMenuTaped3:function()
	{
		var me = this;
		// eapp.view.Dialogs.showAlert('智慧潘家园','社工加油站');
		
		var me = this;
		var integratemateriallistshree = me.getIntegratemateriallistshree();
		if(integratemateriallistshree == null || integratemateriallistshree == 'undefined')
		{
			integratemateriallistshree = Ext.create('eapp.view.shegongjiayouzhan.IntegratematerialListShree');
		}
		
		/**
		 * 查询五分钟学习课程
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     */
		integratemateriallistshree.init(4,2,6);
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(integratemateriallistshree);
		Ext.Viewport.setMasked(false);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratemateriallistshree')
		{
			eapp.app.pageStack.push('integratemateriallistshree');
		}
		
		
		/**
		 * 进度条
		 */
//		var testview = me.getTestview();
//		if(testview == null || testview == 'undefined')
//		{
//			testview = Ext.create('eapp.view.about.Test001');
//		}
//		testview.init();
//		me.getMainview().getNavigationBar().show();
//		me.getMainview().push(testview);
//		var len = eapp.app.pageStack.length;
//		if(eapp.app.pageStack[len-1] != 'testview')
//		{
//			eapp.app.pageStack.push('testview');
//		}
		
		/**
		 * 调用地图
		 */
//		var mapview = me.getMapview();
//		console.log(mapview);
//		
//		if(mapview == null || mapview == "undefined")
//		{
//			mapview = Ext.create('eapp.view.MapView', 
//			{
//				id: 'mapview',
//				mapId:'mapId',
//				flag: 0
//			});
//			mapview.init(
//			{
//				longitude:121.491,
//				latitude: 31.233
//			},'智慧潘家园','北京市朝阳区');
//		}
//		me.getMainview().getNavigationBar().show();
//		me.getMainview().push(mapview);
//		Ext.Viewport.setMasked(false);
//		var len = eapp.app.pageStack.length;
//		if(eapp.app.pageStack[len-1] != 'mapview')
//		{
//			eapp.app.pageStack.push('mapview');
//		}
	},
	
	/**
	 * 智慧言路
	 */
	onMainMenuTaped4:function()
	{
		//eapp.view.Dialogs.showAlert('智慧潘家园','智慧言路');
		var me = this;
		var isloged = eapp.util.GlobalData.isLoged();
		if(isloged)
		{
			var ideapageview = me.getIdeapageview();
			if(ideapageview == null || ideapageview == 'undefined')
			{
				ideapageview = Ext.create('eapp.view.zhihuiyanlu.IdeaPage');
			}
			ideapageview.init();
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(ideapageview);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len - 1] != 'ideapageview')
			{
				eapp.app.pageStack.push('ideapageview');
			}
		}
		else
		{
			var loginView = me.getLoginView();
			if(loginView == null || loginView == 'undefined')
			{
				loginView = Ext.create('eapp.view.Login');
			}
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(loginView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'loginview')
			{
				eapp.app.pageStack.push('loginview');
			}
		}
		
	},
	
	/**
	 * 显示智慧试听列表
	 */
	onMainMenuTaped5:function()
	{
		var me = this;
		// eapp.view.Dialogs.showAlert('智慧潘家园','智慧试听');
		var integratemateriallistfour = me.getIntegratemateriallistfour();
		if(integratemateriallistfour == null || integratemateriallistfour == 'undefined')
		{
			integratemateriallistfour = Ext.create('eapp.view.zhihuishiting.IntegratematerialListFour');
		}
		
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     */
		integratemateriallistfour.init(5,2,17);
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(integratemateriallistfour);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratemateriallistfour')
		{
			eapp.app.pageStack.push('integratemateriallistfour');
		}
	},
	
	/**
	 * 共建和谐
	 */
	onMainMenuTaped6:function()
	{
		// eapp.view.Dialogs.showAlert('智慧潘家园','共建和谐');
		var me = this;
		var isloged = eapp.util.GlobalData.isLoged();
		if(isloged)
		{
			var volunteerpageview = me.getVolunteerpageview();
			if(volunteerpageview == null || volunteerpageview == 'undefined')
			{
				volunteerpageview = Ext.create('eapp.view.gongjianhexie.VolunteerPage');
			}
			volunteerpageview.init();
			
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(volunteerpageview);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'volunteerpageview')
			{
				eapp.app.pageStack.push('volunteerpageview');
			}
		}
		else
		{
			var loginView = me.getLoginView();
			if(loginView == null || loginView == 'undefined')
			{
				loginView = Ext.create('eapp.view.Login');
			}
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(loginView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'loginview')
			{
				eapp.app.pageStack.push('loginview');
			}
		}
	},
	
	/**
	 * 温情家园
	 */
	onMainMenuTaped7:function()
	{
		//eapp.view.Dialogs.showAlert('智慧潘家园','温情家园');
		
		var me = this;
		var isloged = eapp.util.GlobalData.isLoged();
		if(isloged)
		{
			var me = this;
			var unempageview = me.getUnempageview();
			if(unempageview == null || unempageview == 'undefined')
			{
				unempageview = Ext.create('eapp.view.wenxinjiayuan.UnemPage');
			}
			unempageview.init();
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(unempageview);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'unempageview')
			{
				eapp.app.pageStack.push('unempageview');
			}
		}
		else
		{
			var loginView = me.getLoginView();
			if(loginView == null || loginView == 'undefined')
			{
				loginView = Ext.create('eapp.view.Login');
			}
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(loginView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'loginview')
			{
				eapp.app.pageStack.push('loginview');
			}
		}
	},
	
	/**
	 * 多彩家园
	 */
	onMainMenuTaped8:function()
	{
		//eapp.view.Dialogs.showAlert('智慧潘家园','多彩家园');
		
		var me = this;
		var isloged = eapp.util.GlobalData.isLoged();
		if(isloged)
		{
			var grouppageview = me.getGrouppageview();
			if(grouppageview == null || grouppageview == 'undefined')
			{
				grouppageview = Ext.create('eapp.view.duocaijiayuan.GroupPage');
			}
			grouppageview.init();
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(grouppageview);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'grouppageview')
			{
				eapp.app.pageStack.push('grouppageview');
			}
		}
		else
		{
			var loginView = me.getLoginView();
			if(loginView == null || loginView == 'undefined')
			{
				loginView = Ext.create('eapp.view.Login');
			}
			me.getMainview().getNavigationBar().show();
			me.getMainview().push(loginView);
			var len = eapp.app.pageStack.length;
			if(eapp.app.pageStack[len-1] != 'loginview')
			{
				eapp.app.pageStack.push('loginview');
			}
		}
	},
	
	/**
	 * 和谐家园
	 */
	onMainMenuTaped9:function()
	{
		 // eapp.view.Dialogs.showAlert('智慧潘家园','和谐家园');
		 
		var me = this;
		var shoppageview = me.getShoppageview();
		if(shoppageview == null || shoppageview == 'undefined')
		{
			shoppageview = Ext.create('eapp.view.hexiejiayuan.ShopPage');
		}
		shoppageview.init();
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(shoppageview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'shoppageview')
		{
			eapp.app.pageStack.push('shoppageview');
		}
	},
	
	/**
	 * 智慧服务
	 */
	onMainMenuTaped10:function()
	{
		var url = 'http://map.baidu.com/mobile/?ssid=0&from=844b&bd_page_type=1&uid=293EDADD92628FBA06A47B7001A4A981&pu=sz%401320_2001&itj=45#index/index'
		try
		{
			window.openBrowser(url);
		}
		catch(e)
		{
			window.open(url);
		}
	},
	
	/**
	 * 智慧DIY
	 */
	onMainMenuTaped11:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','智慧DIY');
	},
	
	/**
	 * 红色堡垒
	 */
	onMainMenuTaped12:function()
	{
		var me = this;
		var indexpage = me.getIndexpage();
		if(indexpage == null || indexpage == 'undefined')
		{
			indexpage = Ext.create('eapp.view.about.IndexPage');
		}
		indexpage.init();
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(indexpage);
		var len = eapp.app.pageStack.length;7
		if(eapp.app.pageStack[len-1] != 'indexpage')
		{
			eapp.app.pageStack.push('indexpage');
		}
//		eapp.view.Dialogs.showAlert('智慧潘家园','红色堡垒');
	},
});