Ext.define('eapp.controller.News', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			activity: 'activity',
		},

		control:
		{
			activity:
			{
				itemtap: 'onActivityTaped',
			}
		}
	},
	
});