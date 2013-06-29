Ext.define('eapp.model.Residentuser',
{
	extend :'Ext.data.Model',
	
	config:
	{
		fields:
		[
			'userid',
			'loginname',
			'realname',
			'password',
			'email',
			'telephonenum',
			'familyTelephonenum',
			'commmunityid',
			'thirdLogType',
			'thirdLogAccount',
		]
	}
});