
Ext.define('eapp.view.shegongjiayouzhan.IntegratematerialListShree',
{
   
    extend: 'Ext.dataview.List',
    xtype:'integratemateriallistshree',
    
    config: 
    {        
        title:'社工加油站',
        iconCls: 'info',
        pageNo:1,
        pageSize:10,
        totalpages:0,
        moduleTypeid:-1,
        materialState:-1,
        showTypeid:-1,
        cls:'textcolor7',
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
	                 	cls:'left',
	                 	ui: 'action',
	 					id:'newsbuttonid',
	 					name:'xuexiutton',
	 					width:'85px',
	 					text: '学习课程',
	                 },
	                 {
	                 	xtype: 'button',
	                 	ui: 'action',
	 					id:'zhishibuttonid',
	 					name:'zhishibutton',
	 					width:'98px',
	 					text:'知识卡片',
	                 },
	 				{
	                 	xtype: 'button',
	                 	ui: 'action',
	                 	cls:'right',
	 					id:'fuwubuttonid',
	 					name:'zhanshibutton',
	 					width:'85px',
	 					text:'优秀作品展示',
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
	     * 查询资料列表
	     * moduleTypeid: 模块类别id (1：智慧之窗 2：幸福家园 3：红色堡垒 4:社工加油站 5： 智慧视听)
	     * materialState:资料状态（0：未审批；1：正在审批；2：通过；3：未通过）
	     * showTypeid:展示类别id(1:新闻动态 2:通知公告 3:政务服务 4:党史 5:知识卡片 6:学习动态,15社区工作知识卡片16,优秀社区工作者展示,17视频展示 )
	     * 4,2,6,
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
				
				me.setTotalpages(jsonData.totalpages);
				me.setPageNo(pageNo);
		    	me.setStore(store);
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