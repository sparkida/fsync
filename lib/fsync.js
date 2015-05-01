var http = require('http'),
    path = require('path'),
    EventEmitter = require('events').EventEmitter,
    express = require('express'),
    Controller = require('./controller'),
    HBS = require('express-handlebars'),
    logger = require('winston'),
    log,
    app = express(),
    server = http.createServer(app),
    templateEngine,
    config,
    fsync,
    transports = [
        new (logger.transports.Console)({colorize: true})
    ],
    Fsync = function () {
        var loadPartials = function () {
                log.info('loading partials...');
                templateEngine.getPartials().then(function (partials) {
                    log.info('partials loaded');
                    fsync.partials = partials;
                    fsync.start();
                });
            },
            templateConfig = {
                defaultLayout: 'main',
                layoutsDir: path.join(config.apppath, 'views/layouts/'),
                partialsDir: path.join(config.apppath, 'views/partials/'),
                extname: '.hbs'
            };
        fsync = this;
        fsync.config = config;
        fsync.express = express;
        fsync.log = log;
        fsync.app = app;
        fsync.http = http;
        fsync.server = server;
        fsync.templateEngine = templateEngine = HBS.create(templateConfig);
        templateEngine.getTemplates(path.join(config.apppath, 'views')).then(loadPartials);
    };

Fsync.build = function (initConfig) {
    config = initConfig;
    if (undefined !== config.logfile && config.logfile.length) {
        transports.push(new (logger.transports.File)({filename: config.logfile}));
    }
    log = new (logger.Logger)({transports: transports});
    log.info('Building Fsync...');
    configpath = config.configpath;
    config.publicpath = path.join(config.apppath, 'public');
    return new Fsync();
};

Fsync.prototype = new EventEmitter();

Fsync.prototype.start = function () {
    log.info('Starting Fsync server...');
    server.once('listening', fsync.handler);
    //listen last
    server.listen(config.port);
};

Fsync.prototype.handler = function () {
    log.info('Fsync server listening on ' + config.port);
    fsync.controller = Controller.build(fsync);
};

module.exports = Fsync;
//EOF lib/fsync.js
