Ext.define('eapp.view.about.IndexPage',
{
	extend:'Ext.TabPanel',
	xtype:'indexpage',
	config:
	{
	 	fullscreen: true,
	    //选项卡（导航栏在下方）
	    tabBarPosition: 'bottom',
	    //各项内容的显示控制
//	    defaults: 
//	    {
//	        styleHtmlContent: true
//	    },
//	    layout: 
//	    {
//	        type: 'card',
//	        //显示动画
//	        animation: {
//	            type: 'fade'
//	        }
//	    },
//	    layout:
//	    {
//            pack:'center'
//      },
 		xtype: 'formpanel',
 		//layout:'fit',
 		items:
 		[
 		 	{
				xtype:'newsList',
				cls:'textcolor7',
			},
			{
				xtype:'tongzhigonggaolist',
				cls:'textcolor7',
			},
			{
				xtype:'bianminxinxilist',
				cls:'textcolor7',
			}
 		]
	},
	
	/**
	 * 查询资料信息
	 */
	init:function()
	{
		/**
		 * 查询新闻动态
		 */
		setTimeout(function()
		{
			var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
			integratematerialService.findlist(1,2,1,
			{
				success: function(jsonData)
				{
					var newslistview = Ext.create('eapp.view.about.NewsList');
					newslistview.init(jsonData);
					console.log(jsonData);
				},
				failure: function(message)
				{
					console.log(message);
				}
			});
		}, 1);
		
		/**
		 * 查询通知公告
		 */
		setTimeout(function()
		{
			var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
			integratematerialService.findlist(1,2,2,
			{
				success: function(jsonData)
				{
					var tongzhigonggaoview = Ext.create('eapp.view.about.TongZhiGongGao');
					var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
					tongzhigonggaoview.setStore(store);
					//tongzhigonggaoview.init(jsonData);
					
				},
				failure: function(message)
				{
					console.log(message);
				}
			});
		}, 10);
		
		/**
		 * 查询政务服务
		 */
		setTimeout(function()
		{
			var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
			integratematerialService.findlist(1,2,3,
			{
				success: function(jsonData)
				{
					var bianminxinxiview = Ext.create('eapp.view.about.BianMinXinXi');
					bianminxinxiview.init(jsonData);
					console.log(jsonData);
				},
				failure: function(message)
				{
					console.log(message);
				}
			});
		}, 10);
	},
});