Ext.define('eapp.view.Main', 
{
	extend: 'Ext.NavigationView',
	xtype: 'mainview',

	config:
	{
		defaultBackButtonText: '返回',
        
        navigationBar: 
        {
			cls:'',
            items:
			[
               {
				    xtype: 'button',
				    id: 'actionButton',
					cls:'actionbutton',
					style: 'margin-right: 0px',
				    text: '返回',
				    align: 'right',
				    hidden: true,
				    hideAnimation: Ext.os.is.Android ? false : 
					{
				        type: 'fadeOut',
				        duration: 200
				    },
				    showAnimation: Ext.os.is.Android ? false : 
					{
				        type: 'fadeIn',
				        duration: 200
				    }
				}
            ]
        },

        autoDestroy: true,

		items: 
		[
		]
	},
	
	initialize: function()
	{
		this.callParent();
		this.getNavigationBar().hide();
		
		var appData = eapp.app.appData;
		var page = Ext.create('eapp.view.Cell12');
		page.init();
		this.add(page);
		eapp.app.pageStack.push('main');
		Ext.Viewport.show();
		this.fireEvent('initcomplete');
		
		// 以下为对返回键的处理
		var me = this;
		document.addEventListener("backbutton", function()
		{
			Ext.Viewport.setMasked(false);
			
			var stack =eapp.app.pageStack;
			console.log(stack);
	    	var len = stack.length;
			if(stack[len - 1] == 'main')
			{
				eapp.view.Dialogs.showComfirm('确认', '您确定要退出应用？',function()
				{
					window.exitApplication();
				});
			}
			else
			{
				me.pop();
				me.fireEvent('back');
			}
		}, false);
		
		try
		{
			navigator.splashscreen.hide();
		}
		catch(e)
		{}
		
//		//定位
//		setTimeout(function()
//		{
//			if (navigator.geolocation)
//			{
//				navigator.geolocation.getCurrentPosition(function success(location)
//				{
//					eapp.app.position.latitude = location.coords.latitude;
//					eapp.app.position.longitude = location.coords.longitude;
//				},
//				function failure(errorCode, errorMessage)
//				{
//					eapp.app.position.latitude = eapp.app.appData.enterprise.get('latitude');
//					eapp.app.position.longitude = eapp.app.appData.enterprise.get('longitude');
//				},{enableHighAccuracy: true, timeout: 5000}
//				);
//			}
//			else
//			{
//				eapp.app.position.latitude = eapp.app.appData.enterprise.get('latitude');
//				eapp.app.position.longitude = eapp.app.appData.enterprise.get('longitude');
//			}
//		}, 10);
	},
	
	pop: function() 
	{
        this.fireEvent('beforepop', this);

        this.callParent(arguments);
    }
});
