define([
	'backbone'
	,'utils/Global'
	,'models/Article'
	,'controllers/Router'
],function(B, _g, Article, Router){
	if(!window.__tnmtactrl){
		var scope, isLoading = false, offset = 100,
		f = function(){
			scope = this;
			return {
				init: this.init,
				remove: this.remove
			}
		}
		f.prototype.handleScroll = function(){
			if (!isLoading && !_g.currentArticle){
				if($(window).scrollTop() >= $(document).height() - $(window).height() - offset) {
					isLoading = true;
				 	trace('CTRL:: --- load more data');

				 	_g.preloader.addClass('active');
				 	_g.articlesIndex++;
				 	_g.articles.fetch({ 
				 		success: function(data){
				 			setTimeout(function(){
				 				_g.preloader.removeClass('active');
				 			}, 1000)
			 				
				 			isLoading = false;
				 		}
				 	});
				 }
			}
			 
		}
		f.prototype.handleItemClick = function(model){
			trace('CTRL:: show article');
			_g.currentArticle = model;
			_g.router.navigate('/'+model.get('title').replace(/\s/g,"_"), {
				trigger: true
			});
		}	
		f.prototype.handleCloseItem = function(){
			trace('CTRL:: close article');
			_g.currentArticle = null;
			_g.details.$el.hide();
			_g.list.$el.show();
			_g.router.navigate('/', { trigger: true});
			
			window.scrollTo(0,_g.scrollPosition || 0);
			
		}
		f.prototype.handleArticleDetails = function(id){
			// there are more cases this function handles
			// 1. user clicks on a list item and it plainly displays the details
			// 2. user clicks back/next button in the browser
			// 3. link for details is accessed directly [or page refresh has happened]
			_g.scrollPosition = window.scrollY;
			_g.list.$el.hide();
			window.scrollTo(0,0);

			trace("CTRL:: ---> name: "+id)
			if (_g.currentArticle && _g.currentArticle.get('title').replace(/\s/g,"_") === id){
				//trace('CTRL:: render details view');
				_g.details.model = _g.currentArticle;
				_g.details.render();
			}else{
				var actualName = id.replace(/\_/g," ");
				_g.currentArticle = [];
				if (_g.articles.length > 0){
					_g.currentArticle = _g.articles.filter(function(model){
						return model.get('title') === actualName
					});					
					actualName = null;
				}

				if (_g.currentArticle.length > 0){
					_g.currentArticle = _g.currentArticle[0];
					//trace('CTRL:: render details view');
					_g.details.model = _g.currentArticle;
					_g.details.render();
				}else{
					trace('CTRL:: get article data from server');
					$.ajax({
						url: '/api/article/'+id
						,success: function(data){
							if (data.guid){
								//trace('CTRL:: render details view');
								_g.currentArticle = new Article(data);
								_g.articles.add(_g.currentArticle);
								
								_g.details.model = _g.currentArticle;
								_g.details.render();
							}
						}
						,error: function(){
							trace('baaang... error');
						}
					})
				}
			}
		}


		// entry points
		f.prototype.init = function(){
			trace("CTRL:: init...");
			// create router and listen to it's events
			// add event listeners for views
			_g.router = new Router();
			_g.router.on('route:detailsRoute', scope.handleArticleDetails);

			window.addEventListener('scroll', scope.handleScroll);
			Backbone.on(_g.events.SHOW_ARTICLE, scope.handleItemClick);
			Backbone.on(_g.events.CLOSE_ARTICLE, scope.handleCloseItem);
			Backbone.history.start({pushState:true});

		}
		f.prototype.remove = function(){
			_g.router = null;
			
			Backbone.off(_g.events.SHOW_ARTICLE);
			Backbone.off(_g.events.CLOSE_ARTICLE);
			Backbone.history.stop();
		}

		window.__tnmtactrl = new f();
	}
	
	return window.__tnmtactrl
})