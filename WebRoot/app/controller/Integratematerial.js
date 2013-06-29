
/**
 * 智慧之窗控制层
 */
Ext.define('eapp.controller.Integratematerial', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallist:'integratemateriallist',
			integratematerialdetail:'integratematerialdetail',
			newsbutton:{selector: 'integratemateriallist toolbar button[name=newsbutton]'},
			gonggaobutton:{selector: 'integratemateriallist toolbar button[name=gonggaobutton]'},
			fuwubutton:{selector: 'integratemateriallist toolbar button[name=fuwubutton]'},
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
			integratemateriallist:
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
		var integratematerialdetail = me.getIntegratematerialdetail();
		if(integratematerialdetail == null || integratematerialdetail == 'undefined')
		{
			integratematerialdetail = Ext.create('eapp.view.zhihuizhichuang.IntegratematerialDetail');
		}
		integratematerialdetail.init(record);
		me.getMainview().push(integratematerialdetail);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratematerialdetail')
		{
			eapp.app.pageStack.push('integratematerialdetail');
		}
	},
	
	/**
	 * 点击新闻动态按钮
	 */
	OnNewsbuttonTap:function()
	{
		console.log('新闻动态');
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		// 初始化store
		integratematerialview.setStore(null);
		integratematerialview.setPageNo(1);
		integratematerialview.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratematerialview.init(1,2,1);
	},
	
	/**
	 * 点击通知公告按钮
	 */
	OnGonggaobuttonTap:function()
	{
		console.log('通知公告');
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		//初始化store
		integratematerialview.setStore(null);
		integratematerialview.setPageNo(1);
		integratematerialview.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratematerialview.init(1,2,2);
	},
	
	/**
	 * 点击政务服务按钮
	 */
	OnFuwubuttonTap:function()
	{
		console.log('政务服务');
		var me = this;
		var integratematerialview = me.getIntegratemateriallist();
		//初始化store
		integratematerialview.setStore(null);
		integratematerialview.setPageNo(1);
		integratematerialview.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratematerialview.init(1,2,3);
	}
});