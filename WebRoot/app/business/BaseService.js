/**
 * 服务器API调用类的基类
 */
Ext.define('eapp.business.BaseService', 
{
    /**
     * 获取服务器API的URL前缀
     * @returns {String}
     */
	getApiBaseUrl : function()
	{
	 	// return 'http://192.168.0.1:1020/webapi/';
	 	return 'http://localhost:8080/webapi/';
	},
	/**
	 * 获取地理接口的URL前缀
	 * @returns {String}
	 */
	getGeoBaseUrl: function()
	{
//		return 'http://localhost:8080/geoservice/';
		return 'http://api.wecity.co/g4d/';
	},
	/**
	 * 获取HTTP Header
	 * @returns {___anonymous546_699}
	 */
	getHttpHeaders: function()
	{
		var GlobalData = eapp.util.GlobalData;
		
		return {'apptypeid' : GlobalData.getAppTypeId(),'platformid': GlobalData.getPlatformId(),'city':GlobalData.getCityName(),'district':GlobalData.getDistrict()};
	},
	/**
	 * 调用Api接口
	 * @param url
	 * @param postData
	 * @param callback
	 */
	callApi: function(url,postData,callback)
	{
		this.call(this.getApiBaseUrl() + url, postData, callback, 'OK');
	},
	/**
	 * 调用地理接口
	 * @param url
	 * @param postData
	 * @param callback
	 */
	callGeo: function(url,postData,callback)
	{
		this.call(this.getGeoBaseUrl() + url, postData, callback, 1);
	},
	/**
	 * 向服务器发送调用请求
	 * @param url
	 * @param postData
	 * @param callback
	 */
	call: function(url,postData,callback,flag)
	{
		console.log(url);
        console.log(Ext.JSON.encode(postData));
		
		var me = this;
		Ext.Ajax.request(
		{
		    url: url,
		    method: 'POST',
		    timeout: 60000,
		    // withCredentials: true,
		    // useDefaultXhrHeader: false,
		   // headers: me.getHttpHeaders(),
		    params: postData,
		    success: function(response)
		    {
		    	// console.log(response);
		    	var text = response.responseText;
		        
		        if(text == null || text.length == 0)
	        	{
		        	Ext.Viewport.setMasked(false);
					callback.failure('服务器响应的内容为空！');
		        	return;
	        	}
		        var jsonData = null;
		        try
		        {
		        	jsonData = Ext.JSON.decode(text);
		        }
		        catch(e)
		        {
		        	Ext.Viewport.setMasked(false);
					callback.failure('服务器返回的数据无法解析！');
		        }
	        	if(jsonData.status == flag)
	        	{
	        		Ext.Viewport.setMasked(false);
					callback.success(jsonData.data);
	        	}
	        	else
	        	{
	        		Ext.Viewport.setMasked(false);
					callback.failure(jsonData.data);
	        	}
		    },
		    failure: function(response) 
		    {
		    	console.log(response);
				Ext.Viewport.setMasked(false);
		    	callback.failure('调用服务器接口失败！');
		    }
		});
	}
});