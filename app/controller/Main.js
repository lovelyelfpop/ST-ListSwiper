Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'main'
        },
        control: {
            'container#welcome button': {
            	tap: 'openView'
            }
        }
    },
    openView: function (btn, e) {
    	var main = this.getMain(),
    		action = btn.config.action, //1 2 3 ...
    		viewXType = 'view' + action, 
    		views = Ext.ComponentQuery.query(viewXType), 
    		view = (views.length > 0) ? views[0] : Ext.widget(viewXType);
    	main.push(view);
    }
});