Ext.define('eapp.model.Activity',
{
	extend:'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'activityid',
			'userid',
			'groupid',
			'activityName',
			'activityDateStart',
			'activityContent',
			'activityDateEnd',
			'activityState',
			'reson'
		]
	}
});