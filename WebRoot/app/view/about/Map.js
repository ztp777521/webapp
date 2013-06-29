Ext.define('wecity.geo.baidu.Map', 
{
    extend: 'Ext.Component',
    xtype: 'baidumap',
    requires: ['Ext.util.Geolocation'],
    
    isMap: true,
    
    config: 
    {
        baseCls: Ext.baseCSSPrefix + 'map',
		zIndex: 1,
		useCurrentLocation: false,
        map: null,
        geo: null,
        central: null,
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
        map.enablePinchToZoom();
        map.enableDoubleClickZoom();
		map.enableAutoResize();
		map.enableDoubleClickZoom();
        map.addControl(new BMap.NavigationControl()); // 添加鱼骨控件
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        var point = null;
        var mapCenter = this.getCentral();
        if (mapCenter) 
        {
            point = new BMap.Point(mapCenter.longitude, mapCenter.latitude);
        }
        else 
        {
            point = new BMap.Point(116.413631, 39.910845); // 创建点坐标
        }
        map.centerAndZoom(point, this.getZoom()); // 初始化地图,设置中心点坐标和地图级别。
        // 通知外部程序，程序已经加载完毕
        this.fireEvent('maprender', me, map);
        
        // 通过长按在地图上增加标注点
       map.addEventListener('click', function(e)
		{
			me.fireEvent('longpress', map, e.point);
		});
		
		me.setMap(map);
    },
	
	myPosition: function(position, radius, callback)
	{
		var me = this;
		var baiduTools = Ext.create('wecity.geo.baidu.MapTools');
		baiduTools.convertGooglePoint(position.longitude, position.latitude, function(point)
		{
			var myIcon = new BMap.Icon("images/myposition.png", new BMap.Size(24, 38), 
			{
				offset: new BMap.Size(10, 25),
				imageOffset: new BMap.Size(0, 0)
			});
			var circle = new BMap.Circle(point, radius, 
			{
				fillColor: '#93dd51',
				fillOpacity: 0.2,
				strokeColor: '#316900',
				strokeOpacity: 0.8,
				strokeWeight: 2,
			});
			var marker = new BMap.Marker(point, 
			{
				icon: myIcon
			}); // 创建标注
			
			var map = me.getMap();
			map.addOverlay(marker); // 将标注添加到地图中
			map.addOverlay(circle);
			marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
			
			callback({marker: marker, circle: circle});
		});
	},
	
	panTo: function(position, zoom)
	{
		var me = this;
		var baiduTools = Ext.create('wecity.geo.baidu.MapTools');
		baiduTools.convertGooglePoint(position.longitude, position.latitude, function(point)
		{
			me.getMap().setZoom(zoom);
			me.getMap().panTo(point);
		});
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
