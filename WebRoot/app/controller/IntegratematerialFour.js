/**
 * 智慧试听控制层
 */
Ext.define('eapp.controller.IntegratematerialFour', 
{
	extend: 'Ext.app.Controller',
	config: 
	{
		refs: 
		{
			mainview: 'mainview',
			integratemateriallistfour:'integratemateriallistfour',
		},

		control:
		{
			integratemateriallistfour:
			{
				itemtap:'OnItemTap',
			}
		}
	},
	
	/**
	 * 点击列表
	 */
	OnItemTap:function(element, index, target, record, e, eOpts)
	{
		var me = this;
		alert(1);
	},
	
});