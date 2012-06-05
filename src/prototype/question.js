Ext.define("C3.ux.Question",{
    extend: "Ext.Component", 

	constructor: function(config){
        this.callParent(arguments);
		this.initConfig(config);
		
		// Question specific config		
        this.data = config.data;
	},

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
        me.questionLabel = new Ext.Component({
			html: me.data.questionText,
			style: {
				color: "#666666",
				backgroundColor:"#ffffff",
				fontSize: "14px",
				marginBottom: "5px"
			}
		});
        
        me.containerPanel = new Ext.Panel({
        	items: [me.questionLabel],
        	bodyStyle: { border:"0 none", margin:"5px" },
        	renderTo: this.el
        }); 
    }

});

Ext.define("C3.ux.TextQuestion",{
    extend: "C3.ux.Question", 

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
        var input = new Ext.form.TextField({
        	value: me.data.defaultAnswer,
			allowBlank: false
		});
        
        me.containerPanel.add(input);
    }

});

Ext.define("C3.ux.RadioTextQuestion",{
    extend: "C3.ux.Question", 

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
        Ext.Array.each(me.data.answers, function(answer, index) {
    		var radio = new Ext.form.Radio({
				boxLabel: answer,
				name: "answer",
				handler: function() {
						
				}
			});
			
			if(answer == me.data.defaultAnswer) {
				radio.setValue(true);
			}
			
			me.containerPanel.add(radio);
		});        
    }
});

Ext.define("C3.ux.CheckBoxQuestion",{
    extend: "C3.ux.Question", 

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
        Ext.Array.each(me.data.answers, function(answer, index) {
    		var checkbox = new Ext.form.Checkbox({
				boxLabel: answer,
				handler: function() {
						
				}
			});
			
			if(me.data.defaultAnswer.indexOf(answer) > -1) {
				checkbox.setValue(true);
			}
			
			me.containerPanel.add(checkbox);
		});        
    }
});

Ext.define("C3.ux.DropDownQuestion",{
    extend: "C3.ux.Question", 

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
		var answers = new Ext.data.Store({
			fields: ["answer"],
			data: Ext.Array.map(me.data.answers, function(e) { 
				return { answer : e }; 
			})
		});
		
		var comboBox = new Ext.form.ComboBox({
			editable: false,
			store: answers,
			queryMode: "local",
			displayField: "answer",
			valueField: "answer"
		});
		
		if(me.data.defaultAnswer) {
			comboBox.setValue(me.data.defaultAnswer);
		}
        
        me.containerPanel.add(comboBox);
    }
});

Ext.define("C3.ux.RadioImageQuestion",{
    extend: "C3.ux.Question", 

    onRender: function() {  
        this.callParent(arguments); 
        var me = this;
        
        Ext.Array.each(me.data.answers, function(answer, index) {
    		var radio = new Ext.form.Radio({
				boxLabel: "<img src='"+answer.image+"' style='max-width:75px;max-height:75px'/>&nbsp;"+answer.name,
				name: "answer",
				handler: function() {
						
				}
			});
			
			if(answer.name == me.data.defaultAnswer) {
				radio.setValue(true);
			}
			
			me.containerPanel.add(radio);
		});        
    }
});

Ext.ns("C3.ux.QuestionFactory");

C3.ux.QuestionFactory.create = function(q) {
	switch(q.type) {
		case "text":
			return new C3.ux.TextQuestion({data: q});
		case "radioText":
			return new C3.ux.RadioTextQuestion({data: q});
		case "radioImage":
			return new C3.ux.RadioImageQuestion({data: q});
		case "dropdown":
			return new C3.ux.DropDownQuestion({data: q});
		case "checkbox":
			return new C3.ux.CheckBoxQuestion({data: q});
	}
};