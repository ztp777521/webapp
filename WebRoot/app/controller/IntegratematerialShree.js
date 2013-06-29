/**
 * 幸福家园控制层
 */
Ext.define('eapp.controller.IntegratematerialShree', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallistshree:'integratemateriallistshree',
			integratematerialdetailshree:'integratematerialdetailshree',
			
			newsbutton:{selector: 'integratemateriallistshree toolbar button[name=xuexiutton]'},
			gonggaobutton:{selector: 'integratemateriallistshree toolbar button[name=zhishibutton]'},
			fuwubutton:{selector: 'integratemateriallistshree toolbar button[name=zhanshibutton]'},
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
			integratemateriallistshree:
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
		var integratematerialdetailshree = me.getIntegratematerialdetailshree();
		if(integratematerialdetailshree == null || integratematerialdetailshree == 'undefined')
		{
			integratematerialdetailshree = Ext.create('eapp.view.shegongjiayouzhan.IntegratematerialDetailShree');
		}
		integratematerialdetailshree.init(record);
		me.getMainview().push(integratematerialdetailshree);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratematerialdetailshree')
		{
			eapp.app.pageStack.push('integratematerialdetailshree');
		}
	},
	
	/**
	 * 点击五分钟学习课程
	 */
	OnNewsbuttonTap:function()
	{
		console.log('武疯子');
		var me = this;
		var integratemateriallistshree = me.getIntegratemateriallistshree();
		integratemateriallistshree.setStore(null);
		integratemateriallistshree.setPageNo(1);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallistshree.init(4,2,6);
	},
	
	/**
	 * 点击社区工作知识卡片
	 */
	OnGonggaobuttonTap:function()
	{
		console.log('学习卡屏');
		var me = this;
		var integratemateriallistshree = me.getIntegratemateriallistshree();
		integratemateriallistshree.setStore(null);
		integratemateriallistshree.setPageNo(1);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallistshree.init(4,2,15);
	},
	
	/**
	 * 点击优秀社区工作者展示
	 */
	OnFuwubuttonTap:function()
	{
		console.log('作者展示');
		var me = this;
		var integratemateriallistshree = me.getIntegratemateriallistshree();
		integratemateriallistshree.setStore(null);
		integratemateriallistshree.setPageNo(1);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallistshree.init(4,2,16);
	}
});