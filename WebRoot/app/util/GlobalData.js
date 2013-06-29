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