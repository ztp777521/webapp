/**
 * 操作商户
 */
Ext.define('eapp.business.ShopService',
{
	extend:'eapp.business.BaseService',
	
	/**
	 * 申请商户
	 * userid, 用户id
	 * shopname,商户名称
	 * tel：电话
	 * shopfw,服务类别
	 * shopfwdz:地址
	 * shopfwcontent,服务内容
	 */
	addshop:function(userid,shopname,tel,shopfw,shopfwdz,shopfwcontent,callback)
	{
		this.callApi('shop!addshop.action',
		{
			userid:userid,
			shopName:shopname,
			telephonenum:tel,
			serviceTypeid:shopfw,
			shopAddress:shopfwdz,
			serviceContent:shopfwcontent,
		},callback
		);
	},
	
	/**
	 * 根据id查询商户列表
	 */
	findshoplist:function(userid,callback)
	{
		this.callApi('shop!findshoplist.action',
		{
			userid:userid
		},callback);
	}
});