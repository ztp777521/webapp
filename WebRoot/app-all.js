/*
Copyright(c) 2012 Company Name
*/
/**
 * 此类为单例类，用来临时保存数据或永久保存数据
 */
Ext.define('eapp.util.GlobalData', 
{
	singleton: true,
	
	statics: 
	{
		 pageStack:['main'], // 记录用户的访问路径
    },

	/**
	 * 判断是否要自动登录
	 */
	isEnabledAutoLogin: function()
	{
		var username = this.getUserName();
		var password = this.getPassword();
		this.setUserName(username);
		if(!Ext.isEmpty(username) && !Ext.isEmpty(password))
		{
			return true;
		}
		
		return false;
	},
	/**
	 * 记住用户的登录用户名
	 * @param username
	 */
	setUserName : function(username)
	{
		localStorage.username=username;
	},
	/**
	 * 获取用户的登录用户名
	 * @returns
	 */
	getUserName : function()
	{
		return localStorage.username;
	},
	/**
	 * 记住用户的登录密码
	 * @param password
	 */
	setPassword: function(password)
	{
		localStorage.password=password;
	},
	/**
	 * 获取用户的登录密码
	 * @returns
	 */
	getPassword: function()
	{
		return localStorage.password;
	},
	/**
	 * 保存登录用户信息
	 * @param {Object} userinfo
	 */
	setCurrentUser: function(userinfo)
	{
		localStorage.currentuserinfo = userinfo;
	},
	/**
	 * 获取登录用户信息
	 */
	getCurrentUser: function()
	{
		var temp = localStorage.currentuserinfo;
		if(temp != null && temp != 'undefined' && temp != '')
		{
			var jsonData = Ext.JSON.decode(temp);
			var userInfo = Ext.create('eapp.model.Residentuser',jsonData);
			
			return userInfo;
		}
		
		return null;
	},
	/**
	 * 判断是否以登录
	 */
	isLoged: function()
	{
		var userInfo = this.getCurrentUser();
		if(userInfo == null || userInfo == 'undefined')
		{
			return false;
		}
		
		return true;
	},
});
Ext.define('eapp.view.Dialogs',
{
	singleton: true,
	
	showComfirm: function(title,content, callback)
	{
		this.showCustomComfirm(title, content, '是', '否', 
		{
			yes: function()
			{
				callback();
			},
			no: function()
			{
				Ext.Msg.hide();
			}
		});
	},
	showSearchComfirm: function(title,content, callback)
	{
		Ext.MessageBox.YESNO = 
		[
            {text: '否',  itemId: 'no'},
            {text: '是', itemId: 'yes', ui: 'action'}
        ];
		Ext.Msg.confirm(title, content, function(buttonId,value ,opt )
		{
			if (buttonId == 'yes') 
			{
				callback.yes();
			}
			else
			{
				Ext.Msg.hide();
				//callback.no();
			}
		});
	},
	showCustomComfirm: function(title, content, yesButtonText, noButtonText, callback)
	{
		Ext.MessageBox.YESNO = 
		[
            {text: noButtonText,  itemId: 'no'},
            {text: yesButtonText, itemId: 'yes', ui: 'action'}
        ];
		Ext.Msg.confirm(title, content, function(buttonId,value ,opt )
		{
			if (buttonId == 'yes') 
			{
				callback.yes();
			}
			else
			{
				Ext.Msg.hide();
				callback.no();
			}
		});
	},
	
	showAlert: function(title,content)
	{
		this.showCustomAlert(title, content, '确定', function(){});
	},
	
	showCustomAlert: function(title, content, buttonText, callback)
	{
		Ext.MessageBox.OK ={text: buttonText,     itemId: 'ok',  ui: 'action'};
		Ext.Msg.alert(title, content, function(buttonId,value ,opt )
		{
			Ext.Msg.hide();
			callback();
		});
	}
});

/**
 * 自定义labelEx控件
 */
Ext.define('eapp.component.LabelEx', 
{
    extend: 'Ext.Container',
    xtype: 'labelEx',
	
	config:
	{
		dataField: null,
		dataFieldWidth: 100,
		dataFieldDisplayNone: false,
		dataValue: null,
		dataType: null,// phone表示电话，点击时自动呼出，url表示网址，点击是打开
		tpl: '<div>{0}</div>'
	},
	
	renderTpl: function()
	{
		var args = Ext.Array.toArray(arguments, 0);
		var tpl = this.getTpl().html;
        var a = tpl.replace(/\{(\d+)\}/g, function(m, i) 
		{
            return args[i];
        });
		
		this.setContent(a);
	},

	setContent: function(content)
    {
		var dataValue = this.getDataValue();
		var dataField = this.getDataField();
		var dataFieldDisplayNone = this.getDataFieldDisplayNone();
		var dataType = "" + this.getDataType();
		
		if(dataFieldDisplayNone == false && dataField != null && dataField != 'undefined' && dataField != '' && dataValue != null && dataValue != 'undefined' && dataValue != '')
		{
			var dataFieldWidth = this.getDataFieldWidth();
			if(dataType == 'phone')
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td>' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
			else if(dataType == 'url')
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td style="word-break: break-all; overflow:hidden; ">' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
			else
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td>' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
		}
		else if(dataValue != null && dataValue != 'undefined' && dataValue != '')
		{
			this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td>' + content + '</td><td valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
		}
		else
		{
			this.setHtml(content);
		}
		
		var element = Ext.get(this.element);
		if(element.hasListener('tap'))
		{
			element.un('tap', this.onTap,this);
		}
		element.on('tap', this.onTap, this);
	},
	
	onTap: function(event, element, options, eOpts)
	{ 
		var dataType = "" + this.getDataType();
		var dataValue = "" + this.getDataValue();
		if(dataType == 'phone')
		{
			if(dataValue.indexOf('tel:') < 0)
			{
				window.location = 'tel:' + dataValue;
			}
			else
			{
				window.location = dataValue;
			}
		}
		else if(dataType == 'url')
		{
			if(dataValue.indexOf('http://') < 0 && dataValue.indexOf('https://') < 0 )
			{
				dataValue = 'http://' + dataValue;
			}
			try
			{
				window.openBrowser(dataValue);
			}
			catch(e)
			{
				window.open(dataValue);
			}
		}
		else
		{
			this.fireEvent('tap', dataValue);
		}
	},
});

/**
 * 服务器API调用类的基类
 */
Ext.define('eapp.business.BaseService', 
{
    /**
     * 获取服务器API的URL前缀
     * @returns {String}
     */
	getApiBaseUrl : function()
	{
	 	// return 'http://192.168.0.1:1020/webapi/';
	 	return 'http://localhost:8080/webapi/';
	},
	/**
	 * 获取地理接口的URL前缀
	 * @returns {String}
	 */
	getGeoBaseUrl: function()
	{
//		return 'http://localhost:8080/geoservice/';
		return 'http://api.wecity.co/g4d/';
	},
	/**
	 * 获取HTTP Header
	 * @returns {___anonymous546_699}
	 */
	getHttpHeaders: function()
	{
		var GlobalData = eapp.util.GlobalData;
		
		return {'apptypeid' : GlobalData.getAppTypeId(),'platformid': GlobalData.getPlatformId(),'city':GlobalData.getCityName(),'district':GlobalData.getDistrict()};
	},
	/**
	 * 调用Api接口
	 * @param url
	 * @param postData
	 * @param callback
	 */
	callApi: function(url,postData,callback)
	{
		this.call(this.getApiBaseUrl() + url, postData, callback, 'OK');
	},
	/**
	 * 调用地理接口
	 * @param url
	 * @param postData
	 * @param callback
	 */
	callGeo: function(url,postData,callback)
	{
		this.call(this.getGeoBaseUrl() + url, postData, callback, 1);
	},
	/**
	 * 向服务器发送调用请求
	 * @param url
	 * @param postData
	 * @param callback
	 */
	call: function(url,postData,callback,flag)
	{
		console.log(url);
        console.log(Ext.JSON.encode(postData));
		
		var me = this;
		Ext.Ajax.request(
		{
		    url: url,
		    method: 'POST',
		    timeout: 60000,
		    // withCredentials: true,
		    // useDefaultXhrHeader: false,
		   // headers: me.getHttpHeaders(),
		    params: postData,
		    success: function(response)
		    {
		    	// console.log(response);
		    	var text = response.responseText;
		        
		        if(text == null || text.length == 0)
	        	{
		        	Ext.Viewport.setMasked(false);
					callback.failure('服务器响应的内容为空！');
		        	return;
	        	}
		        var jsonData = null;
		        try
		        {
		        	jsonData = Ext.JSON.decode(text);
		        }
		        catch(e)
		        {
		        	Ext.Viewport.setMasked(false);
					callback.failure('服务器返回的数据无法解析！');
		        }
	        	if(jsonData.status == flag)
	        	{
	        		Ext.Viewport.setMasked(false);
					callback.success(jsonData.data);
	        	}
	        	else
	        	{
	        		Ext.Viewport.setMasked(false);
					callback.failure(jsonData.data);
	        	}
		    },
		    failure: function(response) 
		    {
		    	console.log(response);
				Ext.Viewport.setMasked(false);
		    	callback.failure('调用服务器接口失败！');
		    }
		});
	}
});
/**
 * 关于资料IPI的调用
 */
Ext.define('eapp.business.IntegratematerialService', 
{
    extend: 'eapp.business.BaseService',
    
    /**
     * 查询资料列表
     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态 )
     */
    findlist: function(moduleTypeid,materialState,showTypeid,callback)
    {
        this.callApi('integratematerial!getlist.action',
        {
        	moduleTypeid:moduleTypeid,
        	materialState:materialState,
        	showTypeid:showTypeid
        },
        callback);
    },
	
});

