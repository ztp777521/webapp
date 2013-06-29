Ext.define('wecity.view.phone.my.Weibo', 
{
	extend: 'Ext.DataView',
	xtype: 'myWeiboContainer',

	config: 
	{
		pageName: 'myweibocontainerview',
		title:'我的微博',
		pageNo: 1, // 当前页码
		totalPages: 1, // 总页数
		store: null,
		items: 
		[
			{
				xtype: 'toolbar',
				ui:'neutral',
				docked: 'top',
				scrollable: false,
				style: 'height:20px;font-size:10px;',
				items: 
				[
					{
                        xtype: 'spacer'
                    },
	                {
	                    xtype: 'container',
						cls: 'textcolor_white',
	                    html: '<div class="margin8"><div class="left" style="color:#47893B;height:15px;line-height:15px;">向右滑动删除本条信息</div><img class="left" src="images/youhua.png"><a class="clear"></a></div>'
	                },
					{
                        xtype: 'spacer'
                    }
				]
			}
		],

		//itemTpl: ['{content}']
		// itemTpl: '<div class="contact"><div class="left"><img src="images/noface.png" /></div><div class="left">我 {content}</div><div class="clear"></div></div>'
		itemTpl: 
		[
			'<div>',
			'	<div class="left width5">',
			'		<img style="width:60px; height:60px;" src="images/noface.png" />',
			'	</div>',
			'	<div class="left width6">&nbsp;</div>',
			'	<div class="left">',
			'		<div class="width5">{receivername}</div>',
			'		<div class="triangle-border top width7">',
			'			<div id="c_{msgid}" style="word-break:break-all; width:200px;">{content}</div>',
			'			<div class="margin1 fontsize1 textcolor2">',
			'				<div class="right">{sendtime}</div>',
//			'				<div class="right">{sendtime.year}-{sendtime.month}-{sendtime.date}  {sendtime.hours}:{sendtime.minutes}</div>',
//			'				<div class="right"><span style="font-weight:color:#00CC00">向右滑动删除本条信息</span><img src="images/youhua.png">',
//			'				<div class="right"><a href="#delweibo/{msgid}" onclick="wecity.controller.phone.OtherControl.delWeibo({msgid})">删除</a></div>',
			'				<div class="clear"></div>',
			'			</div>',
			'		</div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
		listeners:
		{
			'itemswipe': function(dataview, index, target, record, e, eOpts)
			{
				if(e.direction == 'right')
				{
					dataview.fireEvent('delweibo',dataview,index, record);
				}
			},
		}
	},
	
	del:function(id)
	{
	},
	
	initialize:function()
	{
        var me = this;
        var maxY = 0;
        
        this.callParent(arguments);
        
        // 当滚动条到达底部时自动加载下一页数据
        this.getScrollable().getScroller().on('scrollend',function(scroller, x, y, eOpts)
        {
        	// 判断是否滚动到了底部且没有翻到最后一页
        	if((maxY - y) == 0 && (Number)(me.getTotalPages()) != (Number)(me.getPageNo()))
        	{
	        	me.doSearch();
        	}else if((maxY - y) == 0 && (Number)(me.getTotalPages()) == (Number)(me.getPageNo()))
			{
				wecity.view.Dialogs.showAlert(window.appTitle, '已经是最后一页！');
			}
        });
        this.getScrollable().getScroller().on('maxpositionchange',function(scroller, maxPosition, eOpts)
        {
        	maxY = maxPosition.y;
        });
    },
	
	doSearch: function()
	{
	
		this.fireEvent('getWeibo', ((Number)(this.getPageNo())) + 1);
	}
});
