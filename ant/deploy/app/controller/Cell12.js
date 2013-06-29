Ext.define("eapp.controller.Cell12",{extend:"Ext.app.Controller",config:{refs:{mainview:"mainview",cell12view:"cell12view",myView:"myView",loginView:"loginView",integratemateriallist:"integratemateriallist",integratemateriallisttow:"integratemateriallisttow",ideaView:"ideaView",idealistview:"idealistview",indexpage:"indexpage",ideapageview:"ideapageview",volunteerpageview:"volunteerpageview",unempageview:"unempageview",grouppageview:"grouppageview",actionButton:"#actionButton",m1:{selector:"img[name=m1]"},m2:{selector:"img[name=m2]"},m3:{selector:"img[name=m3]"},m4:{selector:"img[name=m4]"},m5:{selector:"img[name=m5]"},m6:{selector:"img[name=m6]"},m7:{selector:"img[name=m7]"},m8:{selector:"img[name=m8]"},m9:{selector:"img[name=m9]"},m10:{selector:"img[name=m10]"},m11:{selector:"img[name=m11]"},m12:{selector:"img[name=m12]"},login:{selector:"spacer[name=login]"},},control:{m1:{tap:"onMainMenuTaped1",},m2:{tap:"onMainMenuTaped2",},m3:{tap:"onMainMenuTaped3",},m4:{tap:"onMainMenuTaped4",},m5:{tap:"onMainMenuTaped5",},m6:{tap:"onMainMenuTaped6",},m7:{tap:"onMainMenuTaped7",},m8:{tap:"onMainMenuTaped8",},m9:{tap:"onMainMenuTaped9",},m10:{tap:"onMainMenuTaped10",},m11:{tap:"onMainMenuTaped11",},m12:{tap:"onMainMenuTaped12",},login:{login:"OnLogin",}}},OnLogin:function(){var d=this;if(eapp.util.GlobalData.isLoged()){var b=d.getMyView();if(b==null||b=="undefined"){b=Ext.create("eapp.view.My")}b.init();d.getMainview().getNavigationBar().show();d.getMainview().push(b);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="myview"){eapp.app.pageStack.push("myview")}}else{var c=d.getLoginView();if(c==null||c=="undefined"){c=Ext.create("eapp.view.Login")}d.getMainview().getNavigationBar().show();d.getMainview().push(c);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="loginview"){eapp.app.pageStack.push("loginview")}}},onMainMenuTaped1:function(){var b=this;var c=b.getIntegratemateriallist();if(c==null||c=="undefined"){c=Ext.create("eapp.view.zhihuizhichuang.IntegratematerialList")}setTimeout(function(){Ext.Viewport.setMasked({xtype:"loadmask",message:"请稍候..."});var d=Ext.create("eapp.business.IntegratematerialService");d.findlist(1,2,1,{success:function(e){c.init(e)},failure:function(e){Ext.Viewport.setMasked(false);console.log(e)}})},1);b.getMainview().getNavigationBar().show();b.getMainview().push(c);Ext.Viewport.setMasked(false);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="integratemateriallist"){eapp.app.pageStack.push("integratemateriallist")}},onMainMenuTaped2:function(){var c=this;var b=c.getIntegratemateriallisttow();if(b==null||integratematerialList=="undefined"){b=Ext.create("eapp.view.xinfujiayuan.IntegratematerialList")}setTimeout(function(){Ext.Viewport.setMasked({xtype:"loadmask",message:"请稍候..."});var d=Ext.create("eapp.business.IntegratematerialService");d.findlist(2,2,1,{success:function(e){b.init(e)},failure:function(e){Ext.Viewport.setMasked(false);console.log(e)}})},1);c.getMainview().getNavigationBar().show();c.getMainview().push(b);Ext.Viewport.setMasked(false);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="integratemateriallisttow"){eapp.app.pageStack.push("integratemateriallisttow")}},onMainMenuTaped3:function(){var c=this;var b=c.getIndexpage();if(b==null||b=="undefined"){b=Ext.create("eapp.view.about.IndexPage")}b.init();c.getMainview().getNavigationBar().show();c.getMainview().push(b);var a=eapp.app.pageStack.length;7;if(eapp.app.pageStack[a-1]!="indexpage"){eapp.app.pageStack.push("indexpage")}},onMainMenuTaped4:function(){eapp.view.Dialogs.showAlert("智慧潘家园","社工加油站")},onMainMenuTaped5:function(){var e=this;var b=eapp.util.GlobalData.isLoged();if(b){var c=e.getIdeapageview();if(c==null||c=="undefined"){c=Ext.create("eapp.view.zhihuiyanlu.IdeaPage")}c.init();e.getMainview().getNavigationBar().show();e.getMainview().push(c);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="ideapageview"){eapp.app.pageStack.push("ideapageview")}}else{var d=e.getLoginView();if(d==null||d=="undefined"){d=Ext.create("eapp.view.Login")}e.getMainview().getNavigationBar().show();e.getMainview().push(d);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="loginview"){eapp.app.pageStack.push("loginview")}}},onMainMenuTaped6:function(){eapp.view.Dialogs.showAlert("智慧潘家园","智慧试听")},onMainMenuTaped7:function(){var b=this;var c=b.getVolunteerpageview();if(c==null||c=="undefined"){c=Ext.create("eapp.view.gongjianhexie.VolunteerPage")}c.init();b.getMainview().getNavigationBar().show();b.getMainview().push(c);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="volunteerpageview"){eapp.app.pageStack.push("volunteerpageview")}},onMainMenuTaped8:function(){var d=this;var b=eapp.util.GlobalData.isLoged();if(b){var d=this;var e=d.getUnempageview();if(e==null||e=="undefined"){e=Ext.create("eapp.view.wenxinjiayuan.UnemPage")}e.init();d.getMainview().getNavigationBar().show();d.getMainview().push(e);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="unempageview"){eapp.app.pageStack.push("unempageview")}}else{var c=d.getLoginView();if(c==null||c=="undefined"){c=Ext.create("eapp.view.Login")}d.getMainview().getNavigationBar().show();d.getMainview().push(c);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="loginview"){eapp.app.pageStack.push("loginview")}}},onMainMenuTaped9:function(){var e=this;var b=eapp.util.GlobalData.isLoged();if(b){var c=e.getGrouppageview();if(c==null||c=="undefined"){c=Ext.create("eapp.view.duocaijiayuan.GroupPage")}c.init();e.getMainview().getNavigationBar().show();e.getMainview().push(c);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="grouppageview"){eapp.app.pageStack.push("grouppageview")}}else{var d=e.getLoginView();if(d==null||d=="undefined"){d=Ext.create("eapp.view.Login")}e.getMainview().getNavigationBar().show();e.getMainview().push(d);var a=eapp.app.pageStack.length;if(eapp.app.pageStack[a-1]!="loginview"){eapp.app.pageStack.push("loginview")}}},onMainMenuTaped10:function(){eapp.view.Dialogs.showAlert("智慧潘家园","和谐家园")},onMainMenuTaped11:function(){var a="http://map.baidu.com/mobile/?ssid=0&from=844b&bd_page_type=1&uid=293EDADD92628FBA06A47B7001A4A981&pu=sz%401320_2001&itj=45#index/index";try{window.openBrowser(a)}catch(b){window.open(a)}},onMainMenuTaped12:function(){eapp.view.Dialogs.showAlert("智慧潘家园","智慧DIY")},});