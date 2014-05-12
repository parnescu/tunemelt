define([
	"models/Article"
], function(Article){
	var obj = {},
	_c = Backbone.Collection.extend({
		model: Article,
		url: function(){ return '/api/articles/'+obj.articlesIndex}
	});


	obj.events = {
		SHOW_ARTICLE: "articleShow",
		CLOSE_ARTICLE: "articleClose",
		LOAD_ARTICLES: "getMoreData"
	}
	obj.articles = new _c();
	obj.articlesIndex = null;
	obj.currentArticle = null;
	
	obj.details = null;
	obj.list = null;
	obj.preloader = null;
	obj.scrollPosition = null;
	return obj;
})