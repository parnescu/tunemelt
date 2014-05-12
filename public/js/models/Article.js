define([
	"backbone"
], function(B){
	return Backbone.Model.extend({
		idAttribute: 'guid',
		defaults:{
			id: -1,
			guid: -1,
			isActive: false,
			picture: "",
			title: "",
			subText: "",
			description: ""
		}
	})
})