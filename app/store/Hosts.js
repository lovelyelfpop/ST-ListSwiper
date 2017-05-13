Ext.define('MyApp.store.Hosts', {
    extend: 'Ext.data.Store',
    alias: "store.hosts",
    requires: [
        "MyApp.model.Host"
    ],
    config: {
        autoLoad: true,
        model: 'MyApp.model.Host',
        data: [{
          address: 'http://218.4.111.6:8181/app1/'
        },{
          address: 'http://218.4.111.6:8181/app2/'
        },{
          address: 'http://218.4.111.6:8181/app3/'
        },{
          address: 'http://218.4.111.6:8181/app4/'
        },{
          address: 'http://218.4.111.6:8181/app5/'
        },{
          address: 'http://218.4.111.6:8181/app6/'
        }]
    }
});