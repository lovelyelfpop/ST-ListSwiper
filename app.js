/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setPath('UX', 'app/ux');
Ext.application({
    name: 'MyApp',

    requires: [
        'Ext.MessageBox',
        'Ext.Toast'
    ],

    views: [
        'Main',
        'View1',
        'View2'
    ],
	controllers: [
        'Main'
	],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        this.someTricks(); //小技巧
        this.registerEvents(); //事件
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('MyApp.view.Main'));
    },

     someTricks: function() {
        //安卓需要下面段代码才能使orientationchange事件生效
        if (Ext.os.is.Android) {
            Ext.Viewport.addWindowListener('resize', Ext.Function.bind(Ext.Viewport.onResize, Ext.Viewport));
            Ext.Viewport.updateSize(); //added
            Ext.Viewport.orientation = Ext.Viewport.determineOrientation(); //added
        }

        //解决点击穿透
        Ext.Viewport.onBefore('activeitemchange', 'beforeActiveItemChange', this);
        Ext.Viewport.onAfter('activeitemchange', 'afterActiveItemChange', this);
        Ext.Viewport.on({
            delegate: 'mask',
            show: 'maskShow',
            hide: 'maskHide',
            scope: this
        });
    },
    beforeActiveItemChange: function(container, newItem, oldItem) {
        if (newItem.element)
            newItem.element.addCls('prevent-pointer-events');
    },
    afterActiveItemChange: function(container, newItem, oldItem) {
        setTimeout(function() {
            if (newItem.element)
                newItem.element.removeCls('prevent-pointer-events');
        }, 300);
    },
    maskShow: function(mask) {
        var activeItem = Ext.Viewport.getActiveItem();
        if (activeItem.element)
            activeItem.element.addCls('prevent-pointer-events');
    },
    maskHide: function(mask) {
        var activeItem = Ext.Viewport.getActiveItem();
        setTimeout(function() {
            if (activeItem.element)
                activeItem.element.removeCls('prevent-pointer-events');
        }, 300);
    },
    
    registerEvents: function(){
        Ext.Viewport.onAfter('activeitemchange', function(viewport, value, oldValue) {//在各自的View里面触发
            value.fireEvent('activateview', value, oldValue);
            if (oldValue)
                oldValue.fireEvent('deactivateview', oldValue, value);
        }, Ext.Viewport);
        
        document.addEventListener("backbutton", Ext.Function.bind(this.onBackButton, this), false); //手机物理返回键(phonegap提供事件)
        //document.addEventListener("menubutton", Ext.Function.bind(this.onMenuButton, this), false); //手机物理菜单键(phonegap提供事件)
    },
    onBackButton: function() {
        // 1. 隐藏picker overlay等悬浮在view上的层
        var done = false;
        Ext.each(Ext.query('.x-floating'), function(el, idx) {
            var cmp = Ext.getCmp(el.id);
            if (cmp.isXType('title')) {//navigation.View的title和carousel的indicator也是.x-floating，所以要除外
                return true; //continue
            }
            else if (!cmp.isHidden()) {
                cmp.hide();
                done = true;
                return false; //break
            }
        });
        if (done) return;
        //2.回退view
        var activeItem = Ext.Viewport.getActiveItem();
        if(activeItem.isXType('navigationview'))
            activeItem.pop();
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});