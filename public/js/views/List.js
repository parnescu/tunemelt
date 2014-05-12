define([
	'backbone',
	'views/ListElement'
], function(B, ListElement){
	return Backbone.View.extend({
		tagName: 'ul',
		id: "articlesList",
		initialize: function(){
			this.collection.on('add', this.addArticle, this);
		},
		render: function(){
			_.each(this.collection.models, this.addArticle, this);
			return this;
		},
		addArticle: function(model){
			this.$el.append(new ListElement({ model: model}).render().el);
		}
	});
})