/**
 * 操作用户
 */
Ext.define('eapp.business.ResidentuserService',
{
	extend:'eapp.business.BaseService',
	
	/**
	 * 用户登录
	 * username:用户名
	 * password:密码
	 * callback,回调函数
	 */
	login:function(username,password,callback)
	{
		this.callApi('residentuser!login.action',
		{
			username:username,
			password:password
		},callback);
	},
	
	/**
	 * 用户注册
	 * loginname,登录名
	 * passwordname,密码
	 * username,用户名
	 * telname,电话
	 * emailname,email
	 * numbername,亲情号
	 * callback,回调函数
	 */
	register:function(loginname,passwordname,username,telname,emailname,numbername,callback)
	{
		this.callApi('residentuser!register.action',
		{
			loginname:loginname,
			password:passwordname,
			realname:username,
			telephonenum:telname,
			email:emailname,
			familyTelephonenum:numbername,
		},callback);
	},
	
	/**
	 * 修改用户信息
	 * userid,用户id
	 * loginname,登录名
	 * username,用户名
	 * telname,电话
	 * emailname,email
	 * numbername,亲情号
	 * callback,回调函数
	 */
	upuser:function(userid,loginname,username,telname,emailname,numbername,callback)
	{
		this.callApi('residentuser!upuser.action',
		{
			userid:userid,
			loginname:loginname,
			realname:username,
			telephonenum:telname,
			email:emailname,
			familyTelephonenum:numbername,
		},callback);
	}
	
});
/**
 * 
 */
Ext.define('eapp.business.UnemploymentregistrationService',
{
	extend:'eapp.business.BaseService',
	
	
	/**
	 * 失业提交
	 * userid,用户id
	 * username,用户名
	 * unemphone,电话
	 * unememail,email
	 * unemhome,家庭状况
	 * unemjiuye,就业意向
	 * unempaddress,家庭住址
	 * unempersonal,就业意向
	 * callback,回调函数
	 */
	addunem:function(userid,username,unemphone,unememail,unemhome,unemjiuye,unempaddress,unempersonal,callback)
	{
		this.callApi('unemploymentregistration!addunemploymentregistration.action',
		{
			userid:userid,
			username:username,
			telephonenum:unemphone,
			email:unememail,
			familySituation:unemhome,
			empIntentions:unemjiuye,
			address:unempaddress,
			personalSituation:unempersonal
		},callback);
	},
	
	/**
	 * 查询失业登记信息  
	 * userid, 用户id
	 * callback,回调函数
	 */
	findunem:function(userid,callback)
	{
		this.callApi('unemploymentregistration!findunempregrep.action',
		{
			userid:userid,
		},callback);
	},
	
	/**
	 * 根据失业登记id查询回复信息
	 * userid,用户id
	 * callback，回调函数
	 */
	getbyid:function(userid,callback)
	{
		this.callApi('unemploymentregistration!getreplylist.action',
		{
			userid:userid
		},callback);
	}
});
/**
 * 
 */
Ext.define('eapp.business.VolunteerService',
{
	extend:'eapp.business.BaseService',
	
	/**
	 * 查询所有网格编号编号
	 * callback：回调函数
	 */
	findAll:function(callback)
	{
		this.callApi('volunteer!findgridinfolist.action',{ },callback);
	},
	
	/**
	 * 申请网格编号
	 * userid,用户id
	 * applyGridid,申请网格id
	 * applyReson,申请说明
	 * callback,回调函数
	 */
	addVolunteer:function(userid,applyGridid,applyReson,callback)
	{
		this.callApi('volunteer!addvolunteer.action',
		{
			userid:userid,
			applyGridid:applyGridid,
			applyReson:applyReson
		},callback);
	},
	
	/**
	 * 提交意见
	 * callback：回调函数
	 */
	addideareply:function(callback)
	{
		this.callApi('volunteer!addideareply.action',{},callback);
	}
});
/**
 * 操作活动
 */
Ext.define('eapp.business.GroupService',
{
	extend:'eapp.business.BaseService',
	
	/**
	 * 申请创建活动群
	 * userid: 用户id
	 * groupname:群名称
	 * groupcontent:群说明
	 * callback：回调函数
	 */
	addgroup:function(userid,groupname,groupcontent,callback)
	{
		this.callApi('group!addgroup.action',
		{
			applyUserid:userid,
			groupName:groupname,
			groupDescription:groupcontent
		},callback);
	},
	
});
Ext.define('eapp.model.Integratematerial',
{
	extend:'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'materialid',
			'materialContent',
			'materialPicture',
			'moduleTypeid',
			'materialTitle',
			'materialState',
			'materialVideo',
			'materialCommitDate',
			'materialPublicDate',
			'showTypeid',
			'materialSource',
			'commitPersonid'
		]
	}
});
Ext.define('eapp.model.Residentuser',
{
	extend :'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'userid',
			'loginname',
			'realname',
			'password',
			'email',
			'telephonenum',
			'familyTelephonenum',
			'commmunityid',
			'thirdLogType',
			'thirdLogAccount',
		]
	}
});
Ext.define('eapp.model.Idea',
{
	extend:'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'ideaid',
			'userId',
			'userName',
			'telephonenum',
			'email',
			'ideaContent',
			'gridnum',
			'isreply',
			'commitDate',
			'ispublic',
		 ]
	}
});
Ext.define('eapp.model.Unemploymentregistration',
{
	extend :'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'unempRegid',
			'userid',
			'username',
			'telephonenum',
			'email',
			'unempTime',
			'familySituation',
			'empIntentions',
			'personalSituation',
			'address',
			'commitDate',
			'empState'
		]
	}
});
Ext.define('eapp.model.Unemploymentreply',
{
	extend :'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'replyid',
			'unempRegid',
			'unempReplyContent',
			'replyDate',
			'replyName',
			'replyUserid'
		]
	}
});
Ext.define('eapp.view.Main', 
{
	extend: 'Ext.NavigationView',
	xtype: 'mainview',

	config:
	{
		defaultBackButtonText: '返回',
        
        navigationBar: 
        {
			cls:'',
            items:
			[
               {
				    xtype: 'button',
				    id: 'actionButton',
					cls:'actionbutton',
					style: 'margin-right: 0px',
				    text: '返回',
				    align: 'right',
				    hidden: true,
				    hideAnimation: Ext.os.is.Android ? false : 
					{
				        type: 'fadeOut',
				        duration: 200
				    },
				    showAnimation: Ext.os.is.Android ? false : 
					{
				        type: 'fadeIn',
				        duration: 200
				    }
				}
            ]
        },

        autoDestroy: true,

		items: 
		[
		]
	},
	
	initialize: function()
	{
		this.callParent();
		this.getNavigationBar().hide();
		
		var appData = eapp.app.appData;
		var page = Ext.create('eapp.view.Cell12');
		page.init();
		this.add(page);
		eapp.app.pageStack.push('main');
		Ext.Viewport.show();
		this.fireEvent('initcomplete');
		
		// 以下为对返回键的处理
		var me = this;
		document.addEventListener("backbutton", function()
		{
			Ext.Viewport.setMasked(false);
			
			var stack =eapp.app.pageStack;
			console.log(stack);
	    	var len = stack.length;
			if(stack[len - 1] == 'main')
			{
				eapp.view.Dialogs.showComfirm('确认', '您确定要退出应用？',function()
				{
					window.exitApplication();
				});
			}
			else
			{
				me.pop();
				me.fireEvent('back');
			}
		}, false);
		
		try
		{
			navigator.splashscreen.hide();
		}
		catch(e)
		{}
		
//		//定位
//		setTimeout(function()
//		{
//			if (navigator.geolocation)
//			{
//				navigator.geolocation.getCurrentPosition(function success(location)
//				{
//					eapp.app.position.latitude = location.coords.latitude;
//					eapp.app.position.longitude = location.coords.longitude;
//				},
//				function failure(errorCode, errorMessage)
//				{
//					eapp.app.position.latitude = eapp.app.appData.enterprise.get('latitude');
//					eapp.app.position.longitude = eapp.app.appData.enterprise.get('longitude');
//				},{enableHighAccuracy: true, timeout: 5000}
//				);
//			}
//			else
//			{
//				eapp.app.position.latitude = eapp.app.appData.enterprise.get('latitude');
//				eapp.app.position.longitude = eapp.app.appData.enterprise.get('longitude');
//			}
//		}, 10);
	},
	
	pop: function() 
	{
        this.fireEvent('beforepop', this);

        this.callParent(arguments);
    }
});

