Ext.define('eapp.view.MapView',
{
	extend: 'eapp.geo.mapabc.Map',
    xtype: 'mapview',
	
    config:
	{
		title: '地图',
	},
	
	init: function(point, title, address)
	{
//		try 
//		{
			this.addMarker(point, '<div>' + title + '</div><div>' + address + '</div>');
//		}
//		catch(e)
//		{
//			eapp.view.Dialogs.showAlert('错误', '无法启动地图，请检查网络！');
//		}
	}
});
