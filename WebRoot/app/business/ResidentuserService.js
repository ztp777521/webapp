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