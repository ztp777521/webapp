Ext.define("eapp.view.wenxinjiayuan.UnemPage",{extend:"Ext.Container",xtype:"unempageview",config:{pageName:"indexpageview",title:"温情家园",layout:"fit",items:[{xtype:"formpanel",items:[{xtype:"spacer",cls:"margin3"},{xtype:"fieldset",items:[{xtype:"labelEx",id:"aboutuspage",name:"unemsubmitname",cls:"line2 padding5",dataValue:"settings"},]},{xtype:"fieldset",items:[{xtype:"labelEx",id:"suggestionpage",name:"unemmyinfoname",cls:"line2 padding5",dataValue:"settings"},]}]}]},initialize:function(){this.callParent()},init:function(){var c=this;var b=c.down('labelEx[name="unemsubmitname"]');var a=c.down('labelEx[name="unemmyinfoname"]');b.setContent('<div><div class="left myindexitem textcolor4 margin2">失业提交</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>');a.setContent('<div><div class="left myindexitem textcolor4 margin2">我的信息</div><div class="right textcolor3 myindexitem margin9" style="font-size: 12px;"></div><div class="clear"></div></div>')},});