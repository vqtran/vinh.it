var express = require('express');
var engine = require('ejs-locals');
var sass = require('./app/util/sass-build.js');
var error = require('./app/util/error.js');

var app = express();

sass.build(__dirname + '/sass/', __dirname + '/public/stylesheets/');
app.use('/', express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(error.logErrors);
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

var message = "hello world";

app.get('/', function(req, res) {
    res.render('index', {message: message});
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port' + port);
