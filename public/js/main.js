define([
	'backbone'
	,'utils/Global'
	,'controllers/Controller'
	,'views/List'
	,'views/Details'
],function(B, _g, Controller, List, Details){
	if(!window._tnmtapp){
		trace("MAIN:: module define");
		var stage,
		f = function(){
			return {
				init: this.init,
				remove: this.remove
			}
		}
		
		f.prototype.init = function(div){
			trace("APP:: init called...");
			stage = document.querySelector(div) || document.getElementById(div);
			_g.preloader = $('#preloader');

			// build main view, init controller & fetch data
			_g.list = new List({ collection: _g.articles }).render();
			_g.details = new Details().render();
			_g.details.$el.hide();

			stage.appendChild(_g.list.el);
			stage.appendChild(_g.details.el);

			Controller.init();	

			_g.articlesIndex = 1;
			_g.articles.fetch({ 
				success:function(data){
					trace("APP:: done loading...");
					_g.preloader.removeClass('active');
				}
			});

		}
		f.prototype.remove = function(){
			trace("APP:: destroy app");
			Controller.remove();
			
			_g.articles.reset();
			if (_g.view){
				_g.view.remove();
				_g.view = null;
			}	
			if (_g.details){
				_g.details.remove();
				_g.details = null;
			}
			
		}
		window._tnmtapp = new f();
	}
	return window._tnmtapp;
})