Ext.onReady(function(){

    var mainPanel = new Ext.panel.Panel({
            title: 'Questions',
            width: 800,
            height: 400,
            renderTo: Ext.getBody(),
            collapsible: true,
            floating: true
        });

    var tpl = new Ext.XTemplate(
        '<div class="recommendationItem">',
        '<div class="img"></div>',
        '<div class="title">Replace Windows</div>',
        '<div class="description">Change your windows </div>',
        '<div class="cost">$500</div>',
        '<div class="addToPlan"></div>',
        '</div>'
    );
    tpl.overwrite(mainPanel.body, {});  // pass the root node of the data object

    Ext.create("Ext.Button",{
        text: "Add to Plan",
        renderTo: Ext.get(document.getElementsByClassName("addToPlan")[0])
    });

});