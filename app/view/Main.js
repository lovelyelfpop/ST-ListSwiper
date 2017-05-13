Ext.define("MyApp.view.Main", {
    extend:"Ext.navigation.View",
    xtype: 'main',

    config: {

        autoDestroy: false,

        items:[ {
            xtype: "container",
            title: 'List/DataView Swiper',
            itemId: 'welcome',
            cls: 'welcome',
            scrollable: {
                direction: 'vertical',
                directionLock: true
            },

            defaults: {
                xtype: 'button',
                margin: '1em'
            },
            items: [{
                action: '1',
                text: 'View1(List)'
            }, {
                action: '2',
                text: 'View2(DataView)'
            }]
        } ]
    },

    initialize: function () {
        this.callParent(arguments);

        var me = this;
    }
});