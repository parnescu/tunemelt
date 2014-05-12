define([
	'backbone',
	'utils/Global',
	'text!/templates/Details.html'
], function(B, _g, tmp){
	return Backbone.View.extend({
		tagName: 'article',
		id: "articleDetails",
		template: _.template(tmp),
		events: {
			'click .close': 'handleClose'
		},
		render: function(){
			if(this.model){
				this.$el.html(this.template(this.model.toJSON()));	
			}
			this.$el.show();
			return this;
		},
		handleClose: function(e){
			e.preventDefault();
			Backbone.trigger(_g.events.CLOSE_ARTICLE);
		}
	})
})