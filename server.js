var express = require('express');
var engine = require('ejs-locals');
var fs = require('fs');
var sass = require('./app/sass-build.js');
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

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/post/:id', function(req, res) {
    fs.readFile('posts/' + req.params.id + '.ejs', function (err, post) {
        res.render('post', {post: post});
    });
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port' + port);
