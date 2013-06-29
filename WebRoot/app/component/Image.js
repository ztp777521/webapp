/**
 * 自定义image控件
 */
Ext.define('eapp.component.Image', 
{
    extend: 'Ext.Container',
    xtype: 'imageEx',
    
    config: 
    {
        src: null,
		width:0,
		height: 0,
		offset: 0,
		center: false,
		html: '<img  /><img style="display:none"  />',
    },
    
    initialize: function()
    {
        this.display(this.getSrc(),this.getWidth(), this.getHeight());
	},
	
	bindTapEvent: function()
	{
		var img = Ext.get(this.element.query('img')[0]);
		
		if(img.hasListener('tap'))
		{
			img.un('tap', this.onTap);
		}
		img.on('tap', this.onTap, this); 
	},
	
	onTap: function()
	{
		this.fireEvent('tap');
	},
	
	display: function(src,width,height)
	{
		if(src == null || src == '')
		{
			return;	
		}
		
		if(width == null || width == 'undefined')
		{
			width = 0;
		}
		
		if(height == null || height == 'undefined')
		{
			height = 0;
		}
		
		var imgs = this.element.query('img');
		var imgDest = imgs[0];
		var imgSource = imgs[1];
		var offset = this.getOffset();
		var newWidth = 0, newHeight = 0;

		if(offset == null || offset == 'undefined')
		{
			offset = 0;
		}
		
		if (width == 0 && height == 0) 
		{
			var me = this;
			imgSource.src = src;
			imgSource.onload = function()
			{
				var imgwidth = imgSource.width;
				var imgheight = imgSource.height;
				var screenWidth = document.body.scrollWidth;
				var screenHeight = document.body.clientHeight;
				var imgProp = screenWidth / imgwidth;

				if(imgwidth > screenWidth )
				{
					newWidth = screenWidth;
					newHeight = imgheight * imgProp;
				}
				else
				{
					newWidth = imgwidth;
					newHeight = imgheight;
				}
				newWidth = newWidth - offset;
				newHeight = newHeight - offset;
				me.setWidth(newWidth);
				me.setHeight(newHeight);
				
				imgDest.src = src;
				imgDest.style.width = (newWidth - 2) + 'px';
				imgDest.style.height = (newHeight - 2) + 'px';
				
				if(me.getCenter())
				{
					var marginLeft = (document.body.scrollWidth - newWidth - offset) / 2;
					me.setStyle('margin-left:' + marginLeft + 'px');
				}
			};
			imgSource.onerror= function()
			{
				console.log('img 生成比例失败！');
			};
		}
		else
		{
			newWidth = width - offset;
			newHeight = height - offset;
			
			this.setWidth(newWidth);
			this.setHeight(newHeight);
				
			imgDest.src = src;
			imgDest.style.width = (newWidth - 2) + 'px';
			imgDest.style.height = (newHeight - 2) + 'px';
			
			if(this.getCenter())
			{
				var marginLeft = (document.body.scrollWidth - newWidth - offset) / 2;
				this.setStyle('margin-left:' + marginLeft + 'px');
			}
		}
		
		this.setSrc(src);
		this. bindTapEvent();
	}
});