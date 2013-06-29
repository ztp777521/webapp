
Ext.define('eapp.view.gongjianhexie.VolunteerList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'integratemateriallist',
    
    config: 
    {
        title:'格长列表',
        iconCls: 'info',
        cls:'textcolor7',
        pageNo:1,
        pageSize:10,
        totalpages:0,
        store:null,
       
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