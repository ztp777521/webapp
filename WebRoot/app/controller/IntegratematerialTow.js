/**
 * 幸福家园控制层
 */
Ext.define('eapp.controller.IntegratematerialTow', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallisttow:'integratemateriallisttow',
			integratematerialdetailtow:'integratematerialdetailtow',
			
			newsbutton:{selector: 'integratemateriallisttow toolbar button[name=dsbuttontowname]'},
			gonggaobutton:{selector: 'integratemateriallisttow toolbar button[name=tzbottontowname]'},
			fuwubutton:{selector: 'integratemateriallisttow toolbar button[name=fwbuttontowname]'},
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
			integratemateriallisttow:
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
		var integratematerialdetailtow = me.getIntegratematerialdetailtow();
		if(integratematerialdetailtow == null || integratematerialdetail == 'undefined')
		{
			integratematerialdetailtow = Ext.create('eapp.view.xinfujiayuan.IntegratematerialDetailTow');
		}
		integratematerialdetailtow.init(record);
		me.getMainview().push(integratematerialdetailtow);
		var len = eapp.app.pageStack.length;
		if(eapp.app.pageStack[len-1] != 'integratematerialdetailtow')
		{
			eapp.app.pageStack.push('integratematerialdetailtow');
		}
	},
	
	/**
	 * 点击党史按钮
	 */
	OnNewsbuttonTap:function()
	{
		var me = this;
		var integratemateriallisttow = me.getIntegratemateriallisttow();
		/**
		 * 初始化Stroe
		 */
		integratemateriallisttow.setStore(null);
		integratemateriallisttow.setPageNo(1);
		integratemateriallisttow.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallisttow.init(2,2,4);
	},
	
	/**
	 * 点击知识卡片按钮
	 */
	OnGonggaobuttonTap:function()
	{
		var me = this;
		var integratemateriallisttow = me.getIntegratemateriallisttow();
		/**
		 * 初始化Stroe
		 */
		integratemateriallisttow.setStore(null);
		integratemateriallisttow.setPageNo(1);
		integratemateriallisttow.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallisttow.init(2,2,5);
	},
	
	/**
	 * 点击政务服务按钮
	 */
	OnFuwubuttonTap:function()
	{
		var me = this;
		var integratemateriallisttow = me.getIntegratemateriallisttow();
		/**
		 * 初始化Stroe
		 */
		integratemateriallisttow.setStore(null);
		integratemateriallisttow.setPageNo(1);
		integratemateriallisttow.setTotalpages(0);
		/**
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示 )
	     */
		integratemateriallisttow.init(2,2,3);
	}
});