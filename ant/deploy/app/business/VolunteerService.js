Ext.define("eapp.business.VolunteerService",{extend:"eapp.business.BaseService",findAll:function(a){this.callApi("volunteer!findgridinfolist.action",{},a)},addVolunteer:function(a,b,d,c){this.callApi("volunteer!addvolunteer.action",{userid:a,applyGridid:b,applyReson:d},c)},addideareply:function(a){this.callApi("volunteer!addideareply.action",{},a)}});