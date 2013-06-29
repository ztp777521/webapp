Ext.define('LocalStorageDao',
{
    config:
    {
        fields:null,//列名
        storageId:null,//localStorage的唯一标示，相当于表名
        rowId:'id'//行主键名，默认是id
    },
    constructor: function(config) 
    {//构造方法        
        this.initConfig(config);
 
        return this;
    },
 
    getAll:function()
    {//获取表所有数据，以数组返回
        var table = [];
        var t = localStorage.getItem(this.getStorageId());
        if(t)
            table = Ext.decode(t);
        return table;
    },
 
    getSortAll:function(type)
    {//排序
        var table = this.getAll();
        var rowId = this.getRowId();
        if(type == 'asc')
        {
            table.sort(function(a,b)
            {
                if(a[rowId] < b[rowId])
                    return -1;
                if(a[rowId] > b[rowId])
                    return 1;
                return 0;
            });
        }else if(type == 'desc')
        {
            table.sort(function(a,b)
            {
                if(a[rowId] > b[rowId])
                    return -1;
                if(a[rowId] < b[rowId])
                    return 1;
                return 0;
            });
        }
        return table;
    },
 
    queryByField:function(fieldName,fieldValue)
    {//查询
        var table = this.getAll();
        var field = null;
        for(var i=0;i<table.length;i++)
        {
            if(table[i][fieldName]==fieldValue)
            {
                field = table[i];
                break;
            }
        }
        return field;
    },
 
    insert:function(field)
    {//插入
        var table = this.getAll();
        table.push(field);
        localStorage.setItem(this.getStorageId(),Ext.encode(table));
    },
 
    update:function(field)
    {//更新
        var table = this.getAll();
        var fieldDb = this.queryByField(this.getRowId(),field[this.getRowId()]);
        if(!fieldDb)
        {
            this.insert(field);
        }else{
            var tableStr = Ext.encode(table);
            var newTableStr = tableStr.replace(Ext.encode(fieldDb),Ext.encode(field));
            localStorage.setItem(this.getStorageId(),newTableStr);
        }
    },
 
    del:function(field)
    {//删除
        var table = this.getAll();
        var fieldDb = this.queryByField(this.getRowId(),field[this.getRowId()]);
        if(fieldDb)
        {
            var tableStr = Ext.encode(table);
            var newTableStr = tableStr.replace(Ext.encode(fieldDb)+',','');
            newTableStr = tableStr.replace(Ext.encode(fieldDb),'');
            localStorage.setItem(this.getStorageId(),newTableStr);
        }
    }
});