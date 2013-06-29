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
     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
     */
    findlist: function(moduleTypeid,materialState,showTypeid,pageNo,pageSize,callback)
    {
        this.callApi('integratematerial!getlist.action',
        {
        	moduleTypeid:moduleTypeid,
        	materialState:materialState,
        	showTypeid:showTypeid,
        	pageNo:pageNo,
        	pageSize:pageSize
        },
        callback);
    },
	
});
