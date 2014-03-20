var express = require('express');
var engine = require('ejs-locals');
var assets = require('connect-assets');
var error = require('./lib/error.js');
var fs = require('fs');
var app = express();
require("controllers-js")(app);

app.configure(function () {
    var config = {
        paths: ['assets/stylesheets', 'assets/javascripts'],
        buildDir: 'public/assets',
        build: { dev: true, prod: true },
        compress: { dev: true, prod: true }
    };
    app.use(assets(config));
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/app/views');
    app.use('/', express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(error.logErrors);
    app.use(error.clientErrorHandler);
    app.use(error.errorHandler);
    app.controllers();
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port' + port);
