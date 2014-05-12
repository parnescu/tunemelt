define([
	'backbone',
	'utils/Global',
	'text!/templates/ListElement.html'
], function(B, _g, tmp){
	return Backbone.View.extend({
		tagName: 'li',
		template: _.template(tmp),
		events:{
			'click a':'handleClick'
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()))
			return this;
		},
		handleClick: function(e){
			e.preventDefault();
			Backbone.trigger(_g.events.SHOW_ARTICLE, this.model);
		}
	})
})