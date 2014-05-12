trace = function(g){console.log(g);}
require.config({
	baseUrl: "/js",
	paths: {
		'jquery': '/jquery/dist/jquery.min',
		'underscore': '/underscore/underscore',
		'backbone': '/backbone/backbone',
		'text': '/requirejs-text/text',
		'isotope': '/isotope/jquery.isotope'
	}
	,shim:{
		backbone:{
			deps: ['jquery','underscore','text'],
			exports: 'Backbone'
		},
		jquery: {
			exports: "$"
		}
	}
});

require([
	'js/main.js'
],function(app){
	require(['isotope'], function(iso){
		app.init('#main');
	});
	
});