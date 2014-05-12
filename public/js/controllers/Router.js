define([
	"backbone"
], function(B){
	return Backbone.Router.extend({
		routes: {
			':name': "detailsRoute"
		}
	});
})