Ext.define('eapp.view.Cell12', 
{
	extend: 'Ext.Container',
	xtype: 'cell12view',

	config:
	{
		items: 
		[
			{
				xtype: 'container',
				name: 'backgroundImg'
			},
			{
				xtype: 'container',
				cls: 'page',
				scrollable: 
				{
				    direction: 'vertical',
				    directionLock: true
				},
				items:
				[
					{
						xtype: 'container',
						name: 'subject',
						html: '智慧潘家园',
						cls: 'subject'
					},
					{
						xtype: 'container',
						name: 'menuContainer',
						cls: 'cell9_menu',
						items:
						[
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm1',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm2',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm3',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm4',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm5',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm6',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm7',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm8',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm9',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm10',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm11',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm12',
										cls: 'cell9_menu_item'
									}
								]
							}
						]
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						cls: 'poweredby',
						style: 'border: none',
		 
						items: 
						[
							{
		                        xtype: 'spacer'
		                    },
							{
								xtype:'img',
								name: 'poweredbyimg'
							},
							{
		                        xtype: 'spacer',
								name: 'login',
								cls: 'textalignright',
		                    }
						]
					}
				]
			}
		]
	},
	
	init: function()
	{
		var backgroundImg = this.down('container[name="backgroundImg"]');
		backgroundImg.setHtml('<img src="images/backgroundimg.jpg" style="width: 100%;height: 120%" />');
		
//		var poweredby = this.down('img[name="poweredbyimg"]');
//		poweredby.setHtml('<img src="images/poweredby_white.png" class="poweredbyimg" />');
		
		var m1 = this.down('img[name="m1"]');
		m1.setHtml('<img src="images/zhihuizhichuang.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧之窗 </div>');
		
		var m2 = this.down('img[name="m2"]');
		m2.setHtml('<img src="images/xingfujiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">幸福家园 </div>');
		
		var m3 = this.down('img[name="m3"]');
		m3.setHtml('<img src="images/hongsebaolei.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">红色堡垒</div>');
		
		var m4 = this.down('img[name="m4"]');
		m4.setHtml('<img src="images/jiayouzhan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">社工加油站</div>');
		
		var m5 = this.down('img[name="m5"]');
		m5.setHtml('<img src="images/zhihuiyanlu.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧言路</div>');
		
		var m6 = this.down('img[name="m6"]');
		m6.setHtml('<img src="images/zhihuishiting.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧视听</div>');
		
		var m7 = this.down('img[name="m7"]');
		m7.setHtml('<img src="images/gongjianhexie.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">共建和谐</div>');
		
		var m8 = this.down('img[name="m8"]');
		m8.setHtml('<img src="images/weiqingjiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">温情家园</div>');
		
		var m9 = this.down('img[name="m9"]');
		m9.setHtml('<img src="images/duocaijiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">多彩家园</div>');
		
		var m10 = this.down('img[name="m10"]');
		m10.setHtml('<img src="images/hexiejiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">和谐家园</div>');
		
		var m11 = this.down('img[name="m11"]');
		m11.setHtml('<img src="images/zhihuifuwu.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧服务</div>');
		
		var m12 = this.down('img[name="m12"]');
		m12.setHtml('<img src="images/zhihuidiy.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧DIY</div>');
		
		var loginButton = this.down('spacer[name="login"]');
		loginButton.setHtml('<div><img class="wp_login_image" src="images/login1.png" /><span style="margin-left:15px;"></span></div>');
		Ext.get(loginButton.element.query('img')[0]).on('tap', function()
		{
			loginButton.fireEvent('login');
		});
	}
});
/**
 * 用户登录
 */
Ext.define('eapp.view.Login', 
{
	extend: 'Ext.Container',
	xtype: 'loginView',
	
	config:
	{
		title:'用户登录',
		iconCls:'',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		loginCallback: null,
		items:
		[
		   {
		   	   xtype: 'formpanel',
			   items:
			   [
			   		{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title: '用户登录',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'usernameLogin',
								name:'usernameLogin',
								placeHolder: '请输入用户名',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'passwordfield',
								id: 'passwordLogin',
								name:'passwordLogin',
								placeHolder: '请输入密码',
								autoCapitalize: true,
								clearIcon: true
							},
						]
					},
					{xtype: 'spacer'},
					{
						xtype: 'button',
						text: '登录',
						ui: 'confirm',
						id: 'loginButton',
						name: 'loginButton'
					},
					{xtype: 'spacer', cls:'margin1'},
					{
						xtype: 'button',
						text: '注册',
						id: 'regButton',
						name : 'regButton',
				   }
			   ]
		   }
		]
	},
});

Ext.define('eapp.view.IntegrateMaterial',
{
	extend: 'Ext.List',
    xtype: 'integrate_materialview',
	alternateClassName: 'eapp.integrate_material',
	
    config:
	{
		title: '新闻咨询',
		store:null,
		pageno:'1',
		totalpages:'0',//总页数
		scrollable: 
		{
		    direction: 'vertical',
		    directionLock: true
		},
		items:
		[
			{
				xtype: 'container',
				id:'newsid',
				style: 'font-size: 25px;  text-align: center;',
				html: '',
			},
		],
		itemTpl: 
		[
			'<table>',
			'	<tr>',
			'		<td rowspan="2"><tpl if="image == \'\'"><img style=" width:50px; height:50px;" src="images/newstu.png"/><tpl else><img style=" width:50px; height:50px;" src="{image}" /></tpl></td>',
			'		<td><div style="margin-left: 5px;width: 235px;" class="textoneline">{titles}</div></td>',
			'	</tr>',
			'	<tr>',
			'		<td><div style="margin-left: 5px;width: 235px;font-size: 12px;color: #aaa;" >{summarys}</div></td>',
			'	</tr>',
			'</table>'
		],
	},
	
	/**
	 * 显示新闻列表
	 */
	init:function()
	{
		
//		var networkState = navigator.connection.type;
//		if(networkState == Connection.UNKNOWN || networkState == Connection.NONE)
//		{
//			eapp.view.Dialogs.showAlert('网络错误', '浏览资讯内容需要打开网络！');
//			return;
//		}
		var me = this;
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var eappid = eapp.app.appData.eApp.get("appid");
		var newService = Ext.create('eapp.business.NewsService');
		newService.getNewsList(me.getPageno(),10,eappid,2801,
		{
			success: function(jsonData)
			{
				console.log(jsonData);
				for(var i = 0; i < jsonData.result.length;i++)
				{
					var title = jsonData.result[i].title;
					var summary = jsonData.result[i].summary; 
					if(title.length > 12)
					{
						title = title.substring(0,12) + '...';
					}
					jsonData.result[i].titles = title;
					if(summary.length > 37)
					{
						summary = summary.substring(0,37) + '...';
					}
					jsonData.result[i].summarys = summary;
				}
				var store = me.getStore();
				if(store == null || store == "undefined")
				{
					store = Ext.create('eapp.store.EAppNews', {data: jsonData.result});
				}
				else
				{
					store.add(jsonData.result);
				}
				
				me.setStore(store);
				me.setPageno(jsonData.pageno);
				me.setTotalpages(jsonData.totalpages);
				if(jsonData.result.length == 0)
				{
					Ext.ComponentQuery.query('#newsid',me)[0].setHtml("暂无新闻");
				}
				Ext.Viewport.setMasked(false);
			},
			failure: function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	},
	
	initialize:function()
	{
        this.callParent(arguments);
		var me = this;
        var maxY = 0;
        
        // 当滚动条到达底部时自动加载下一页数据
        me.getScrollable().getScroller().on('scrollend',function(scroller, x, y, eOpts)
        {
//			if(me.getTotalpages() == me.getPageno() &&  me.getTotalpages() != 1)
//			{
//				eapp.view.Dialogs.showAlert('翻页', '已经是最后一页了！');
//				return;
//			}
        	// 判断是否滚动到了底部且没有翻到最后一页
        	if((maxY - y) == 0 && (Number)(me.getTotalpages()) != (Number)(me.getPageno()))
        	{
				console.log(me.getTotalpages());
				if(me.getTotalpages() == 1)
				{
					return;	
				}else
				{
					me.setPageno((Number)(me.getPageno()) + 1);
	        		me.init();
				}
        	}
        });
        this.getScrollable().getScroller().on('maxpositionchange',function(scroller, maxPosition, eOpts)
        {
        	maxY = maxPosition.y;
        });
    },
});

/**
 * 用户注册
 */
Ext.define('eapp.view.Register', 
{
	extend: 'Ext.Container',
	xtype: 'registerView',
	
	config:
	{
		title:'用户注册',
		layout: 'fit',

		items:
		[
		   {
		   	   xtype: 'formpanel',
			   items:
			   [
			   		
			   		{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title: '用户注册',
						items: 
						[
							{
			                    xtype: 'textfield',
			                    id: 'loginnameid',
			                    name:'loginname',
								placeHolder: '请输入登录名',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'passwordfield',
			                    id: 'passwordid',
			                    name:'passwordname',
								placeHolder: '请输入登录密码',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
							 {
			                    xtype: 'textfield',
			                    id: 'usernameid',
			                    name:'username',
								placeHolder: '请输入用户名',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'textfield',
			                    id: 'telid',
			                    name:'telname',
								placeHolder: '请输入手机号',
			                    autoCapitalize: true,
			                    clearIcon: true
			                }, 
			                {
			                    xtype: 'textfield',
			                    id: 'emailid',
			                    name:'emailname',
								placeHolder: '请输入电子邮件',
			                    autoCapitalize: true,
			                    clearIcon: true
			                },{
			                    xtype: 'textfield',
			                    id: 'numberid',
			                    name:'numbername',
								placeHolder: '请输入亲情号（可选）',
			                    autoCapitalize: true,
			                    clearIcon: true
			                },
						]
					},
					{
						xtype:'button',
						text:'注册',
						ui: 'confirm',
						id:'registerButton',
						name:'registerButton',
					}
			   ]
		   }
		]
	}
});

Ext.define('eapp.view.My', 
{
	extend: 'Ext.Container',
	xtype: 'myView',

	config: 
	{
		title:'个人帐号',
		layout: 'fit',
		items:
		[
			{
				xtype:'formpanel',
				items:
				[
					{
						xtype: 'container',
						items:
						[
							{
					            xtype: 'container',
								id: 'namecontainerid',
								width: null
					        },
						]
					},
					{
						xtype: 'fieldset',
						items:
						[
							{
								xtype: 'labelEx',
								id: 'wanshanziliaoid',
								name: 'wanshanziliaoid',
								cls: 'line2',
								dataValue: 'ziliao'
							},
							{
								xtype: 'labelEx',
								id: 'uppasswordid',
								name: 'uppasswordid',
								cls: 'line2',
								dataValue: 'passWord'
							},
							{
								xtype: 'labelEx',
								id: 'cllloginid',
								name: 'cllloginid',
								cls: 'line2',
								dataValue: 'zhuXiao'
							},
						]
					}
				]
			}
		]
	},
	
	/**
	 * 显示用户信息
	 */
	init:function()
	{
		//this.element.dom.style.webkitTransform = '';
		
		var me = this;
		var myMessageList = Ext.ComponentQuery.query('#ruLuXinxiid',me)[0];
		var myWeibo = Ext.ComponentQuery.query('#wanshanziliaoid',me)[0];
		var myFriendList = Ext.ComponentQuery.query('#uppasswordid',me)[0];
		var myDiPan = Ext.ComponentQuery.query('#cllloginid',me)[0];
		var user = eapp.util.GlobalData.getCurrentUser();
		var username = user.get('realname');
		var userid = user.get('userid');
		Ext.ComponentQuery.query('#namecontainerid',me)[0].setHtml('当前用户:' + username);
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">完善个人信息</div></div>');
		myFriendList.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">修改密码</div></div>');
		myDiPan.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">注销退出</div></div>');
	}
});
/**
 * 个人设置
 */
Ext.define('eapp.view.SetPersonal', 
{
	extend: 'Ext.Container',
	xtype: 'setPersonalView',
	
	config:
	{
		title:'个人设置',
		layout: 'fit',

		items:
		[
		   {
		   	   xtype: 'formpanel',
			   items:
			   [
			   		{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '35%'
						},
						title: '用户设置',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'loginnameid',
								label: '登录名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textfield',
								id: 'usernameid',
								label: '用户名',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'telephonenumid',
								label: '手机号',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
								xtype: 'textfield',
								id: 'emailid',
								label: '电子邮件',
								autoCapitalize: true,
								clearIcon: true,
								
							},
							{
								xtype: 'textfield',
								id: 'interestid',
								label: '亲情号',
								autoCapitalize: true,
								clearIcon: true,
							}
						]
					},
					{
						xtype: 'button',
						text: '修改',
						ui: 'confirm',
						id: 'updateButtonid',
						name: 'updateButton'
					},
			   ]
		   }
		]
	},
	
});


