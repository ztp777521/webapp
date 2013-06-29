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