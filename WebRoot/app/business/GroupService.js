/**
 * 操作活动
 */
Ext.define('eapp.business.GroupService',
{
	extend:'eapp.business.BaseService',
	
	/**
	 * 申请创建活动群
	 * userId: 用户id
	 * groupName:群名称
	 * groupContent:群说明
	 * callBack：回调函数
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
	
	/**
	 * 查询群列表
	 * userId:用户id
	 */
	findgroup:function(userid,callback)
	{
		this.callApi('group!findgroup.action',
		{
			applyUserid:userid
		},callback)
	},
	
	/**
	 * 发起活动
	 * groupId, 群id
	 * userId,用户id
	 * activityName,活动名称
	 * startDay,开始时间
	 * endDay,结束时间
	 * activityContent,活动内容
	 */
	addactivity:function(groupid,userid,activityname,startday,endday,activitycontent,callback)
	{
		this.callApi('activity!addactivity.action',
		{
			groupid:groupid,
			userid:userid,
			activityName:activityname,
			activityDateStart:startday,
			activityDateEnd:endday,
			activityContent:activitycontent,
		},callback);
	},
	
	/**
	 * 查询活动列表
	 * userId:用户id
	 */
	findactivity:function(userid,pageNo,pageSize,callback)
	{
		this.callApi('activity!findactivitylist.action',
		{
			userid:userid,
			pageNo:pageNo,
			pageSize:pageSize
		},callback);
	}
	
});