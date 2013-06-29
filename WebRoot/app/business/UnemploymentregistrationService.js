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
	findunem:function(userid,pageNo,pageSize,callback)
	{
		this.callApi('unemploymentregistration!findunempregrep.action',
		{
			userid:userid,
			pageNo:pageNo,
			pageSize:pageSize
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