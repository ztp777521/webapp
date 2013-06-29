Ext.define('eapp.view.wenxinjiayuan.UnemDetail', 
{
	extend: 'Ext.DataView',
	xtype: 'unemdetailview',

	config: 
	{
		title:'我的信息',
		pageNo: 1, // 当前页码
		totalPages: 1, // 总页数
		store: null,
		items:
		[
		 	
		],
		//itemTpl: ['{content}']
		//itemTpl:[ '<div class="contact"><div class="left"><img src="images/noface.png" /></div><div class="left">我 {unempReplyContent}</div><div class="clear"></div></div>']
		itemTpl: 
		[
			'<div>',
			'	<div class="left width5">',
			//'		<img style="width:60px; height:60px;" src="images/noface.png" />',
			'	</div>',
			'	<div class="left width6">&nbsp;</div>',
			'	<div class="left">',
			'		<div class="width5">{replyName}</div>',
			'		<div class="triangle-border top width7">',
			'			<div id="" style="word-break:break-all; width:200px;">{unempReplyContent}</div>',
			'			<div class="margin1 fontsize1 textcolor2">',
			'				<div class="right">{replyDate}</div>',
			'				<div class="clear"></div>',
			'			</div>',
			'		</div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
//		listeners:
//		{
//			'itemswipe': function(dataview, index, target, record, e, eOpts)
//			{
//				if(e.direction == 'right')
//				{
//					dataview.fireEvent('delweibo',dataview,index, record);
//				}
//			},
//		}
	},
	
	// 显示失业提交信息和回复信息
	init:function(record)
	{
		var me = this;
		console.log(record);
		var unempRegid = record.get('unempRegid');
		var user = eapp.util.GlobalData.getCurrentUser();
		var userid = user.get('userid');
		Ext.Viewport.setMasked({ xtype: 'loadmask', message: '请稍候...'});
		var unemploymentregistrationService = Ext.create('eapp.business.UnemploymentregistrationService');
		/**
		 * unempRegid:回复者的id
		 * userid:用户id
		 */
		unemploymentregistrationService.getbyid(userid,
		{			
			/**
			 * jsonData 服务期端返回的数据
			 */
			success:function(jsonData)
			{
				console.log(jsonData);
				var store = Ext.create('eapp.store.Unemploymentreply', {data: jsonData.result});
				me.setStore(store);
				Ext.Viewport.setMasked(false);
			},
			/**
			 * message返回错误的信息
			 */
			failure:function(message)
			{
				console.log(message);
				Ext.Viewport.setMasked(false);
			}
		});
	}
});
