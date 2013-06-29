Ext.define('eapp.view.Cell12', 
{
	extend: 'Ext.Container',
	xtype: 'cell12view',

	config:
	{
		items: 
		[
			{
				xtype: 'container',
				name: 'backgroundImg'
			},
			{
				xtype: 'container',
				cls: 'page',
				scrollable: 
				{
				    direction: 'vertical',
				    directionLock: true
				},
				items:
				[
					{
						xtype: 'container',
						name: 'subject',
						html: '智慧潘家园',
						cls: 'subject'
					},
					{
						xtype: 'container',
						name: 'menuContainer',
						cls: 'cell9_menu',
						items:
						[
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm1',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm2',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm3',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm4',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm5',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm6',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm7',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm8',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm9',
										cls: 'cell9_menu_item'
									}
								]
							},
							{
								xtype: 'container',
								layout: 'hbox',
								cls: 'cell9_menu_item_container',
								items:
								[
									{
										xtype: 'img',
										name: 'm10',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm11',
										cls: 'cell9_menu_item'
									},
									{
										xtype: 'img',
										name: 'm12',
										cls: 'cell9_menu_item'
									}
								]
							}
						]
					},
					{
						xtype: 'toolbar',
						docked: 'bottom',
						cls: 'poweredby',
						style: 'border: none',
		 
						items: 
						[
							{
		                        xtype: 'spacer'
		                    },
							{
								xtype:'img',
								name: 'poweredbyimg'
							},
							{
		                        xtype: 'spacer',
								name: 'login',
								cls: 'textalignright',
		                    }
						]
					}
				]
			}
		]
	},
	
	init: function()
	{
		var backgroundImg = this.down('container[name="backgroundImg"]');
		backgroundImg.setHtml('<img src="images/backgroundimg.jpg" style="width: 100%;height: 120%" />');
		
//		var poweredby = this.down('img[name="poweredbyimg"]');
//		poweredby.setHtml('<img src="images/poweredby_white.png" class="poweredbyimg" />');
		
		var m1 = this.down('img[name="m1"]');
		m1.setHtml('<img src="images/zhihuizhichuang.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧之窗 </div>');
		
		var m2 = this.down('img[name="m2"]');
		m2.setHtml('<img src="images/xingfujiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">幸福家园 </div>');
		
		var m3 = this.down('img[name="m3"]');
		m3.setHtml('<img src="images/jiayouzhan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">社工加油站</div>');
		
		var m4 = this.down('img[name="m4"]');
		m4.setHtml('<img src="images/zhihuiyanlu.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧言路</div>');
		
		var m5 = this.down('img[name="m5"]');
		m5.setHtml('<img src="images/zhihuishiting.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧视听</div>');
		
		var m6 = this.down('img[name="m6"]');
		m6.setHtml('<img src="images/gongjianhexie.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">共建和谐</div>');
		
		var m7 = this.down('img[name="m7"]');
		m7.setHtml('<img src="images/weiqingjiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">温情家园</div>');
		
		var m8 = this.down('img[name="m8"]');
		m8.setHtml('<img src="images/duocaijiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">多彩家园</div>');
		
		var m9 = this.down('img[name="m9"]');
		m9.setHtml('<img src="images/hexiejiayuan.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">和谐家园</div>');
		
		var m10 = this.down('img[name="m10"]');
		m10.setHtml('<img src="images/zhihuifuwu.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧服务</div>');
		
		var m11 = this.down('img[name="m11"]');
		m11.setHtml('<img src="images/zhihuidiy.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">智慧DIY</div>');
		
		var m12 = this.down('img[name="m12"]');
		m12.setHtml('<img src="images/hongsebaolei.png" class="wp_menu_icon" /><div style="color:#09519b;font-weight: bold;font-size:14px;">红色堡垒</div>');
		
		var loginButton = this.down('spacer[name="login"]');
		loginButton.setHtml('<div><img class="wp_login_image" src="images/login1.png" /><span style="margin-left:15px;"></span></div>');
		Ext.get(loginButton.element.query('img')[0]).on('tap', function()
		{
			loginButton.fireEvent('login');
		});
	}
});