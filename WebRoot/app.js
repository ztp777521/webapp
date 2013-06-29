Ext.application(
{
	name: 'eapp',
	glossOnIcon: false,
	mapEngine: 'google',
	viewport: 
	{
		autoMaximize: true, 
	},
	
	/**
	 * Servier层 和 调用的插件
	 */
	requires: 
	[
	 	// 插件
	 	'eapp.util.GlobalData', 
	 	'eapp.view.Dialogs',
	 	'eapp.component.LabelEx', 
	 	'eapp.geo.mapabc.Map',
	 	
	 	// Service 
	 	'eapp.business.BaseService', 
	 	'eapp.business.IntegratematerialService', 
	 	'eapp.business.ResidentuserService',
	 	'eapp.business.UnemploymentregistrationService',
	 	'eapp.business.VolunteerService',
	 	'eapp.business.GroupService',
	 	'eapp.business.ShopService',
	],
	
	/**
	 * 实体层
	 */
	models: 
	[
	 	'eapp.model.Integratematerial',
	 	'eapp.model.Residentuser',
	 	'eapp.model.Idea',
	 	'eapp.model.Unemploymentregistration',
	 	'eapp.model.Unemploymentreply',
	 	'eapp.model.Group',
	 	'eapp.model.Activity',
	 	'eapp.model.Shop',
	],
	
	/**
	 * 
	 */
	stores:
	[
	 	'eapp.store.Integratematerial',
	 	'eapp.store.Residentuser',
	 	'eapp.store.Idea',
	 	'eapp.store.Unemploymentregistration',
	 	'eapp.store.Unemploymentreply',
	 	'eapp.store.Group',
	 	'eapp.store.Activity',
	 	'eapp.store.Shop',
	],

	/**
	 * 视图展示层
	 */
	views: 
	[
	 	'eapp.view.Main', 
	 	'eapp.view.Cell12', 
	 	'eapp.view.Login', 
	 	'eapp.view.IntegrateMaterial',
	 	'eapp.view.Register', 
	 	'eapp.view.My', 
	 	'eapp.view.SetPersonal', 
	 	'eapp.view.MapView', 
	 	
	 	// 智慧之窗
	 	'eapp.view.zhihuizhichuang.IntegratematerialList',
	 	'eapp.view.zhihuizhichuang.IntegratematerialDetail',
	 	
	 	// 幸福家园
	 	'eapp.view.xinfujiayuan.IntegratematerialDetailTow',
	 	'eapp.view.xinfujiayuan.IntegratematerialListTow',
	 	
	 	//社工加油站
	 	'eapp.view.shegongjiayouzhan.IntegratematerialListShree',
	 	'eapp.view.shegongjiayouzhan.IntegratematerialDetailShree',
	 	
	 	// 智慧言路
	 	'eapp.view.zhihuiyanlu.Idea',
	 	'eapp.view.zhihuiyanlu.IdeaList',
	 	'eapp.view.zhihuiyanlu.IdeaPage', 
	 	
	 	//智慧试听
	 	'eapp.view.zhihuishiting.IntegratematerialListFour',
	 	
	 	// 共建和谐
	 	'eapp.view.gongjianhexie.VolunteerPage', 
	 	'eapp.view.gongjianhexie.AddIdea',
	 	'eapp.view.gongjianhexie.ApplyVolunteer',
	 	'eapp.view.gongjianhexie.ApplyVolunteerTow',
	 	
	 	// 温情家园
	 	'eapp.view.wenxinjiayuan.UnemPage', 
	 	'eapp.view.wenxinjiayuan.AddUnem',
	 	'eapp.view.wenxinjiayuan.MyUnem',
	 	'eapp.view.wenxinjiayuan.UnemDetail', 
	 	
	 	// 多彩家园
	 	'eapp.view.duocaijiayuan.GroupPage', 
	 	'eapp.view.duocaijiayuan.AddGroup',
	 	'eapp.view.duocaijiayuan.AddActivity',
	 	'eapp.view.duocaijiayuan.GroupList',
	 	'eapp.view.duocaijiayuan.ActivityDetail',
	 	'eapp.view.duocaijiayuan.ActivityList',
	 	'eapp.view.duocaijiayuan.GroupListAll',
	 	
	 	// 和谐家园
	 	'eapp.view.hexiejiayuan.ShopPage',
	 	'eapp.view.hexiejiayuan.AddShop',
	 	'eapp.view.hexiejiayuan.ShopList',
	 	
	 	'eapp.view.about.TongZhiGongGao',
	 	'eapp.view.about.BianMinXinXi',
	 	'eapp.view.about.IndexPage',
	 	'eapp.view.about.NewsList',
	 	
	 	'eapp.view.about.Test001',
		'eapp.view.about.TestChart', 
	],
	
	/**
	 * 控制层
	 */
	controllers: 
	[
	 	'eapp.controller.Cell12',
	 	'eapp.controller.Main',
	 	'eapp.controller.Integratematerial', 
	 	'eapp.controller.IntegratematerialTow',  
	 	'eapp.controller.IntegratematerialShree', 
	 	'eapp.controller.IntegratematerialFour', 
	 	'eapp.controller.Login',
	 	'eapp.controller.My',
	 	'eapp.controller.Idea',
	 	'eapp.controller.Volunteer',
	 	'eapp.controller.Unemploymentregistration',
	 	'eapp.controller.Group',
	 	'eapp.controller.Shop',
	],
	
	appData: null,
	pageStack:[],
	

	/**
	 * 程序入口
	 */
	launch: function() 
    {
//		var mainView = Ext.create('eapp.view.Main');
//		Ext.Viewport.add(mainView);
		
		var testChart = Ext.create('eapp.view.about.TestChart');
		Ext.Viewport.add(testChart);
    },
	
	
//	launch:function()
//	{
//		//创建一个全屏的tabpanel
//		var tabpanel = Ext.create('Ext.TabPanel', 
//		{
//		    fullscreen: true,
//		    //选项卡（导航栏在下方）
//		    tabBarPosition: 'bottom',    
//		    //各项内容的显示控制
//		    layout: 
//		    {
//		        type: 'card',
//		        //显示动画
//		        animation: {
//		            type: 'fade'
//		        }
//		    },
//		     
//		    items:
//		    [
//		     	{xtype:'indexPage'},
//		     	{xtype:'newsList'},
//		     	{xtype:'loginView'}
//		    ]
//		});
//		Ext.Viewport.add(tabpanel);
//	},
	
//	launch: function () 
//    {
//		var me = this;
//        var myPanel1 =new Ext.Panel(
//        {
//            id: 'myPanel1',
//            layout: 'vbox',
//            html: 'Oh, this is Panel1!',
//            items: 
//            {
//                xtype: 'button',
//                text: '前往Panel2',    
//                handler: function()
//                {
//                    me.views.mainPanel.setActiveItem(    //设置活动项的方法
//					'myPanel2',                    //第一个参数为mypanel2的id 在这里也可以填数字 ‘1’
//					'slide'//这个参数为切换效果
//                    );
//                }
//            }
//        });
//        
//        var myPanel2 =new Ext.Panel(
//        {
//            id: 'myPanel2',
//            layout: 'vbox',
//            html:  'This is Panel2!',
//            items: 
//            {
//                xtype: 'button',
//                text: '前往Panel3',
//                handler: function()
//                {
//                    
//                    var pnl =new Ext.Panel(
//                    {
//                        html:'这个是点击按钮之后才创建的Panel,演示到此结束'
//                    });
//                    
//                    me.views.mainPanel.setActiveItem(pnl,
//                        {            //这里参数是刚创建的panel
//                        type: 'slide',    //这里动画效果为一个动画效果对象
//                        direction: 'right'
//                    });
//                }
//            }
//        });
//        
//        me.views.mainPanel =new Ext.Panel(
//        {
//            fullscreen: true,
//            layout: 'card',
//            items: [myPanel1, myPanel2]    //第一个为默认界面
//        });
//    },
	
    
//    launch:function()
//    {
//    	var panel = Ext.create('Ext.TabPanel', 
//    	{
//    	    fullscreen: true,
//    	    tabBarPosition: 'bottom',
//	         items: 
//	         [
//					{
//					    title: '用户登录',
//					    html: eapp.view.Login, 
//					},
//					{
//					    title: '用户注册',
//					    html: 'Contact Screen'
//					},
//					{
//					    title: '个人信息',
//					    html: 'Contact Screen'
//					},
//	         ]
//    	});
//    	
//    	Ext.Viewport.add(panel);
//    },
    
    
    
//    launch: function() 
//    {
//    	  //-----------------------------Audio音频组件--------------------------------------
//    	  var audio=new Ext.Video({
//    	   //width:500,
//    	   //height:50,
//		   x        : 600,
//		   y        : 300,
//	 	   width    : 175,
//		   height   : 98,
//    	   url:'MP4/BigBuck.m4v',
//    	   posterUrl: 'MP4/icon.png',
//    	   //loop:true//是否循环播放,true:循环播放,false:不循环
//    	   //enableControls:true,//关闭浏览器自带的播放软件,默认值为true
//    	  });
//    	  
////    	  var audioPlayOrPause=function()
////    	  {
////    	     if(button.getText()=="暂停")
////    	     {
////	    	    audio.pause();
////	    	    button.setText("播放");
////	    	    console.log("------暂停------");
////	    	    console.log(audio.media.dom.playbackRate);//获取video元素的播放速率
////	    	    audio.media.dom.playbackRate+=1;//修改video元素的播放速率,加快视频播放速率
////    	     }else if(button.getText()=="播放")
////    	     {
////	    	    audio.play();
////	    	    button.setText("暂停");
////	    	    console.log("------播放------");
////	    	    console.log(audio.media.dom.playbackRate);//获取video元素的播放速率
////	    	    audio.media.dom.playbackRate+=1;//修改video元素的播放速率,加快视频播放速率
////    	     }
////    	    }
////    	  
////    	  var button=Ext.create('Ext.Button',
////    	{
////    	     id:'playButton',
////    	     text:'暂停',//显示的文字是播放
////    	     //disabled:true,//按钮处于无效状态
////    	     handler:audioPlayOrPause
////    	     
////    	  });
//    	  
//    	  
//    	     var toolbar=new Ext.Toolbar(
//    	    {
//	    	     docked:'top',
//	    	     //items:button
//    	     });
//
//    	  var panel=new Ext.Panel({
//    	    //layout:'vbox',
//    	     items:
//    	    [
//	    	    toolbar,
//	    	    audio
//    	     ]
//    	  });
//    	  
//    	  Ext.Viewport.add(panel);
//    	  audio.play();
//    	  
//    },
    
});