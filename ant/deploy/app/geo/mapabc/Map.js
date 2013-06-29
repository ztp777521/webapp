Ext.define("eapp.geo.mapabc.Map",{extend:"Ext.Component",xtype:"mapabc",requires:["Ext.util.Geolocation"],isMap:true,config:{baseCls:Ext.baseCSSPrefix+"map",zIndex:1,useCurrentLocation:false,map:null,geo:null,mapCenter:null,zoom:15,plugins:[]},constructor:function(){this.callParent(arguments);this.element.setVisibilityMode(Ext.Element.OFFSETS)},initialize:function(){this.callParent();this.element.on("touchstart","onTouchStart",this)},onTouchStart:function(a){a.makeUnpreventable()},updateUseCurrentLocation:function(a){this.setGeo(a);if(!a){this.renderMap()}},applyGeo:function(a){return Ext.factory(a,Ext.util.Geolocation,this.getGeo())},updateGeo:function(b,a){var c={locationupdate:"onGeoUpdate",locationerror:"onGeoError",scope:this};if(a){a.un(c)}if(b){b.on(c);b.updateLocation()}},renderMap:function(){var d=this,b=d.element;if(b.dom.firstChild){Ext.fly(b.dom.firstChild).destroy()}var e=new MMap.Map(b.dom);var a=null;var c=this.getMapCenter();if(c){a=new MMap.LngLat(c)}else{a=new MMap.LngLat(116.397385,39.908713)}e.setZoomAndCenter(13,a);this.fireEvent("maprender",d,e);e.bind(e,"click",function(f){d.fireEvent("longpress",e,{latitude:f.lnglat.lat,longitude:f.lnglat.lng})});d.setMap(e)},addMarker:function(b,d){var f=this;var a=this.getMap();var g=new MMap.LngLat(b.longitude,b.latitude);var c=new MMap.Marker({id:"m",position:g,icon:"images/point.png",draggable:false,visible:true,zIndex:1});a.addOverlays(c);a.setFitView([c]);var e=new MMap.InfoWindow({content:d,});e.open(a,g);a.bind(c,"click",function(h){e.open(a,g)})},onGeoUpdate:function(a){if(a){this.setMapCenter(new BMap.Point(a.getLatitude(),a.getLongitude()))}},onGeoError:Ext.emptyFn,});