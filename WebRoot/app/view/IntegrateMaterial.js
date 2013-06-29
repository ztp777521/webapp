Ext.define('eapp.view.IntegrateMaterial',
{
	extend: 'Ext.List',
    xtype: 'integrate_materialview',
	alternateClassName: 'eapp.integrate_material',
	
    config:
	{
		title: '新闻咨询',
		store:null,
		pageno:'1',
		totalpages:'0',//总页数
		scrollable: 
		{
		    direction: 'vertical',
		    directionLock: true
		},
		items:
		[
			{
				xtype: 'container',
				id:'newsid',
				style: 'font-size: 25px;  text-align: center;',
				html: '',
			},
		],
		itemTpl: 
		[
			'<table>',
			'	<tr>',
			'		<td rowspan="2"><tpl if="image == \'\'"><img style=" width:50px; height:50px;" src="images/newstu.png"/><tpl else><img style=" width:50px; height:50px;" src="{image}" /></tpl></td>',
			'		<td><div style="margin-left: 5px;width: 235px;" class="textoneline">{titles}</div></td>',
			'	</tr>',
			'	<tr>',
			'		<td><div style="margin-left: 5px;width: 235px;font-size: 12px;color: #aaa;" >{summarys}</div></td>',
			'	</tr>',
			'</table>'
		],
	},
	
	/**
	 * 显示新闻列表
	 */
	init:function()
	{
		
//		var networkState = navigator.connection.type;
//		if(networkState == Connection.UNKNOWN || networkState == Connection.NONE)
//		{
//			eapp.view.Dialogs.showAlert('网络错误', '浏览资讯内容需要打开网络！');
//			return;
//		}
		var me = this;
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var eappid = eapp.app.appData.eApp.get("appid");
		var newService = Ext.create('eapp.business.NewsService');
		newService.getNewsList(me.getPageno(),10,eappid,2801,
		{
			success: function(jsonData)
			{
				console.log(jsonData);
				for(var i = 0; i < jsonData.result.length;i++)
				{
					var title = jsonData.result[i].title;
					var summary = jsonData.result[i].summary; 
					if(title.length > 12)
					{
						title = title.substring(0,12) + '...';
					}
					jsonData.result[i].titles = title;
					if(summary.length > 37)
					{
						summary = summary.substring(0,37) + '...';
					}
					jsonData.result[i].summarys = summary;
				}
				var store = me.getStore();
				if(store == null || store == "undefined")
				{
					store = Ext.create('eapp.store.EAppNews', {data: jsonData.result});
				}
				else
				{
					store.add(jsonData.result);
				}
				
				me.setStore(store);
				me.setPageno(jsonData.pageno);
				me.setTotalpages(jsonData.totalpages);
				if(jsonData.result.length == 0)
				{
					Ext.ComponentQuery.query('#newsid',me)[0].setHtml("暂无新闻");
				}
				Ext.Viewport.setMasked(false);
			},
			failure: function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	},
	
	initialize:function()
	{
        this.callParent(arguments);
		var me = this;
        var maxY = 0;
        
        // 当滚动条到达底部时自动加载下一页数据
        me.getScrollable().getScroller().on('scrollend',function(scroller, x, y, eOpts)
        {
//			if(me.getTotalpages() == me.getPageno() &&  me.getTotalpages() != 1)
//			{
//				eapp.view.Dialogs.showAlert('翻页', '已经是最后一页了！');
//				return;
//			}
        	// 判断是否滚动到了底部且没有翻到最后一页
        	if((maxY - y) == 0 && (Number)(me.getTotalpages()) != (Number)(me.getPageno()))
        	{
				console.log(me.getTotalpages());
				if(me.getTotalpages() == 1)
				{
					return;	
				}else
				{
					me.setPageno((Number)(me.getPageno()) + 1);
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
