Ext.define("eapp.view.about.TongZhiGongGao",{extend:"Ext.dataview.List",xtype:"tongzhigonggaolist",config:{title:"通知公告",iconCls:"star",cls:"textcolor7",store:null,itemTpl:['<div style="width: 98%">','	<div class="left">',"		<div><span>{materialTitle}呵呵呵</span></div>","		<div><span>{materialPublicDate}哈哈哈</span></div>","	</div>",'	<div class="clear"></div>',"</div>",],},init:function(b){var c=this;var a=Ext.create("eapp.store.Integratematerial",{data:b.result});console.log(a);c.setStore(a)},});