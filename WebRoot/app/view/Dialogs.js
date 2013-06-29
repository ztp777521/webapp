Ext.define('eapp.view.Dialogs',
{
	singleton: true,
	
	showComfirm: function(title,content, callback)
	{
		this.showCustomComfirm(title, content, '是', '否', 
		{
			yes: function()
			{
				callback();
			},
			no: function()
			{
				Ext.Msg.hide();
			}
		});
	},
	showSearchComfirm: function(title,content, callback)
	{
		Ext.MessageBox.YESNO = 
		[
            {text: '否',  itemId: 'no'},
            {text: '是', itemId: 'yes', ui: 'action'}
        ];
		Ext.Msg.confirm(title, content, function(buttonId,value ,opt )
		{
			if (buttonId == 'yes') 
			{
				callback.yes();
			}
			else
			{
				Ext.Msg.hide();
				//callback.no();
			}
		});
	},
	showCustomComfirm: function(title, content, yesButtonText, noButtonText, callback)
	{
		Ext.MessageBox.YESNO = 
		[
            {text: noButtonText,  itemId: 'no'},
            {text: yesButtonText, itemId: 'yes', ui: 'action'}
        ];
		Ext.Msg.confirm(title, content, function(buttonId,value ,opt )
		{
			if (buttonId == 'yes') 
			{
				callback.yes();
			}
			else
			{
				Ext.Msg.hide();
				callback.no();
			}
		});
	},
	
	showAlert: function(title,content)
	{
		this.showCustomAlert(title, content, '确定', function(){});
	},
	
	showCustomAlert: function(title, content, buttonText, callback)
	{
		Ext.MessageBox.OK ={text: buttonText,     itemId: 'ok',  ui: 'action'};
		Ext.Msg.alert(title, content, function(buttonId,value ,opt )
		{
			Ext.Msg.hide();
			callback();
		});
	}
});
