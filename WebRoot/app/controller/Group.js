/**
 * 多彩家园控制层
 */
Ext.define('eapp.controller.Group',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			grouppageview:'grouppageview',
			addgroupview:'addgroupview',
			grouplistview:'grouplistview',
			activitydeatilview:'activitydeatilview',
			addactivityview:'addactivityview',
			activitylistview:'activitylistview',
			grouplistallview:'grouplistallview',
			
			createactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=createactivityname]'},
			gzactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=gzactivityname]'},
			fqactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=fqactivityname]'},
			ckactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=ckactivityname]'},
			
			groupsubmitname:{selector: 'addgroupview formpanel button[name=groupsubmitname]'},
			
			activitysubmitname:{selector: 'addactivityview formpanel button[name=activitysubmitname]'},
			
		},
	
		control:
		{
			createactivityname:
			{
				tap:'OnCreateactivitynameTap',
			},
			gzactivityname:
			{
				tap:'OnGzactivitynameTap',
			},
			fqactivityname:
			{
				tap:'OnFqactivitynameTap',
			},
			ckactivityname:
			{
				tap:'OnCkactivitynameTap',
			},
			groupsubmitname:
			{
				tap:'OnGroupsubmitnameTap',
			},
			grouplistview:
			{
				itemtap:'OnItemTap',
			},
			activitysubmitname:
			{
				tap:'OnActivitysubmitnameTap'
			},
			activitylistview:
			{
				itemtap:'ActivityItemTap',
			}
		},
	},
	
	/**
	 * 点击活动列表显示活动详情
	 */
	ActivityItemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		var activitydeatilview = me.getActivitydeatilview();
		if(activitydeatilview == null || activitydeatilview == 'undefined')
		{
			activitydeatilview = Ext.create('eapp.view.duocaijiayuan.ActivityDetail');
		}
		activitydeatilview.init(record);
		me.getMainview().push(activitydeatilview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'activitydeatilview')
		{
			eapp.app.pageStack.push('activitydeatilview');
		}
	},
	
	/**
	 * 发起活动
	 */
	OnActivitysubmitnameTap:function()
	{
		var me = this;
		var addactivityview = me.getAddactivityview();
		var groupid = addactivityview.getGroupid();
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		
		var activityname = Ext.ComponentQuery.query('#activityid', addactivityview)[0].getValue();
		var startday = Ext.ComponentQuery.query('#startdayid', addactivityview)[0].getValue();
		var endday = Ext.ComponentQuery.query('#enddayid', addactivityview)[0].getValue();
		var activitycontent = Ext.ComponentQuery.query('#activitycontentid', addactivityview)[0].getValue();
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var groupService = Ext.create('eapp.business.GroupService');
		groupService.addactivity(groupid,userid,activityname,startday,endday,activitycontent,
		{
			success:function(jsonData)
			{
				if(jsonData == "OK")
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','发起活动成功!~');
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);
				}
				else
					eapp.view.Dialogs.showAlert('智慧潘家园','发起活动成功!~');
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
	 * 点击群列表发起活动
	 */
	OnItemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		var addgroupview = me.getAddgroupview();
		if(addgroupview == null || addgroupview == 'undefined')
		{
			addgroupview = Ext.create('eapp.view.duocaijiayuan.AddActivity');
		}
		addgroupview.setGroupid(record.get('groupid'));
		me.getMainview().push(addgroupview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addgroupview')
		{
			eapp.app.pageStack.push('addgroupview');
		}
	},
	
	/**
	 * 申请创建活动群
	 */
	OnGroupsubmitnameTap:function()
	{
		var me = this;
		var addgroupview = me.getAddgroupview();
		
		var groupname = Ext.ComponentQuery.query('#groupid', addgroupview)[0].getValue();
		var groupcontent = Ext.ComponentQuery.query('#groupcontentid', addgroupview)[0].getValue();

		var user = eapp.util.GlobalData.getCurrentUser()
		var userid = user.get("userid");
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var groupService = Ext.create('eapp.business.GroupService');
		/*
		 * userid 用户id
		 * groupname: 群名称
		 * groupcontent:群说明
		 */
		groupService.addgroup(userid,groupname,groupcontent,
		{
			success:function(jsonData)
			{
				console.log(jsonData);
				if(jsonData == "OK")
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请创建活动群成功!~');
					var backButton = me.getMainview().getNavigationBar().getBackButton();
					backButton.fireEvent('tap', backButton, null, null);	
				}
				else
					eapp.view.Dialogs.showAlert('智慧潘家园','申请创建活动群失败!~');
				Ext.Viewport.setMasked(false);
			},
			failure: function(message) 
		    {
		    	console.log(message);
				Ext.Viewport.setMasked(false);
		    }
		});
	},
	
	// 跳转到申请创建活动群页面
	OnCreateactivitynameTap:function()
	{
		var me = this;
		var addgroupview = me.getAddgroupview();
		if(addgroupview == null || addgroupview == 'undefined')
		{
			addgroupview = Ext.create('eapp.view.duocaijiayuan.AddGroup');
		}
		
		me.getMainview().push(addgroupview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addgroupview')
		{
			eapp.app.pageStack.push('addgroupview');
		}
	},
	
	// 查询所有群列表
	OnGzactivitynameTap:function()
	{
		var me = this;
		var grouplistallview = me.getGrouplistallview();
		if(grouplistallview == null || grouplistallview == 'undefined')
		{
			grouplistallview = Ext.create('eapp.view.duocaijiayuan.GroupListAll');
		}
//		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
//		var groupSerive = Ext.create('eapp.business.GroupService');
//		//查询所有的群列表 传一个空的id过去在服务器端做处理
//		groupSerive.findgroup(null,
//		{
//			success:function(jsonData)
//			{
//				grouplistallview.init(jsonData);
//				console.log(jsonData);
//			},
//			failure: function(message) 
//		    {
//		    	console.log(message);
//				Ext.Viewport.setMasked(false);
//		    }
//		});
		
		
		me.getMainview().push(grouplistallview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'grouplistallview')
		{
			eapp.app.pageStack.push('grouplistallview');
		}
	},
	
	// 关注的活动群列表
	OnFqactivitynameTap:function()
	{
		var me = this;
		var grouplistview = me.getGrouplistview();
		if(grouplistview == null || grouplistview == 'undefined')
		{
			grouplistview = Ext.create('eapp.view.duocaijiayuan.GroupList');
		}
//		var user = eapp.util.GlobalData.getCurrentUser();
//		var useid = user.get('userid');
//		var groupService = Ext.create('eapp.business.GroupService');
//		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
//		groupService.findgroup(useid,
//		{
//			success:function(jsonData)
//			{
//				grouplistview.init(jsonData);
//				Ext.Viewport.setMasked(false);
//			},
//			failure: function(message) 
//		    {
//		    	console.log(message);
//				Ext.Viewport.setMasked(false);
//		    }
//		});
		me.getMainview().push(grouplistview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'grouplistview')
		{
			eapp.app.pageStack.push('grouplistview');
		}
	},
	
	// 查看活动列表
	OnCkactivitynameTap:function()
	{
		var me = this;
		var activitylistview = me.getActivitylistview();
		if(activitylistview == null || activitylistview == 'undefined')
		{
			activitylistview = Ext.create('eapp.view.duocaijiayuan.ActivityList');
		}
		
		
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var groupService = Ext.create('eapp.business.GroupService');
		groupService.findactivity(userid,1,10,
		{
			success:function(jsonData)
			{
//				console.log(jsonData);
//				var store = Ext.create('eapp.store.Group', {data: jsonData.result});
//				console.log(store);
//		    	me.setStore(store);
				activitylistview.init(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure: function(message) 
		    {
		    	console.log(message);
				Ext.Viewport.setMasked(false);
		    }
		});
		
		
		me.getMainview().push(activitylistview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'activitylistview')
		{
			eapp.app.pageStack.push('activitylistview');
		}
	}
});