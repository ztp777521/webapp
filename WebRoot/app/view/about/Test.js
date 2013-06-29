
 
//创建一个全屏的tabpanel
Ext.create('Ext.TabPanel', 
{
    fullscreen: true,
    //选项卡（导航栏在下方）
    tabBarPosition: 'bottom',    
    //各项内容的显示控制
    layout: {
        type: 'card',
        //显示动画
        animation: {
            type: 'fade'
        }
    },
     
    items:[{xtype:'indexPage'},{xtype:'newsList'},{xtype:'settings'}]
});