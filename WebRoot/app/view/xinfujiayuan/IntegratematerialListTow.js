
Ext.define('eapp.view.xinfujiayuan.IntegratematerialListTow',
{
   
    extend: 'Ext.dataview.List',
    xtype:'integratemateriallisttow',
    
    config: 
    {        
        title:'幸福家园',
        iconCls: 'info',
        cls:'textcolor7',
        pageNo:1,
        pageSize:10,
        totalpages:0,
        moduleTypeid:-1,
        materialState:-1,
        showTypeid:-1,
        store:null,
        items:
        [
	         {
	 			xtype: 'toolbar',
	 			// ui:'neutral',
	 			docked: 'bottom',
	 			scrollable: false,
	
	 			items: 
	 			[
	 				{
	 					xtype: 'spacer'
	                 },
	 				{
	                 	xtype: 'button',
	                 	ui: 'action',
	                 	cls:'left',
	 					id:'newsbuttontowid',
	 					name:'dsbuttontowname',
	 					width:'85px',
	 					text: '党史',
	                 },
	                 {
	                 	xtype: 'button',
	                 	ui: 'action',
	 					id:'gonggaobuttontowid',
	 					name:'tzbottontowname',
	 					width:'98px',
	 					text:'通知公告',
	                 },
	 				{
	                 	xtype: 'button',
	                 	ui: 'action',
	                 	cls:'right',
	 					id:'fuwubuttontowid',
	 					name:'fwbuttontowname',
	 					width:'85px',
	 					text:'政务服务',
	                 },
	 				{
	                 	xtype: 'spacer'
	                }
	 			]
	 		},
        ],
       
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{materialTitle}</span></div>',
			'		<div><span>{materialPublicDate}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示新闻动态列表
     */
    init:function(moduleTypeid,materialState,showTypeid)
    {
    	var me = this;
    	var pageNo = me.getPageNo();
    	var pageSize = me.getPageSize();
    	if(pageNo == null || pageNo == 'undefined')
    	{
    		pageNo = 1;
    	}
    	if(pageSize == null || pageSize == 'undefined')
    	{
    		pageSize = 10;
    	}
    	
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var integratematerialService = Ext.create('eapp.business.IntegratematerialService');
		/**
	     * 查询党史
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     * 2,2,4
	     */
		integratematerialService.findlist(moduleTypeid,materialState,showTypeid,pageNo,pageSize,
		{
			success: function(jsonData)
			{
				var store = me.getStore();
				if(store == null || store == "undefined")
				{
					store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
				}
				else
				{
					store.add(jsonData.result);
				}
				me.setStore(store);
				me.setTotalpages(jsonData.totalpages);
				me.setPageNo(pageNo);
		    	me.setModuleTypeid(moduleTypeid);
		    	me.setMaterialState(materialState);
		    	me.setShowTypeid(showTypeid);
		    	Ext.Viewport.setMasked(false);
			},
			failure: function(message)
			{
				Ext.Viewport.setMasked(false);
				console.log(message);
			}
		});
    },
    
    /**
     * 滑动翻页
     */
    initialize:function()
	{
        this.callParent(arguments);
		var me = this;
        var maxY = 0;
        
        me.getScrollable().getScroller().on('scrollend',function(scroller, x, y, eOpts)
        {
        	if((maxY - y) == 0 && (Number)(me.getTotalpages()) != (Number)(me.getPageNo()))
        	{
				if(me.getTotalpages() == 1)
				{
					return;	
				}
				else
				{
					me.setPageNo((Number)(me.getPageNo()) + 1);
	        		me.init((Number)(me.getModuleTypeid()),(Number)(me.getMaterialState()),(Number)(me.getShowTypeid()));
				}
        	}
        });
        this.getScrollable().getScroller().on('maxpositionchange',function(scroller, maxPosition, eOpts)
        {
        	maxY = maxPosition.y;
        });
    },
});