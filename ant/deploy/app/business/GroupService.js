Ext.define("eapp.business.GroupService",{extend:"eapp.business.BaseService",addgroup:function(b,a,c,d){this.callApi("group!addgroup.action",{applyUserid:b,groupName:a,groupDescription:c},d)},});