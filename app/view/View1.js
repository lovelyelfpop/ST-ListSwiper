Ext.define("MyApp.view.View1", {
    extend:"Ext.List",
    xtype:"main",
    requires:[ "MyApp.store.Hosts", 'UX.plugin.ListOptions' ],
    config:{
        title:"List",
        itemTpl:"{address}",
        store:{
            type:"hosts",
            storeId:"Hosts"
        },
        plugins:[ {
            type:"listopt",
            items:[ {
                action:"Edit",
                cls:"write",
                color:"blue",
                text:"Edit"
            }, {
                action:"Remove",
                cls:"trash",
                color:"red",
                text:"Delete"
            } ]
        } ]
    },
    initialize:function() {
        this.callParent(arguments);
        this.on({
            listoptiontap:"optTap",
            scope:this
        });
    },
    optTap:function(action, list, record) {
		Ext.Msg.alert("alert", "You clicked " + action);
    }
});