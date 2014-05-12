trace = function(g){ console.log(g);}

var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	app = express(),

	articles = [],
	articles_per_page = 10;

// read the contents of the file for api 
fs.readFile(__dirname+"/data.json", 'utf8', function (err, data) {
	if (err){
		trace('SERVER:: reading failed... '+err)
		return;
	}
	articles = JSON.parse(data);
});

// moddleware support
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../bower_components')));


// routing ... this should be in a separate file along with the middleware... 
app.get('/', function(req, res){ res.render('layout')});
app.get('/api/articles/:number', function(req, res){
	trace("API:: get articles by page "+req.params.number);
	var position = (req.params.number-1)*articles_per_page;
	res.json(articles.slice(position, position+articles_per_page))
});
app.get('/api/article/:id', function(req, res){
	var articleName = req.params.id.replace(/\_/g, " ");
	trace("API:: get article by name: "+articleName);
	for (var i=0;i<articles.length;i++){
		if (articles[i].title === articleName){
			res.json(articles[i]);
			return;
		}
	}
	res.json({ reason: "No data available"});
});
app.get('/:other', function(req,res){ res.redirect('/#'+req.params.other);});


// launch the server
app.listen(app.get('port'));
trace("SERVER:: inited on localhost:"+app.get('port'));
