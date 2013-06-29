Ext.define('eapp.view.zhihuiyanlu.IdeaList',
{
	extend:'Ext.dataview.List',
	xtype:'idealistview',
	
	config:
	{
		 title:'意见列表',
	     iconCls: 'info',
	     cls:'textcolor7',
	     pageNo:1,
	     pageSize:10,
	     totalpages:0,
	     store:null,
//	     items:
//	     [
//		         {
//		 			xtype: 'toolbar',
//		 			ui:'neutral',
//		 			docked: 'bottom',
//		 			scrollable: false,
//		 		},
//	     ],
	    
	     itemTpl: 
			[
				'<div style="width: 98%">',
				'	<div class="left">',
				'		<div><span>{userName}</span></div>',
				'		<div><span>{commitDate}</span></div>',
				'	</div>',
				'	<div class="clear"></div>',
				'</div>',
			],
	},
	
	/**
	 * 显示意见列表
	 */
	init:function()
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
		var ideaService = Ext.create('eapp.business.IdeaService');
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		ideaService.findidea(userid,0,pageNo,pageSize,
		{
			success:function(jsonData)
			{
				var store = me.getStore();
				if(store == null || store == 'undefined')
				{
					store = Ext.create('eapp.store.Idea',{data: jsonData.result});
				}
				else
				{
					store.add(jsonData.result);
				}
				
				me.setStore(store);
				me.setPageNo(pageNo);
				me.setPageSize(pageSize);
				me.setTotalpages(jsonData.totalpages);
			},
			failure:function(message)
			{
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
	        		me.init();
				}
        	}
        });
        this.getScrollable().getScroller().on('maxpositionchange',function(scroller, maxPosition, eOpts)
        {
        	maxY = maxPosition.y;
        });
    },
});