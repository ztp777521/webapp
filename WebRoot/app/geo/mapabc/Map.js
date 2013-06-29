Ext.define('eapp.geo.mapabc.Map', 
{
    extend: 'Ext.Component',
    xtype: 'mapview',
    requires: ['Ext.util.Geolocation'],
    
    isMap: true,
    
    config: 
    {
        baseCls: Ext.baseCSSPrefix + 'map',
		zIndex: 1,
		useCurrentLocation: false,
        map: null,
        geo: null,
        mapCenter: null,
        zoom: 15,
		plugins: []
    },
    
    constructor: function()
    {
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
    },
    
    initialize: function()
    {
        this.callParent();
        this.element.on('touchstart', 'onTouchStart', this);
    },
    
    onTouchStart: function(e)
    {
        e.makeUnpreventable();
    },
    
    updateUseCurrentLocation: function(useCurrentLocation)
    {
        this.setGeo(useCurrentLocation);
        if (!useCurrentLocation) 
        {
            this.renderMap();
        }
    },
    
    applyGeo: function(config)
    {
        return Ext.factory(config, Ext.util.Geolocation, this.getGeo());
    },
    
    updateGeo: function(newGeo, oldGeo)
    {
        var events = 
        {
            locationupdate: 'onGeoUpdate',
            locationerror: 'onGeoError',
            scope: this
        };
        
        if (oldGeo) 
        {
            oldGeo.un(events);
        }
        
        if (newGeo) 
        {
            newGeo.on(events);
            newGeo.updateLocation();
        }
    },
    
    // @private
    renderMap: function()
    {
        var me = this, element = me.element;
        if (element.dom.firstChild) 
        {
            Ext.fly(element.dom.firstChild).destroy();
        }
        var map = new BMap.Map(element.dom);  
        //var map = new BMap.Map(element.dom);
        var point = null;
        var mapCenter = this.getMapCenter();
        if (mapCenter) 
        {
            point = new BMap.LngLat(mapCenter);
        }
        else 
        {
            point = new BMap.Point(116.397385, 39.908713); // 鍒涘缓鐐瑰潗鏍?
        }
        map.centerAndZoom(point, 15);       
        this.fireEvent('maprender', me, map);
		
//		map.bind(map,"click",function(e)
//		{  
//			me.fireEvent('longpress', map, {latitude: e.lnglat.lat, longitude: e.lnglat.lng});
//		});  

		me.setMap(map);
    },
	
	addMarker: function(point,  infoWindowContent)
	{
//		var me = this;
//		var mapObj = this.getMap();
//		var markerPoint = new BMap.Point(point.longitude, point.latitude); 
//		
//		var marker = new MMap.Marker(
//		{                     
//			id:"m", //marker id                     
//			position: markerPoint, //浣嶇疆  
//			icon: "images/point.png",//鍥剧墖  
//			draggable: false,  //鍙嫋鍔?  
//			visible: true,//鍙  
//			zIndex: 1//璁剧疆鐐瑰彔鍔犻『搴忥紝鍦ㄥ姞杞藉涓偣鏈夋晥鏋滐紝璇﹁璁剧疆鐐瑰彔鍔犻『搴忕ず渚? 
//		});   
//		mapObj.addOverlays(marker);  
//		mapObj.setFitView([marker]);  
//		var inforWindow = new BMap.InfoWindow(
//		{  
//			content: infoWindowContent,
//			//size: new MMap.Size(200, 100),
//			//offset: new MMap.Pixel(-40, -140)  
//		});  
//		inforWindow.open(mapObj, markerPoint);    
//		
//		mapObj.bind(marker,"click",function(e)
//		{  
//			inforWindow.open(mapObj, markerPoint);    
//		});   

	},
    
    // @private
    onGeoUpdate: function(geo)
    {
        if (geo) 
        {
            this.setMapCenter(new BMap.Point(geo.getLatitude(), geo.getLongitude()));
        }
    },
    
    // @private
    onGeoError: Ext.emptyFn,
});
