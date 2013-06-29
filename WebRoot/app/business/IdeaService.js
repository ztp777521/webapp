/**
 * 操作意见
 */
Ext.define('eapp.business.IdeaService',
{
	extend:'eapp.business.BaseService',
	
	
	/**
	 * 提交意见
	 * @userid :用户id
	 * @userName :用户名
	 * @telephonenum :电话
	 * @emial :email
	 * @ideaContent :意见内容
	 * @callback :回调函数
	 */
	addremark:function(userid,userName,telephonenum,email,ideaContent,callback)
	{
		this.callApi('idea!addremark.action',
		{
			userId:userid,
			userName:userName,
			telephonenum:telephonenum,
			email:email,
			ideaContent:ideaContent
		},callback);
	},
	
	/**
	 * 查询意见列表
	 * userid:用户名
	 * ispublic:是否公开
	 * pageno:当前页数
	 * pagesize:一页显示的行数
	 * callback:回调函数
	 */
	findidea:function(userid,ispublic,pageno,pagesize,callback)
	{
		this.callApi('idea!findidealist.action',
		{
			userId:userid,
			ispublic:ispublic,
			pageNo:pageno,
			pageSize:pagesize
		},callback);
	}
});