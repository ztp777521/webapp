/**
 * 此类为单例类，用来临时保存数据或永久保存数据
 */
Ext.define('wecity.util.GlobalData', 
{
	singleton: true,
	
	statics: 
	{
         currentFlag: 100, // 标记当前打开的是“附近”还是“别处”
		 //pageStack:['main'], // 记录用户的访问路径
		 enabledCityStore: null, //缓存已开通城市 
		 nearbyKeywords: null, // 缓存附近页面的关键词
		 elsewhereKeywords: null, // 缓存别处页面的关键词
		 distance: 5000, // 搜索时的默认距离
		 citylistOk:false,
		 baiduGeoResult: null,
		 loginType: null,
		 showParterner: false,
		 
		 currentUser: null,
		 
		 elsewhere_latitude: null,
		 elsewhere_longitude: null,
		 elsewhere_province: null,
		 elsewhere_city: null,
		 elsewhere_district: null,
		 elsewhere_address: null,
		 elsewhere_placeid: null,
		 elsewhere_placename: null
     },
	 
	 getSystemTime: function(haveTime)
	 {
	 	var myDate = new Date();

		if(haveTime)
		{
			return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
		}
		else
		{
			return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
		}
	 },

	/**
	 * 设置是否是第一次启动应用程序
	 */
	setIsFirstTime: function(flag)
	{
		localStorage.firsttime = flag;
	},
	
	/**
	 * 获取是否是第一次启动应用程序
	 */
	getIsFirstTime: function()
	{
		var flag = localStorage.firsttime;
		if(flag == null || flag == 'undefined' || Ext.isEmpty(flag) || flag == 'true')
		{
			return true;
		}
		
		return false;
	},
	/**
	 * 判断是否要自动登录
	 */
	isEnabledAutoLogin: function()
	{
		var username = this.getUserName();
		var password = this.getPassword();
		
		if(!Ext.isEmpty(username) && !Ext.isEmpty(password))
		{
			return true;
		}
		
		return false;
	},
	/**
	 * 记住用户的登录用户名
	 */
	setUserName : function(username)
	{
		localStorage.username=username;
	},
	/**
	 * 获取用户的登录用户名
	 */
	getUserName : function()
	{
		return localStorage.username;
	},
	/**
	 * 记住用户的登录密码
	 */
	setPassword: function(password)
	{
		localStorage.password=password;
	},
	/**
	 * 获取用户的登录密码
	 */
	getPassword: function()
	{
		return localStorage.password;
	},
	/**
	 * 保存登录用户信息
	 */
	setCurrentUser: function(userinfo)
	{
		// sessionStorage.currentuserinfo = userinfo;
		wecity.util.GlobalData.currentUser = userinfo;
	},
	/**
	 * 获取登录用户信息
	 */
	getCurrentUser: function()
	{
		// var temp = sessionStorage.currentuserinfo;
		var temp = wecity.util.GlobalData.currentUser;
		if(temp != null && temp != 'undefined' && temp != '')
		{
			var jsonData = Ext.JSON.decode(temp);
			var userInfo = Ext.create('wecity.model.User',jsonData);
			
			return userInfo;
		}
		
		return null;
	},
	/**
	 * 判断是否一登录
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
	/**
	 * 获取首页的标题HTML
	 */
	getTitleHtml: function()
	{
		// return '<table class="titletable hcenter"><tr><td><img class="margin1" src="icons/logo.png"></td><td>' + window.appTitle + '&nbsp;|&nbsp;<span class="titlebarcityname">' + this.getNearbyCityName() + '▼</span></td></tr></table>';
		// return '<table class="titletable hcenter"><tr><td><img class="margin1" src="icons/logo.png"></td><td>' + window.appTitle + '</td></tr></table>';
		return '<table class="titletable hcenter"><tr><td><img class="margin13" style="height: 35px;" src="images/wecity/title.png"></td></tr></table>';
	},
	keywordDataToJSONString: function(record)
	{
		var subtemp = '';
		subtemp +='{';
		subtemp += '"behaviourmode":"' + record.get('behaviourmode') + '",';
		subtemp += '"cityid":"' + record.get('cityid') + '",';
		subtemp += '"clientimage":"' + record.get('clientimage') + '",';
		subtemp += '"distance":"' + record.get('distance') + '",';
		subtemp += '"havedistance":"' + record.get('havedistance') + '",';
		subtemp += '"isenabled":"' + record.get('isenabled') + '",';
		subtemp += '"isexact":"' + record.get('isexact') + '",';
		subtemp += '"isshow":"' + record.get('isshow') + '",';
		subtemp += '"keyword":"' + record.get('keyword') + '",';
		subtemp += '"kid":"' + record.get('kid') + '",';
		subtemp += '"latitude":"' + record.get('latitude') + '",';
		subtemp += '"longitude":"' + record.get('longitude') + '",';
		subtemp += '"parentid":"' + record.get('parentid') + '",';
		subtemp += '"searchmode":"' + record.get('searchmode') + '",';
		subtemp += '"searchrange":"' + record.get('searchrange') + '",';
		subtemp += '"showbaiduresult":"' + record.get('showbaiduresult') + '",';
		subtemp += '"supportapp":"' + record.get('supportapp') + '",';
		subtemp += '"templetid":"' + record.get('templetid') + '",';
		subtemp += '"templetname":"' + record.get('templetname') + '",';
		subtemp += '"type":"' + record.get('type') + '",';
		subtemp += '"url":"' + record.get('url') + '",';
		subtemp += '"thumbnail":"' + record.get('thumbnail') + '"';
		subtemp +='},';
		
		return subtemp;
	},
	/**
	 * 保存用户的自定义关键词
	 */
	setCustomKeywords: function(customkeywords)
	{
		if(customkeywords != null && customkeywords != 'undefined')
		{
			var temp = '{"data":[';
			var subtemp = '';
			for(var i=0;i<customkeywords.getData().all.length;i++)
			{
				var record = customkeywords.getAt(i);
				subtemp += this.keywordDataToJSONString(record);
			}
			if(subtemp.length > 0)
			{
				subtemp = subtemp.substr(0,subtemp.length - 1);
			}
			temp += subtemp;
			temp += ']}';
			
			localStorage.customkeywords = temp;
		}
	},
	/**
	 * 读取用户的自定义关键词
	 */
	getCustomKeywords: function(cityid,district)
	{
		var temp = localStorage.customkeywords;
		var jsonData = null;
		
		if(temp == null || temp == 'undefined')
		{
			var str = '';
			
			str = '{"data":[';
			str=str+'{"kid":"3000040001","parentid":"300004","type":1,"keyword":"餐饮美食","cityid":"","wapimage":"","clientimage":"icons/clienticon/meishi.png","thumbnail":"icons/thumbnail/meishi.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2001","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040002","parentid":"300004","type":1,"keyword":"休闲娱乐","cityid":"","wapimage":"","clientimage":"","thumbnail":"icons/thumbnail/xiuxianyule.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2001","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000060003","parentid":"300006","type":1,"keyword":"酒店","cityid":"","wapimage":"","clientimage":"icons/clienticon/zhusu.png","thumbnail":"icons/thumbnail/zhusu.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2001","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000050001","parentid":"300005","type":1,"keyword":"个人办事","cityid":"","wapimage":"","clientimage":"","thumbnail":"icons/thumbnail/gerenbanshi.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2001","templetname":"DEFAULT","supportapp":3},';
			
			str=str+'{"kid":"3000030002","parentid":"300003","type":1,"keyword":"售票点","cityid":"","wapimage":"","clientimage":"icons/clienticon/shoupiaodian.png","thumbnail":"icons/thumbnail/shoupiaodian.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040001","parentid":"300004","type":1,"keyword":"加油站","cityid":"","wapimage":"","clientimage":"icons/clienticon/jiayouzhan.png","thumbnail":"icons/thumbnail/jiayouzhan.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040002","parentid":"300004","type":1,"keyword":"停车场","cityid":"","wapimage":"","clientimage":"icons/clienticon/tingchechang.png","thumbnail":"icons/thumbnail/tingchechang.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040003","parentid":"300004","type":1,"keyword":"银行","cityid":"","wapimage":"","clientimage":"icons/clienticon/yinhang.png","thumbnail":"icons/thumbnail/yinhang.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040004","parentid":"300004","type":1,"keyword":"公厕","cityid":"","wapimage":"","clientimage":"icons/clienticon/gongce.png","thumbnail":"icons/thumbnail/gongce.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040005002","parentid":"3000040005","type":2,"keyword":"房产中介","cityid":"","wapimage":"","clientimage":"","thumbnail":"icons/thumbnail/zhusu.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040007001","parentid":"3000040007","type":2,"keyword":"医院","cityid":"","wapimage":"","clientimage":"","thumbnail":"icons/thumbnail/yiliao.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"3000040007002","parentid":"3000040007","type":2,"keyword":"药店","cityid":"","wapimage":"","clientimage":"","thumbnail":"icons/thumbnail/yiliao.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			str=str+'{"kid":"300007","parentid":"300","type":1,"keyword":"热线","cityid":"","wapimage":"","clientimage":"icons/clienticon/rexian.png","thumbnail":"icons/thumbnail/rexian.png","url":"","searchmode":1,"isexact":1,"behaviourmode":0,"latitude":"","longitude":"","showbaiduresult":1,"havedistance":1,"distance":5000,"searchrange":0,"isenabled":1,"isshow":1,"templetid":"2201","templetname":"DEFAULT","supportapp":3},';
			
			str=str+'{"behaviourmode":0,"cityid":"","clientimage":"images/plus.png","distance":5000,"havedistance":1,"isenabled":1,"isexact":1,"isshow":1,"keyword":"添加常用","kid":"","latitude":"","longitude":"","parentid":"","searchmode":1,"searchrange":0,"showbaiduresult":1,"supportapp":"","templetid":"","templetname":"","type":1,"url":"","thumbnail":"images/plus.png"}';
			str=str+']}';
			
			jsonData = Ext.JSON.decode(str);
		}
		else
		{
			jsonData = Ext.JSON.decode(temp);
		}

		return Ext.create('wecity.store.Keyword',{data: jsonData.data});
	},
	
	setWiboToken: function(token)
	{
		localStorage.weibotoken = token;
	},
	
	getWeiboToken: function()
	{
		var token = localStorage.weibotoken;
		var jsonData = null;
		
		if(token != null && token != 'undefined')
		{
			jsonData = Ext.JSON.decode(token);
		}
		
		return jsonData;
	},
	
	/*####################与附近有关的数据项########################*/
	/**
	 * 保存当前位置的纬度
	 */
	setNearbyLatitude: function(latitude)
	{
		localStorage.nearbylatitude = latitude;
	},
	/**
	 * 获取当前位置的纬度
	 */
	getNearbyLatitude: function()
	{
		return localStorage.nearbylatitude;
	},
	/**
	 * 保存当前位置的经度
	 */
	setNearbyLongitude: function(longitude)
	{
		localStorage.nearbylongitude = longitude;
	},
	/**
	 * 获取当前位置的经度
	 */
	getNearbyLongitude: function()
	{
		return localStorage.nearbylongitude;
	},
	setNearbyProvince: function(province)
	{
		localStorage.nearbyprovince = province;
	},
	getNearbyProvince: function()
	{
		return localStorage.nearbyprovince;
	},
	/**
	 * 保存当前城市的城市名称
	 */
	setNearbyCity: function(city)
	{
		localStorage.nearbycity = city;
	},
	/**
	 * 获取当前城市的城市名称
	 */
	getNearbyCity: function()
	{
		return localStorage.nearbycity;
	},
	/**
	 * 保存当前所在位置的区县名称
	 */
	setNearbyDistrict: function(district)
	{
		localStorage.neardistrict = district;
	},
	/**
	 * 获取当前所在位置的区县名称
	 */
	getNearbyDistrict: function()
	{
		return localStorage.neardistrict;
	},
	/**
	 * 保存附近的地址
	 */
	setNearbyAddress: function(address)
	{
		localStorage.nearaddress = address;
	},
	/**
	 * 获取附近的地址
	 */
	getNearbyAddress: function()
	{
		return localStorage.nearaddress;
	},
	/**
	 * 保存关键词
	 */
	setNearbyKeywords: function(keywords)
	{
		if(keywords != null && keywords != 'undefined')
		{
			localStorage.nearbykeywords = '{"data":' + Ext.JSON.encode(keywords) + '}';
		}
	},
	/**
	 * 读取关键词
	 */
	getNearbyKeywords: function()
	{
		var temp = localStorage.nearbykeywords;
		var jsonData = null;
		
		if(temp != null && temp != 'undefined')
		{
			jsonData = Ext.JSON.decode(temp);
		}
		
		if(temp == null || temp == 'undefined' || jsonData.data.length < 1)
		{
			return null;
		}
		else
		{
			return Ext.create('wecity.store.Keyword',{data: jsonData.data});
		}
	},
	setNearbyPlaceId: function(id)
	{
		localStorage.nearbyplaceid = id;
	},
	getNearbyPlaceId: function()
	{
		return localStorage.nearbyplaceid;
	},
	setNearbyPlaceName: function(name)
	{
		localStorage.nearbyplacename = name;
	},
	getNearbyPlaceName: function(name)
	{
		return localStorage.nearbyplacename;
	},
	/*####################与别处有关的数据项########################*/
	/**
	 * 保存别处位置的纬度
	 */
	setElsewhereLatitude: function(latitude)
	{
		wecity.util.GlobalData.elsewhere_latitude = latitude;
	},
	/**
	 * 获取别处位置的纬度
	 */
	getElsewhereLatitude: function()
	{
		return wecity.util.GlobalData.elsewhere_latitude;
	},
	/**
	 * 保存别处位置的经度
	 */
	setElsewhereLongitude: function(longitude)
	{
		wecity.util.GlobalData.elsewhere_longitude = longitude;
	},
	/**
	 * 获取别处位置的经度
	 */
	getElsewhereLongitude: function()
	{
		return wecity.util.GlobalData.elsewhere_longitude;
	},
	setElsewhereProvince: function(province)
	{
		wecity.util.GlobalData.elsewhere_province = province;
	},
	getElsewhereProvince: function()
	{
		return wecity.util.GlobalData.elsewhere_province;
	},
	/**
	 * 保存别处城市名称
	 */
	setElsewhereCity: function(city)
	{
		wecity.util.GlobalData.elsewhere_city = city;
	},
	/**
	 * 获取别处城市名称
	 */
	getElsewhereCity: function()
	{
		return wecity.util.GlobalData.elsewhere_city;
	},
	/**
	 * 保存别处区县名称
	 */
	setElsewhereDistrict: function(district)
	{
		wecity.util.GlobalData.elsewhere_district = district;
	},
	/**
	 * 获取别处区县名称
	 */
	getElsewhereDistrict: function()
	{
		return wecity.util.GlobalData.elsewhere_district;
	},
	/**
	 * 保存别处的地址
	 */
	setElsewhereAddress: function(address)
	{
		wecity.util.GlobalData.elsewhere_address = address;
	},
	/**
	 * 获取别处的地址
	 */
	getElsewhereAddress: function()
	{
		return wecity.util.GlobalData.elsewhere_address;
	},
	setElsewherePlaceId: function(id)
	{
		wecity.util.GlobalData.elsewhere_placeid = id;
	},
	getElsewherePlaceId: function()
	{
		return wecity.util.GlobalData.elsewhere_placeid;
	},
	setElsewherePlaceName: function(name)
	{
		wecity.util.GlobalData.elsewhere_placename = name;
	},
	getElsewherePlaceName: function(name)
	{
		return wecity.util.GlobalData.elsewhere_placename;
	},
	
	getStarHtml: function(star)
	{
		star = Math.round(star);
		var html = '';
		switch(star)
		{
			case 0:
			{
				html = '<span>';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
			case 1:
			{
				html = '<span>';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
			case 2:
			{
				html = '<span>';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
			case 3:
			{
				html = '<span>';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
			case 4:
			{
				html = '<span>';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star7.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
			case 5:
			{
				html = '<span>';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '<img src="images/star6.png" style="width:18px;height:18px" />';
				html += '</span>';
				break;
			}
		}
		
		return html;
	}
});