Ext.define('eapp.view.zhihuizhichuang.IntegratematerialList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'integratemateriallist',
    
    config: 
    {        
        title:'新闻动态',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
        items:
        [
	         {
	 			xtype: 'toolbar',
	 			ui:'neutral',
	 			docked: 'bottom',
	 			scrollable: false,
	
	 			items: 
	 			[
	 				{
	 					xtype: 'spacer'
	                 },
	 				{
	                 	xtype: 'button',
	 					id:'newsbuttonid',
	 					name:'newsbutton',
	 					width:'85px',
	 					text: '新闻动态',
	                 },
	                 {
	                 	xtype: 'button',
	 					id:'gonggaobuttonid',
	 					name:'gonggaobutton',
	 					width:'98px',
	 					text:'通知公告',
	                 },
	 				{
	                 	xtype: 'button',
	 					id:'fuwubuttonid',
	 					name:'fuwubutton',
	 					width:'85px',
	 					text:'政务服务',
	                 },
	 				{
	                 	xtype: 'spacer'
	                 }
	 			]
	 		},
        ],
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}</span></div>',
			'		<div><span>{materialPublicDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示新闻动态列表
     */
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
    	me.setStore(store);
    },
});
Ext.define('eapp.view.zhihuizhichuang.IntegratematerialDetail',
{
	extend:'Ext.Container',
	
	xtype:'integratematerialdetail',
	
	config:
	{
		title: '详情',
		layout: 'fit',
	    data: null,
		cid:0,
	    items: 
		[
	        {
	            xtype: 'formpanel',
				flex: 1,
	            items: [
				{
	                xtype: 'container',
	                name: 'sign',
	            }, 
	            {
	                xtype: 'container',
	                name: 'sendtime',
	            },
	            {
	                xtype: 'fieldset',
	                items: 
	                [
						{
		                    xtype: 'container',
		                    name: 'message'
		                }
					]
	            }, 
	            ]
	        },
		]
	},
	
	/**
	 * 显示详情
	 */
	init:function(record)
	{
		console.log(record);
		var me = this;
		me.down('container[name="sign"]').setHtml('<div class="communicationview_padding" style="font-weight: bold;">' + record.get('materialTitle') + '</div>');
		me.down('container[name="sendtime"]').setHtml('<div class="communicationview_padding" style="font-size:12px; float: right;">' + record.get('materialPublicDate') + '</div>');
		me.down('container[name="message"]').setHtml('<div class="communicationview_padding" style="overflow:hidden;word-warp:break-word;word-break:break-all;padding-top:20px;padding-left:25px;padding-right:15px;">' + record.get('materialContent') + '</div><div style="height: 20px">&nbsp;</div></div>');
	}
});

