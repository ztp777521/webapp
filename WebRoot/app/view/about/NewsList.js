
Ext.define('eapp.view.about.NewsList',
{
   
    extend: 'Ext.dataview.List',
    xtype:'newsList',
    
    config: 
    {        
        title:'新闻动态',
        iconCls: 'info',
        cls:'textcolor7',
        //store:null,
        //layout: 'fit',
        store: {
            fields: ['title', 'content','date'],
            data:
            [
              {title: '什么情况',  content: '<p>中国搞死日本</p>',date:'2012/07/12'},
              {title: '搞啥',   content: '中国搞死美国',date:'2012/07/12'},
              {title: '啥意思', content: '中国搞死菲利宾',date:'2012/07/12'},
              {title: '搞不搞', content: '中国搞死韩国',date:'2012/07/12'},
              {title: '汗，不好搞',   content: '中国搞死阿三',date:'2012/07/12'}
             ]
         },
        itemTpl: 
		[
			'<div style="width: 98%">',
			'	<div class="left">',
			'		<div><span>{title}</span></div>',
			'		<div><span>{content}</span></div>',
			'	</div>',
			'	<div class="clear"></div>',
			'</div>',
		],
    },
    
    /**
     * 显示新闻动态列表
     */
    init:function(jsonData)
    {
    	var me = this;
    	var store = Ext.create('eapp.store.Integratematerial', {data: jsonData.result});
    	console.log(store);
    	me.setStore(store);
    },
});