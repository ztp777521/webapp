/**
 * 自定义labelEx控件
 */
Ext.define('eapp.component.LabelEx', 
{
    extend: 'Ext.Container',
    xtype: 'labelEx',
	
	config:
	{
		dataField: null,
		dataFieldWidth: 100,
		dataFieldDisplayNone: false,
		dataValue: null,
		dataType: null,// phone表示电话，点击时自动呼出，url表示网址，点击是打开
		tpl: '<div>{0}</div>'
	},
	
	renderTpl: function()
	{
		var args = Ext.Array.toArray(arguments, 0);
		var tpl = this.getTpl().html;
        var a = tpl.replace(/\{(\d+)\}/g, function(m, i) 
		{
            return args[i];
        });
		
		this.setContent(a);
	},

	setContent: function(content)
    {
		var dataValue = this.getDataValue();
		var dataField = this.getDataField();
		var dataFieldDisplayNone = this.getDataFieldDisplayNone();
		var dataType = "" + this.getDataType();
		
		if(dataFieldDisplayNone == false && dataField != null && dataField != 'undefined' && dataField != '' && dataValue != null && dataValue != 'undefined' && dataValue != '')
		{
			var dataFieldWidth = this.getDataFieldWidth();
			if(dataType == 'phone')
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td>' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
			else if(dataType == 'url')
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td style="word-break: break-all; overflow:hidden; ">' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
			else
			{
				this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td width="' + dataFieldWidth + 'px"><span style="font-weight:bold;">' + dataField + '：</span></td><td>' + dataValue + '</td><td width="16px" valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
			}
		}
		else if(dataValue != null && dataValue != 'undefined' && dataValue != '')
		{
			this.setHtml('<table style="border: none; margin: 0px; padding: 0px; width: 100%"><tr><td>' + content + '</td><td valign="middle" class="textcolor_gray"><img src="images/jiantou.png" style="margin-top: 3px;width: 16px; height: 16px" /></td></tr></table>');
		}
		else
		{
			this.setHtml(content);
		}
		
		var element = Ext.get(this.element);
		if(element.hasListener('tap'))
		{
			element.un('tap', this.onTap,this);
		}
		element.on('tap', this.onTap, this);
	},
	
	onTap: function(event, element, options, eOpts)
	{ 
		var dataType = "" + this.getDataType();
		var dataValue = "" + this.getDataValue();
		if(dataType == 'phone')
		{
			if(dataValue.indexOf('tel:') < 0)
			{
				window.location = 'tel:' + dataValue;
			}
			else
			{
				window.location = dataValue;
			}
		}
		else if(dataType == 'url')
		{
			if(dataValue.indexOf('http://') < 0 && dataValue.indexOf('https://') < 0 )
			{
				dataValue = 'http://' + dataValue;
			}
			try
			{
				window.openBrowser(dataValue);
			}
			catch(e)
			{
				window.open(dataValue);
			}
		}
		else
		{
			this.fireEvent('tap', dataValue);
		}
	},
});