Ext.define('eapp.view.xinfujiayuan.IntegratematerialList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'integratemateriallisttow',
    
    config: 
    {        
        title:'新闻动态',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
        items:
        [
	         {
	 			xtype: 'toolbar',
	 			ui:'neutral',
	 			docked: 'bottom',
	 			scrollable: false,
	
	 			items: 
	 			[
	 				{
	 					xtype: 'spacer'
	                 },
	 				{
	                 	xtype: 'button',
	 					id:'newsbuttonid',
	 					name:'newsbutton',
	 					width:'85px',
	 					text: '新闻动态',
	                 },
	                 {
	                 	xtype: 'button',
	 					id:'gonggaobuttonid',
	 					name:'gonggaobutton',
	 					width:'98px',
	 					text:'通知公告',
	                 },
	 				{
	                 	xtype: 'button',
	 					id:'fuwubuttonid',
	 					name:'fuwubutton',
	 					width:'85px',
	 					text:'政务服务',
	                 },
	 				{
	                 	xtype: 'spacer'
	                 }
	 			]
	 		},
        ],
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}</span></div>',
			'		<div><span>{materialPublicDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示新闻动态列表
     */
    init:function(jsonData)
    {
    	var me = this;
    	if(jsonData.result.length <= 0)
    	{
    		eapp.view.Dialogs.showAlert('智慧潘家园','没有数据');
    		return ;
    	}
    	var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
    	me.setStore(store);
    },
});
Ext.define('eapp.view.xinfujiayuan.IntegratematerialDetail',
{
	extend:'Ext.Container',
	
	xtype:'integratematerialdetailtow',
	
	config:
	{
		title: '详情',
		layout: 'fit',
	    data: null,
		cid:0,
	    items: 
		[
	        {
	            xtype: 'formpanel',
				flex: 1,
	            items: [
				{
	                xtype: 'container',
	                name: 'sign',
	            }, 
	            {
	                xtype: 'container',
	                name: 'sendtime',
	            },
	            {
	                xtype: 'fieldset',
	                items: 
	                [
						{
		                    xtype: 'container',
		                    name: 'message'
		                }
					]
	            }, 
	            ]
	        },
		]
	},
	
	/**
	 * 显示详情
	 */
	init:function(record)
	{
		console.log(record);
		var me = this;
		me.down('container[name="sign"]').setHtml('<div class="communicationview_padding" style="font-weight: bold;">' + record.get('materialTitle') + '</div>');
		me.down('container[name="sendtime"]').setHtml('<div class="communicationview_padding" style="font-size:12px; float: right;">' + record.get('materialPublicDate') + '</div>');
		me.down('container[name="message"]').setHtml('<div class="communicationview_padding" style="overflow:hidden;word-warp:break-word;word-break:break-all;padding-top:20px;padding-left:25px;padding-right:15px;">' + record.get('materialContent') + '</div><div style="height: 20px">&nbsp;</div></div>');
	}
});
Ext.define('eapp.view.zhihuiyanlu.Idea',
{
	extend: 'Ext.Container',
	xtype:'ideaView',
	
	config:
	{
		title: '提交意见',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title:'提交意见',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'ideausernameid',
								name:'ideausername',
								placeHolder: '请输入用户姓名',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textfield',
								id: 'ideaphoneid',
								name:'ideaphonename',
								placeHolder: '请输入电话',
								lable:'电话',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'ideaemailid',
								name:'ideamailname',
								placeHolder: '请输入email',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'remarkContent',
								placeHolder: '请输入意见内容',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text: '提交',
						ui: 'confirm',
						id: 'ideasubmitid',
						name: 'ideasubmitname'
					},
				]
			},
		]
	}
});
Ext.define('eapp.view.zhihuiyanlu.IdeaList',
{
	extend:'Ext.dataview.List',
	xtype:'idealistview',
	
	config:
	{
		 title:'意见列表',
	     iconCls: 'info',
	     cls:'textcolor7',
	     
	     store:null,
//	     items:
//	     [
//		         {
//		 			xtype: 'toolbar',
//		 			ui:'neutral',
//		 			docked: 'bottom',
//		 			scrollable: false,
//		 		},
//	     ],
	    
	     itemTpl: 
			[
				'<div style="width: 98%">',
				'	<div class="left">',
				'		<div><span>{userName}</span></div>',
				'		<div><span>{commitDate}</span></div>',
				'	</div>',
				'	<div class="clear"></div>',
				'</div>',
			],
	},
	
	/**
	 * 显示意见列表
	 */
	init:function()
	{
		var me = this;
		var ideaService = Ext.create('eapp.business.IdeaService');
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		ideaService.findidea(userid,0,1,10,
		{
			success:function(jsonData)
			{
				console.log(jsonData);
				console.log(jsonData.result);
				var store = Ext.create('eapp.store.Idea',{data: jsonData.result});
				console.log(store);
				me.setStore(store);
			},
			failure:function(message)
			{
				console.log(message);
			}
		});
	},
});
Ext.define('eapp.view.zhihuiyanlu.IdeaPage', 
{
	extend: 'Ext.Container',
	xtype: 'ideapageview',

	config: 
	{
		pageName: 'indexpageview',
		title: '意见建议',
		layout:'fit',
		items: 
		[
        	{
				xtype: 'formpanel',
				items:
				[
					{
						xtype: 'spacer',
						cls: 'margin3'
					},
			       {
				   		xtype: 'fieldset',
						items:
						[
							//意见建议
							{
								xtype: 'labelEx',
								id:'aboutuspage',
								name:'aboutuspage',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//意见建议列表
							{
								xtype: 'labelEx',
							    id:'suggestionpage',
								name:'suggestionpage',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   }
				]
			}	
    	]
	},

	initialize: function()
	{
		this.callParent();
	},
	
	/**
	 * 
	 */
	init:function()
	{
		var me = this;
		var aboutuspage = me.down('labelEx[name="aboutuspage"]');
		var suggestionpage = me.down('labelEx[name="suggestionpage"]');
		
		aboutuspage.setContent('<div><div class="left myindexitem textcolor4 margin2">提交意见</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
		suggestionpage.setContent('<div><div class="left myindexitem textcolor4 margin2">建议列表</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
	},
});
Ext.define('eapp.view.gongjianhexie.VolunteerPage', 
{
	extend: 'Ext.Container',
	xtype: 'volunteerpageview',

	config: 
	{
		title:'个人帐号',
		layout: 'fit',
		items:
		[
			{
				xtype:'formpanel',
				items:
				[
					{
						xtype: 'container',
						items:
						[
							{
					            xtype: 'container',
								id: 'namecontainerid',
								width: null
					        },
						]
					},
					{
						xtype: 'fieldset',
						items:
						[
						 	//社区网格
							{
								xtype: 'labelEx',
								id: 'shequwanggeid',
								name: 'shequwanggename',
								cls: 'line2',
								dataValue: 'shequwangge'
							},
						]
					},
					 {
				   		xtype: 'fieldset',
						items:
						[
							//申请格长
							{
								xtype: 'labelEx',
							    id:'shenqinggezhangid',
								name:'shenqinggezhangname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//我的网格
							{
								xtype: 'labelEx',
							    id:'wodewanggeid',
								name:'wodewanggename',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//提交意见
							{
								xtype: 'labelEx',
							    id:'tijaoyijianid',
								name:'tijiaoyijianname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//格长风采
							{
								xtype: 'labelEx',
							    id:'gezhangfengcaiid',
								name:'gezhagnfengcainame',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//格长投票
							{
								xtype: 'labelEx',
							    id:'gezhangtoupiaoid',
								name:'gezhangtoupiaoname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				]
			}
		]
	},
	
	/**
	 * 显示用户信息
	 */
	init:function()
	{
		//this.element.dom.style.webkitTransform = '';
		
		var me = this;
		// 社区网格
		var myWeibo = Ext.ComponentQuery.query('#shequwanggeid',me)[0];
		// 申请格长
		var shenqinggezhangname = me.down('labelEx[name="shenqinggezhangname"]');
		// 我的网格
		var wodewanggename = me.down('labelEx[name="wodewanggename"]');
		// 提交意见
		var tijiaoyijianname = me.down('labelEx[name="tijiaoyijianname"]');
		// 格长风采
		var gezhagnfengcainame = me.down('labelEx[name="gezhagnfengcainame"]');
		// 格长投票
		var gezhangtoupiaoname = me.down('labelEx[name="gezhangtoupiaoname"]');
		
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">社区网格</div></div>');
		shenqinggezhangname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">申请格长</div></div>');
		wodewanggename.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">我的网格</div></div>');
		tijiaoyijianname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">提交意见</div></div>');
		gezhagnfengcainame.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">格长风采</div></div>');
		gezhangtoupiaoname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">格长投票</div></div>');
	}
});
Ext.define('eapp.view.gongjianhexie.AddIdea',
{
	extend: 'Ext.Container',
	xtype:'addideaView',
	
	config:
	{
		title: '提交意见',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title:'提交意见',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'ideausernameid',
								name:'ideausername',
								placeHolder: '请输入用户姓名',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textfield',
								id: 'ideaphoneid',
								name:'ideaphonename',
								placeHolder: '请输入电话',
								lable:'电话',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'ideaemailid',
								name:'ideamailname',
								placeHolder: '请输入email',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'remarkContent',
								placeHolder: '请输入意见内容',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text: '提交',
						ui: 'confirm',
						id: 'ideasubmitid',
						name: 'ideasubmitname'
					},
				]
			},
		]
	}
});
Ext.define('eapp.view.gongjianhexie.ApplyVolunteer',
{
	extend: 'Ext.Container',
	xtype:'applyvolunteerview',
	
	config:
	{
		title: '申请格长',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title:'选择格长申请网格的编号',
						id:'checkboxs',
						items: []
					},
					{
						xtype: 'button',
						text:'下一步',
						ui: 'confirm',
						id: 'nextbuttonid',
						name: 'nextbuttonname',
					},
//					{
//						xtype: 'toolbar',
//				        docked: 'bottom',
//						//xtype: 'button',
//						//ui: 'confirm',
//						//id: 'nextbuttonid',
//						//name: 'nextbuttonname',
//						items: 
//						[
//			                { xtype: 'spacer' },
//			                {
//			                    text: '下一步',
//			                    handler: function() 
//			                    {
//			                        var form = Ext.ComponentQuery.query('#checkboxs',this)[0];
//			                        console.log(form);
//			                            values = form.getValues();
//
//			                        Ext.Msg.alert(null,
//			                            "Tomato: " + ((values.tomato) ? "yes" : "no") +
//			                            "<br />Salami: " + ((values.salami) ? "yes" : "no")
//			                        );
//			                    }
//			                },
//			                { xtype: 'spacer' }
//				        ]
//					},
				]
			},
		]
	},
	
	/**
	 * 查询所有编号列表
	 */
	init:function()
	{
		
		var me = this;
		var checkitems = Ext.ComponentQuery.query('#checkboxs',me)[0];
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var volunteerService = Ext.create('eapp.business.VolunteerService');
		volunteerService.findAll(
		{
			success:function(jsonData)
			{
				var checkboxlist = jsonData.result;
				var checkboxs = [];
				for(var i = 0; i < checkboxlist.length;i++)
				{
					var checkbox = Ext.create('Ext.field.Checkbox',
					{
						xtype:'checkboxfield',
						name : 'checkbox'+i,
						label: checkboxlist[i].gridnum,
						value: 'tomato',
						//checked: false
					});
					checkboxs.push(checkbox);
				}
				
				checkitems.setItems(checkboxs);
				Ext.Viewport.setMasked(false);
			},
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});
Ext.define('eapp.view.gongjianhexie.ApplyVolunteerTow',
{
	extend: 'Ext.Container',
	xtype:'applyvolunteertowview',
	
	config:
	{
		title: '申请格长',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						id:'checkboxs',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'nonumberid',
								name:'nonumbername',
								placeHolder: '网格编号',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								disabled: true
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'content',
								id: 'remarkContentid',
								placeHolder: '请输入意见内容',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text:'提交',
						ui: 'confirm',
						id: 'addsubmitid',
						name: 'addsublmitname',
					},
				]
			},
		]
	},
	
	/**
	 * 查询所有编号列表
	 */
	init:function()
	{
		
		var me = this;
		var checkitems = Ext.ComponentQuery.query('#checkboxs',me)[0];
		
		
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var volunteerService = Ext.create('eapp.business.VolunteerService');
		volunteerService.findAll(
		{
			success:function(jsonData)
			{
				console.log(jsonData);
				var checkboxlist = jsonData.result;
				var checkboxs = [];
				for(var i = 0; i < checkboxlist.length;i++)
				{
					var checkbox = Ext.create('Ext.field.Checkbox',
					{
						xtype:'checkboxfield',
						name : 'checkbox'+i,
						label: checkboxlist[i].gridnum,
						value: 'tomato',
						//checked: false
					});
					checkboxs.push(checkbox);
				}
				
				checkitems.setItems(checkboxs);
				Ext.Viewport.setMasked(false);
			},
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});
Ext.define('eapp.view.wenxinjiayuan.UnemPage', 
{
	extend: 'Ext.Container',
	xtype: 'unempageview',

	config: 
	{
		pageName: 'indexpageview',
		title: '温情家园',
		layout:'fit',
		items: 
		[
        	{
				xtype: 'formpanel',
				items:
				[
					{
						xtype: 'spacer',
						cls: 'margin3'
					},
			       {
				   		xtype: 'fieldset',
						items:
						[
							//失业提交
							{
								xtype: 'labelEx',
								id:'aboutuspage',
								name:'unemsubmitname',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//我的信息
							{
								xtype: 'labelEx',
							    id:'suggestionpage',
								name:'unemmyinfoname',
								cls: 'line2 padding5',
								dataValue: 'settings'
							},
						]
				   }
				]
			}	
    	]
	},

	initialize: function()
	{
		this.callParent();
	},
	
	/**
	 * 
	 */
	init:function()
	{
		var me = this;
		//失业提交
		var aboutuspage = me.down('labelEx[name="unemsubmitname"]');
		//我的信息
		var suggestionpage = me.down('labelEx[name="unemmyinfoname"]');
		
		aboutuspage.setContent('<div><div class="left myindexitem textcolor4 margin2">失业提交</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
		suggestionpage.setContent('<div><div class="left myindexitem textcolor4 margin2">我的信息</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');
	},
});
Ext.define('eapp.view.wenxinjiayuan.AddUnem',
{
	extend: 'Ext.Container',
	xtype:'addunemview',
	
	config:
	{
		title: '失业提交',
		layout: 'fit',
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title:'失业信息提交',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'unemusernameid',
								name:'unemusername',
								placeHolder: '请输入用户姓名',
								lable:'用户名',
								autoCapitalize: true,
								clearIcon: true,
								// disabled: true
							},
							{
								xtype: 'textfield',
								id: 'unemphoneid',
								name:'unemphonename',
								placeHolder: '请输入电话',
								lable:'电话',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'unememailid',
								name:'unememailname',
								placeHolder: '请输入email',
								lable:'email',
								autoCapitalize: true,
								clearIcon: true
							},
							
							{
								xtype: 'textfield',
								id: 'unemhomeid',
								name:'unemhomename',
								placeHolder: '家庭状况',
								lable:'家庭状况',
								autoCapitalize: true,
								clearIcon: true
							},

							{
								xtype: 'textfield',
								id: 'unemjiuyeid',
								name:'unemjiuyename',
								placeHolder: '就业意向',
								lable:'就业意向',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textfield',
								id: 'unempaddressid',
								name:'unemaddressname',
								placeHolder: '家庭住址',
								lable:'家庭住址',
								autoCapitalize: true,
								clearIcon: true
							},
							{
								xtype: 'textareafield',
								maxRows: 2,
								name: 'content',
								id: 'remarkontentid',
								placeHolder: '请输入就业意向',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype:'button',
						text:'提交',
						ui: 'confirm',
						id:'tijiaobuttonid',
						name:'tijiaobuttonname',
					}
				]
			},
		]
	}
});
/**
 * 我的信息页面
 */
Ext.define('eapp.view.wenxinjiayuan.MyUnem',
{
   
    extend: 'Ext.dataview.List',
    xtype:'myunemview',
    
    config: 
    {        
        title:'失业信息列表',
        iconCls: 'info',
        cls:'textcolor7',
        store:null,
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{username}</span></div>',
			'		<div><span>{commitDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示失业信息列表
     */
    init:function(jsonData)
    {
    	var me = this;
    	if(jsonData.result.length <= 0)
    	{
    		eapp.view.Dialogs.showAlert('智慧潘家园','没有数据');
    		return ;
    	}
    	var store = Ext.create('eapp.store.Unemploymentregistration', {data: jsonData.result});
    	me.setStore(store);
    },
});
Ext.define('eapp.view.wenxinjiayuan.UnemDetail', 
{
	extend: 'Ext.DataView',
	xtype: 'unemdetailview',

	config: 
	{
		title:'我的信息',
		pageNo: 1, // 当前页码
		totalPages: 1, // 总页数
		store: null,
		items:
		[
		 	
		],
		//itemTpl: ['{content}']
		//itemTpl:[ '<div class="contact"><div class="left"><img src="images/noface.png" /></div><div class="left">我 {unempReplyContent}</div><div class="clear"></div></div>']
		itemTpl: 
		[
			'<div>',
			'	<div class="left width5">',
			//'		<img style="width:60px; height:60px;" src="images/noface.png" />',
			'	</div>',
			'	<div class="left width6">&nbsp;</div>',
			'	<div class="left">',
			'		<div class="width5">{replyName}</div>',
			'		<div class="triangle-border top width7">',
			'			<div id="" style="word-break:break-all; width:200px;">{unempReplyContent}</div>',
			'			<div class="margin1 fontsize1 textcolor2">',
			'				<div class="right">{replyDate}</div>',
			'				<div class="clear"></div>',
			'			</div>',
			'		</div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
//		listeners:
//		{
//			'itemswipe': function(dataview, index, target, record, e, eOpts)
//			{
//				if(e.direction == 'right')
//				{
//					dataview.fireEvent('delweibo',dataview,index, record);
//				}
//			},
//		}
	},
	
	// 显示失业提交信息和回复信息
	init:function(record)
	{
		var me = this;
		console.log(record);
		var unempRegid = record.get('unempRegid');
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var unemploymentregistrationService = Ext.create('eapp.business.UnemploymentregistrationService');
		/**
		 * unempRegid:回复者的id
		 * userid:用户id
		 */
		unemploymentregistrationService.getbyid(userid,
		{			
			/**
			 * jsonData 服务期端返回的数据
			 */
			success:function(jsonData)
			{
				console.log(jsonData);
				var store = Ext.create('eapp.store.Unemploymentreply', {data: jsonData.result});
				me.setStore(store);
				Ext.Viewport.setMasked(false);
			},
			/**
			 * message返回错误的信息
			 */
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});

Ext.define('eapp.view.duocaijiayuan.GroupPage', 
{
	extend: 'Ext.Container',
	xtype: 'grouppageview',

	config: 
	{
		title:'多彩家园',
		layout: 'fit',
		items:
		[
			{
				xtype:'formpanel',
				items:
				[
					{
						xtype: 'container',
						items:
						[
							{
					            xtype: 'container',
								id: 'namecontainerid',
								width: null
					        },
						]
					},
					{
						xtype: 'fieldset',
						items:
						[
						 	//创建活动群
							{
								xtype: 'labelEx',
								id: 'createactivityid',
								name: 'createactivityname',
								cls: 'line2',
								dataValue: 'shequwangge'
							},
						]
					},
					 {
				   		xtype: 'fieldset',
						items:
						[
							//关注或者取消关注群
							{
								xtype: 'labelEx',
							    id:'gzactivityid',
								name:'gzactivityname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//发起活动
							{
								xtype: 'labelEx',
							    id:'fqactivityid',
								name:'fqactivityname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				   {
				   		xtype: 'fieldset',
						items:
						[
							//查看活动
							{
								xtype: 'labelEx',
							    id:'ckactivityid',
								name:'ckactivityname',
								cls: 'line2 padding5',
								dataValue: 'volunteerpageview'
							},
						]
				   },
				]
			}
		]
	},
	
	/**
	 * 显示用户信息
	 */
	init:function()
	{
		//this.element.dom.style.webkitTransform = '';
		
		var me = this;
		// 创建活动群
		var myWeibo = Ext.ComponentQuery.query('#createactivityid',me)[0];
		// 群列表
		var shenqinggezhangname = me.down('labelEx[name="gzactivityname"]');
		// 发起活动
		var wodewanggename = me.down('labelEx[name="fqactivityname"]');
		// 查看活动
		var tijiaoyijianname = me.down('labelEx[name="ckactivityname"]');
		
		myWeibo.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">创建活动群</div></div>');
		shenqinggezhangname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">群列表</div></div>');
		wodewanggename.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">发起活动</div></div>');
		tijiaoyijianname.setContent('<div><div class="left height1 margin2"></div><div class="left myindexitem textcolor4 margin10">查看活动</div></div>');
	}
});
Ext.define('eapp.view.duocaijiayuan.AddGroup',
{
	extend: 'Ext.Container',
	xtype:'addgroupview',
	
	config:
	{
		title: '申请创建活动群',
		layout: 'fit',
		isautoFlag:true,
		isshowFlag:true,
		items:
		[
			{
				xtype: 'formpanel',
				items: 
				[
				 	{
						xtype: 'fieldset',
						defaults: 
						{
							labelWidth: '85px'
						},
						title:'申请创建活动群',
						items: 
						[
							{
								xtype: 'textfield',
								id: 'groupid',
								name:'groupname',
								placeHolder: '请输入群名称',
								lable:'群名称',
								autoCapitalize: true,
								clearIcon: true,
							},
							{
								xtype: 'textareafield',
								maxRows: 4,
								name: 'groupcontentname',
								id: 'groupcontentid',
								placeHolder: '请输入群说明',
								height: '150px',
								width: '100%',
								cls: 'margin1',
								clearIcon: true
							},
						]
					},
					{
						xtype: 'button',
						text: '提交',
						ui: 'confirm',
						id: 'groupsubmitid',
						name: 'groupsubmitname'
					},
				]
			},
		]
	}
});
Ext.define('eapp.view.about.TongZhiGongGao',
{
	extend:'Ext.dataview.List',
	xtype:'tongzhigonggaolist',
	
	config:
	{
		title:'通知公告',
		iconCls: 'star',
		cls:'textcolor7',
		store:null,
		//layout: 'fit',
		itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}呵呵呵</span></div>',
			'		<div><span>{materialPublicDate}哈哈哈</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
	},

	/**
	 * 显示通知公告
	 */
	init:function(jsonData)
	{
		var me = this;
		var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
		console.log(store);
    	me.setStore(store);
	},
});
Ext.define('eapp.view.about.BianMinXinXi',
{
	extend:'Ext.dataview.List',
	xtype:'bianminxinxilist',
	config:
	{
		title:'政务服务',
		iconCls: 'team',
		cls:'textcolor7',
		stroe:null,
		//layout: 'fit',
		itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}呵呵呵</span></div>',
			'		<div><span>{materialPublicDate}哈哈哈</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
	},
	
	/**
	 * 显示便民信息
	 */
	init:function(jsonData)
	{
		var me = this;
		var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
		console.log(store);
    	me.setStore(store);
	}
});
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

Ext.define('eapp.view.about.NewsList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'newsList',
    
    config: 
    {        
        title:'新闻动态',
        iconCls: 'info',
        cls:'textcolor7',
        //store:null,
        //layout: 'fit',
        store: {
            fields: ['title', 'content','date'],
            data:
            [
              {title: '什么情况',  content: '<p>中国搞死日本</p>',date:'2012/07/12'},
              {title: '搞啥',   content: '中国搞死美国',date:'2012/07/12'},
              {title: '啥意思', content: '中国搞死菲利宾',date:'2012/07/12'},
              {title: '搞不搞', content: '中国搞死韩国',date:'2012/07/12'},
              {title: '汗，不好搞',   content: '中国搞死阿三',date:'2012/07/12'}
             ]
         },
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{title}</span></div>',
			'		<div><span>{content}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示新闻动态列表
     */
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
    	console.log(store);
    	me.setStore(store);
    },
});
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
			ideaView:'ideaView',
			idealistview:'idealistview',
			indexpage:'indexpage',
			ideapageview:'ideapageview',
			volunteerpageview:'volunteerpageview',
			unempageview:'unempageview',
			grouppageview:'grouppageview',
			
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
		 * 查询新闻动态
		 */
		setTimeout(function()
		{
			Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
			var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
			integratematerialService.findlist(1,2,1,
			{
				success: function(jsonData)
				{
					integratematerialList.init(jsonData);
				},
				failure: function(message)
				{
					Ext.Viewport.setMasked(false);
					console.log(message);
				}
			});
		}, 1);
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
		if(integratemateriallisttow == null || integratematerialList == 'undefined')
		{
			integratemateriallisttow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialList');
		}
		
		/**
		 * 查询新闻动态
		 */
		setTimeout(function()
		{
			Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
			var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
			integratematerialService.findlist(2,2,1,
			{
				success: function(jsonData)
				{
					integratemateriallisttow.init(jsonData);
				},
				failure: function(message)
				{
					Ext.Viewport.setMasked(false);
					console.log(message);
				}
			});
		}, 1);
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
	 * 红色堡垒
	 */
	onMainMenuTaped3:function()
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
	
	/**
	 * 社工加油站
	 */
	onMainMenuTaped4:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','社工加油站');
	},
	
	/**
	 * 智慧言路
	 */
	onMainMenuTaped5:function()
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
	 * 智慧试听
	 */
	onMainMenuTaped6:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','智慧试听');
	},
	
	/**
	 * 共建和谐
	 */
	onMainMenuTaped7:function()
	{
		// eapp.view.Dialogs.showAlert('智慧潘家园','共建和谐');
		var me = this;
		
		var volunteerpageview = me.getVolunteerpageview();
		if(volunteerpageview == null || volunteerpageview == 'undefined')
		{
			volunteerpageview = Ext.create('eapp.view.gongjianhexie.VolunteerPage');
		}
		volunteerpageview.init();
		
//		var ideapageview = me.getIdeapageview();
//		if(ideapageview == null || ideapageview == 'undefined')
//		{
//			ideapageview = Ext.create('eapp.view.zhihuiyanlu.IdeaPage');
//		}
//		ideapageview.init();
//		me.getMainview().getNavigationBar().show();
//		me.getMainview().push(ideapageview);
		
		me.getMainview().getNavigationBar().show();
		me.getMainview().push(volunteerpageview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'volunteerpageview')
		{
			eapp.app.pageStack.push('volunteerpageview');
		}
	},
	
	/**
	 * 温情家园
	 */
	onMainMenuTaped8:function()
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
	onMainMenuTaped9:function()
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
	onMainMenuTaped10:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','和谐家园');
	},
	
	/**
	 * 智慧服务
	 */
	onMainMenuTaped11:function()
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
	onMainMenuTaped12:function()
	{
		eapp.view.Dialogs.showAlert('智慧潘家园','智慧DIY');
	},
});
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

/**
 * 智慧之窗控制层
 */
Ext.define('eapp.controller.Integratematerial', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallist:'integratemateriallist',
			integratematerialdetail:'integratematerialdetail',
			newsbutton:{selector: 'integratemateriallist toolbar button[name=newsbutton]'},
			gonggaobutton:{selector: 'integratemateriallist toolbar button[name=gonggaobutton]'},
			fuwubutton:{selector: 'integratemateriallist toolbar button[name=fuwubutton]'},
		},

		control:
		{
			newsbutton:
			{
				tap:'OnNewsbuttonTap',
			},
			gonggaobutton:
			{
				tap:'OnGonggaobuttonTap',
			},
			fuwubutton:
			{
				tap:'OnFuwubuttonTap',
			},
			integratemateriallist:
			{
				itemtap:'OnItemTap',
			}
		}
	},
	
	/**
	 * 点击列表
	 */
	OnItemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		var integratematerialdetail = me.getIntegratematerialdetail();
		if(integratematerialdetail == null || integratematerialdetail == 'undefined')
		{
			integratematerialdetail = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialDetail');
		}
		integratematerialdetail.init(record);
		me.getMainview().push(integratematerialdetail);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratematerialdetail')
		{
			eapp.app.pageStack.push('integratematerialdetail');
		}
	},
	
	/**
	 * 点击新闻动态按钮
	 */
	OnNewsbuttonTap:function()
	{
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		if(integratematerialview == null || integratematerialview == 'undefined')
		{
			integratematerialview = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(1,2,1,
		{
			success: function(jsonData)
			{
				integratematerialview.init(jsonData);
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
	 * 点击通知公告按钮
	 */
	OnGonggaobuttonTap:function()
	{
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		if(integratematerialview == null || integratematerialview == 'undefined')
		{
			integratematerialview = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(1,2,2,
		{
			success: function(jsonData)
			{
				integratematerialview.init(jsonData);
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
	 * 点击政务服务按钮
	 */
	OnFuwubuttonTap:function()
	{
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		if(integratematerialview == null || integratematerialview == 'undefined')
		{
			integratematerialview = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(1,2,3,
		{
			success: function(jsonData)
			{
				integratematerialview.init(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure: function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});
/**
 * 幸福家园控制层
 */
Ext.define('eapp.controller.Integratematerialtow', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallisttow:'integratemateriallisttow',
			integratematerialdetailtow:'integratematerialdetailtow',
			newsbutton:{selector: 'integratemateriallisttow toolbar button[name=newsbutton]'},
			gonggaobutton:{selector: 'integratemateriallisttow toolbar button[name=gonggaobutton]'},
			fuwubutton:{selector: 'integratemateriallisttow toolbar button[name=fuwubutton]'},
		},

		control:
		{
			newsbutton:
			{
				tap:'OnNewsbuttonTap',
			},
			gonggaobutton:
			{
				tap:'OnGonggaobuttonTap',
			},
			fuwubutton:
			{
				tap:'OnFuwubuttonTap',
			},
			integratemateriallisttow:
			{
				itemtap:'OnItemTap',
			}
		}
	},
	
	/**
	 * 点击列表
	 */
	OnItemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		var integratematerialdetailtow = me.getIntegratematerialdetailtow();
		if(integratematerialdetailtow == null || integratematerialdetail == 'undefined')
		{
			integratematerialdetailtow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialDetail');
		}
		integratematerialdetailtow.init(record);
		me.getMainview().push(integratematerialdetailtow);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratematerialdetailtow')
		{
			eapp.app.pageStack.push('integratematerialdetailtow');
		}
	},
	
	/**
	 * 点击新闻动态按钮
	 */
	OnNewsbuttonTap:function()
	{
		var me = this;
		var integratematerialdetailtow = me.getIntegratematerialdetailtow();
		if(integratematerialdetailtow == null || integratematerialview == 'undefined')
		{
			integratematerialdetailtow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(2,2,1,
		{
			success: function(jsonData)
			{
				integratematerialdetailtow.init(jsonData);
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
	 * 点击通知公告按钮
	 */
	OnGonggaobuttonTap:function()
	{
		var me = this;
		var integratematerialdetailtow = me.getIntegratematerialdetailtow();
		if(integratematerialdetailtow == null || integratematerialview == 'undefined')
		{
			integratematerialdetailtow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(2,2,2,
		{
			success: function(jsonData)
			{
				integratematerialdetailtow.init(jsonData);
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
	 * 点击政务服务按钮
	 */
	OnFuwubuttonTap:function()
	{
		var me = this;
		var integratematerialdetailtow = me.getIntegratematerialdetailtow();
		if(integratematerialdetailtow == null || integratematerialview == 'undefined')
		{
			integratematerialdetailtow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialList');
		}
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		integratematerialService.findlist(2,2,3,
		{
			success: function(jsonData)
			{
				integratematerialdetailtow.init(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure: function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});
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
		}
		if(userName == null || userName == 'undefined',userName.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','电话不能为空!~');
		}
		if(email == null || email == 'undefined' || email.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','email不能为空!~');
		}
		if(ideaContent == null || ideaContent == 'undefined' || ideaContent.lengthj <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','意见内容不能为空!~');
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
/**
 * 共建和谐控制层
 */
Ext.define('eapp.controller.Volunteer',
{
	extend:'Ext.app.Controller',
	
	config:
	{
		refs: 
		{
			mainview: 'mainview',
			volunteerpageview:'volunteerpageview',
			addideaView:'addideaView',
			applyvolunteerview:'applyvolunteerview',
			applyvolunteertowview:'applyvolunteertowviewq',
			
			shequwanggename:{selector: 'volunteerpageview formpanel fieldset labelEx[name=shequwanggename]'},
			shenqinggezhangname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=shenqinggezhangname]'},
			wodewanggename:{selector: 'volunteerpageview formpanel fieldset labelEx[name=wodewanggename]'},
			tijiaoyijianname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=tijiaoyijianname]'},
			gezhagnfengcainame:{selector: 'volunteerpageview formpanel fieldset labelEx[name=gezhagnfengcainame]'},
			gezhangtoupiaoname:{selector: 'volunteerpageview formpanel fieldset labelEx[name=gezhangtoupiaoname]'},
			
			nextbuttonname:{selector: 'applyvolunteerview formpanel button[name=nextbuttonname]'},
			
			addsublmitname:{selector: 'applyvolunteertowview formpanel button[name=addsublmitname]'},
		},
	
		control:
		{
			shequwanggename:
			{
				tap:'OnShequwanggenameTap',
			},
			shenqinggezhangname:
			{
				tap:'OnShenqinggezhangnameTap',
			},
			wodewanggename:
			{
				tap:'OnWodewanggenameTap',
			},
			tijiaoyijianname:
			{
				tap:'OnTijiaoyijiannameTap',
			},
			gezhagnfengcainame:
			{
				tap:'OnGezhagnfengcainameTap',
			},
			gezhangtoupiaoname:
			{
				tap:'OnGezhangtoupiaonameTap',
			},
			nextbuttonname:
			{
				tap:'OnNextbuttonnameTap'
			},
			addsublmitname:
			{
				tap:'OnAddsublmitnameTap',
			}
		}
	},
	
	/**
	 * 提交格长申请信息
	 */
	OnAddsublmitnameTap:function()
	{
		var me = this;
		var applyvolunteertowview = me.getApplyvolunteertowview();
		// 网格编号
		var number = Ext.ComponentQuery.query('#nonumberid',applyvolunteertowview)[0].getValue();
		// 意见内容
		var context = Ext.ComponentQuery.query('#remarkContentid',applyvolunteertowview)[0].getValue();
		
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var volunteerServiece = Ext.create('eapp.business.VolunteerService');
		volunteerServiece.addVolunteer(userid,number,context,
		{
			success:function(jsonData)
			{
				if(jsonData == 'OK')
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请成功!~');
				}else
				{
					eapp.view.Dialogs.showAlert('智慧潘家园','申请失败!~');
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
	 * 下一步
	 */
	OnNextbuttonnameTap:function()
	{
		var me = this;
		var applyvolunteerview = me.getApplyvolunteerview();
		if(applyvolunteerview == null || applyvolunteerview == 'undefined')
		{
			applyvolunteerview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteer');
		}
		var checkboxs = Ext.ComponentQuery.query('#checkboxs',applyvolunteerview)[0];
		var labels = '';
		for(var i = 0;i<checkboxs.getItems().length-1;i++)
		{
			if(checkboxs.getItems().items[i+1].getChecked())
			{
				 labels += checkboxs.getItems().items[i+1].getLabel()+',';
			}
		}
		if(labels == "" || labels.length <= 0)
		{
			eapp.view.Dialogs.showAlert('智慧潘家园','请选择网格编号!~');
			return;
		}
		
		var  applyvolunteertowview = me.getApplyvolunteertowview();
		if(applyvolunteertowview == null || applyvolunteertowview == '')
		{
			applyvolunteertowview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteerTow');
		}
		Ext.ComponentQuery.query('#nonumberid', applyvolunteertowview)[0].setValue(labels);
		me.getMainview().push(applyvolunteertowview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'applyvolunteertowview')
		{
			eapp.app.pageStack.push('applyvolunteertowview');
		}
	},
	
	/**
	 *  社区网格
	 */
	OnShequwanggenameTap:function()
	{
		alert(0);
	},
	
	/**
	 * 申请格长
	 */
	OnShenqinggezhangnameTap:function()
	{
		var me = this;
		var applyvolunteerview = me.getApplyvolunteerview();
		if(applyvolunteerview == null || applyvolunteerview == 'undefined')
		{
			applyvolunteerview = Ext.create('eapp.view.gongjianhexie.ApplyVolunteer');
		}
		applyvolunteerview.init();
		me.getMainview().push(applyvolunteerview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'applyvolunteerview')
		{
			eapp.app.pageStack.push('applyvolunteerview');
		}
	},
	
	/**
	 * 我的网格
	 */
	OnWodewanggenameTap:function()
	{
		alert('我的网格');
	},
	
	/**
	 * 提交建议
	 */
	OnTijiaoyijiannameTap:function()
	{
		var me = this;
		var addideaView = me.getAddideaView();
		if(addideaView == null || addideaView == 'undefined')
		{
			addideaView = Ext.create('eapp.view.gongjianhexie.AddIdea');
		}
		me.getMainview().push(addideaView);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'addideaview')
		{
			eapp.app.pageStack.push('addideaview');
		}
	},
	
	/**
	 * 格长风采
	 */
	OnGezhagnfengcainameTap:function()
	{
		alert('格长风采');
	},
	
	/**
	 * 格长投票
	 */
	OnGezhangtoupiaonameTap:function()
	{
		alert('格长投票');
	}
});
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
		var unempersonal = Ext.ComponentQuery.query('#unempersonalid', addunemview)[0].getValue();
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
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var unemploymentregistrationService = Ext.create('eapp.business.UnemploymentregistrationService');
		unemploymentregistrationService.findunem(userid,
		{
			success:function(jsonData)
			{
				myunemview.init(jsonData);
				Ext.Viewport.setMasked(false);
			},
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		}); 
		me.getMainview().push(myunemview);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'myunemview')
		{
			eapp.app.pageStack.push('myunemview');
		}
	}
});
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
			
			
			createactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=createactivityname]'},
			gzactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=gzactivityname]'},
			fqactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=fqactivityname]'},
			ckactivityname:{selector: 'grouppageview formpanel fieldset labelEx[name=ckactivityname]'},
			
			groupsubmitname:{selector: 'addgroupview formpanel button[name=groupsubmitname]'},
			
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
			}
		},
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
					eapp.view.Dialogs.showAlert('智慧潘家园','申请创建活动群成功!~');
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
	
	// 查询群列表
	OnGzactivitynameTap:function()
	{
		alert(1)
	},
	
	// 发起活动
	OnFqactivitynameTap:function()
	{
		alert(2)
	},
	
	// 查看活动
	OnCkactivitynameTap:function()
	{
		alert(3);
	}
});
/**
 * 资料
 */
Ext.define('eapp.store.Integratematerial',
{
	extend:'Ext.data.Store',
	
	config:
	{
	 	model:'eapp.model.Integratematerial'
	}
});
Ext.define('eapp.store.Residentuser',
{
	extend :'Ext.data.Store',
	
	config:
	{
		model:'eapp.model.Residentuser',
	}
});
Ext.define('eapp.store.Idea',
{
	extend:'Ext.data.Store',
	
	config:
	{
		model:'eapp.model.Idea',
	}
});
Ext.define('eapp.store.Unemploymentregistration',
{
	extend :'Ext.data.Store',
	
	config:
	{
		model:'eapp.model.Unemploymentregistration',
	}
});
Ext.define('eapp.store.Unemploymentreply',
{
	extend :'Ext.data.Store',
	
	config:
	{
		model:'eapp.model.Unemploymentreply',
	}
});


Ext.application(
{
	name: 'eapp',
	glossOnIcon: false,
	mapEngine: 'google',
	viewport: 
	{
		autoMaximize: true, 
	},
	
	requires: 
	[
	 	'eapp.util.GlobalData', 
	 	'eapp.view.Dialogs',
	 	'eapp.component.LabelEx', 
	 	
	 	'eapp.business.BaseService', 
	 	'eapp.business.IntegratematerialService', 
	 	'eapp.business.ResidentuserService',
	 	'eapp.business.UnemploymentregistrationService',
	 	'eapp.business.VolunteerService',
	 	'eapp.business.GroupService',
	],
	
	models: 
	[
	 	'eapp.model.Integratematerial',
	 	'eapp.model.Residentuser',
	 	'eapp.model.Idea',
	 	'eapp.model.Unemploymentregistration',
	 	'eapp.model.Unemploymentreply',
	],
	
	stores:
	[
	 	'eapp.store.Integratematerial',
	 	'eapp.store.Residentuser',
	 	'eapp.store.Idea',
	 	'eapp.store.Unemploymentregistration',
	 	'eapp.store.Unemploymentreply',
	],

	views: 
	[
	 	'eapp.view.Main', 
	 	'eapp.view.Cell12', 
	 	'eapp.view.Login', 
	 	'eapp.view.IntegrateMaterial',
	 	'eapp.view.Register', 
	 	'eapp.view.My', 
	 	'eapp.view.SetPersonal', 
	 	
	 	// 智慧之窗
	 	'eapp.view.zhihuizhichuang.IntegratematerialList',
	 	'eapp.view.zhihuizhichuang.IntegratematerialDetail',
	 	
	 	// 幸福家园
	 	'eapp.view.xinfujiayuan.IntegratematerialList',
	 	'eapp.view.xinfujiayuan.IntegratematerialDetail',
	 	
	 	// 智慧言路
	 	'eapp.view.zhihuiyanlu.Idea',
	 	'eapp.view.zhihuiyanlu.IdeaList',
	 	'eapp.view.zhihuiyanlu.IdeaPage', 
	 	
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
	 	
	 	'eapp.view.about.TongZhiGongGao',
	 	'eapp.view.about.BianMinXinXi',
	 	'eapp.view.about.IndexPage',
	 	'eapp.view.about.NewsList',
	],
	
	controllers: 
	[
	 	'eapp.controller.Cell12',
	 	'eapp.controller.Main',
	 	'eapp.controller.Integratematerial', 
	 	'eapp.controller.Integratematerialtow', 
	 	'eapp.controller.Login',
	 	'eapp.controller.My',
	 	'eapp.controller.Idea',
	 	'eapp.controller.Volunteer',
	 	'eapp.controller.Unemploymentregistration',
	 	'eapp.controller.Group',
	],
	
	appData: null,
	pageStack:[],
	

	launch: function() 
    {
		var mainView = Ext.create('eapp.view.Main');
		Ext.Viewport.add(mainView);
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
