/*
 * The fsync inializer
 * ./fsync-app.js
 * (c) 2014
 * Author: Nicholas Riley
 */
"use strict";
var that,
    Handler = function (Server, express, emitter) {
        var templateEngine,
            path = require('path'),
            templateConfig,
            loadPartials = function () {
                templateEngine.loadPartials(function (err, partials) {
                    if (err !== null) {
                        console.log(err);
                    }
                    that.partials = partials;
                    that.launchInstance();
                });
            };

        that = this;
        that.path = path;
        that.emitter = emitter;
        that.Server = Server;
        that.express = express;
        that.app = express();
        that.Controller = require('./controller');
        that.instance = Server.createServer(that.app);
        that.apppath = that.path.resolve(__dirname + '/..')
        that.bootpath = that.path.resolve(__dirname + '/../..')
        that.startpath = that.path.resolve(process.cwd())
        templateConfig = {
            defaultLayout: 'main',
            layoutsDir: path.join(that.apppath, 'views/layouts'),
            partialsDir: path.join(that.apppath, 'views/partials'),
            extname: '.hbs'
        };
        that.templateEngine = templateEngine = require('express3-handlebars').create(templateConfig);
        //load the template engine partials and then start the app  
        console.log(that.path.join(that.apppath, 'views'))
        templateEngine.loadTemplates(that.path.join(that.apppath, 'views'), loadPartials);
    },
    proto = Handler.prototype;
/*
 * Constructor for the Handler class
 */
Handler.createInstance = function (bind) { 
    return new Handler(
            bind.Server, 
            //bind.templateEngine, 
            bind.express, 
            bind.emitter
            ); 
};

proto.launchInstance = function () {
    var instance = that.instance;
    instance.on('listening', function () {
        console.log('fsync server listening on: 8081');
    });
    instance.on('close', function () {
        console.log('Killing server');
        instance.close();
    });
    //start the server
    instance.listen(8081);
    //returns new controller object
    //var control = that.Controller.build(that);
    that.Controller.build(that);
    //TODO - perform optional hooks
    //res.send(res.body.minify()) ....etc
};

module.exports = Handler;

