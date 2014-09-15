/*
 * The fsync inializer
 * ./fsync-app.js
 * (c) 2014
 * Author: Nicholas Riley
 */
"use strict";
var control,
    handler,
    path,
    fs,
    Controller = function (build) {
        control = this;
        handler = build;
        path = build.path;
        fs = require('fs'),
        control.app = build.app;
        control.init();
    },
    proto = Controller.prototype;
/*
 * Constructor for the Controller class
 */
Controller.build = function (bindHandler) { return new Controller(bindHandler); };
//first run
proto.init = function () {
    /*
     * Route the application parameters, and 
     * handle middleware
     */
    var app = control.app,
        templateEngine = handler.templateEngine,
        express = handler.express,
        //routes
        readFiles = control.readFiles,
        sync = control.sync,
        home = control.home,
        post = control.post;

    control.sync.connect();
    //template engine settings
    app.engine('.hbs', templateEngine.engine);
    app.set('views', path.join(handler.apppath, 'views'));
    app.set('view engine', '.hbs');
    app.set('error', false);
    //routes
    //DEP. as of Express4; app.use(app.router);
    app.use(express.json());
    app.use(express.urlencoded());
    //app.use(express.bodyParser());
    app.get(/getfiles\/?(.*)?/, readFiles);
    app.get(/sync\/?(.*)?/, sync);
    app.get('/', home);
    app.use(express.favicon(path.join(handler.apppath, 'public/favicon.ico')));
    app.use(express.static(path.join(handler.apppath, 'public/static')));
};

proto.home = function (req, res) {
    console.log('home');
    res.render('home');
};

proto.ftp = null;
proto.connected = false;

proto.sync = function (req, res) {
    var check = function (filepath) {
        var isDir = function (err, stats) {
            if(stats.isDirectory()) {
                console.log('skipping directory for now');
            } else {
                upload(filepath);
            }
        };
        fs.stat(filepath, isDir);
    },
    upload = function (filepath) {
        console.log('putting file...');
        control.ftpCue.push([filepath, filepath, function(err) {
            if(err) {
                console.log(err);
                return;
            }
            console.log('file updated: ' + filepath);
            res.status(200);
            res.send({});

        }]);
    };
    console.log('--------sync---------');
    console.log(req.params[0]);
    check(req.params[0]);
};

proto.ftpCue = {
    cue: []
};

proto.ftpCue.push = function (args) {
    var from = args[0],
        to = args[1],
        callback = args[2],
        cue = control.ftpCue.cue;

    if (cue.length > 0) {
        
    }
};

//connect to ftp
proto.sync.connect = (function () {
    //only need this once, when the handler's startpath
    //has been set
    var JSFtp = require('jsftp'),
        config = require(path.join(handler.startpath, 'ftp.json')),
        connect = function () {
            console.log('connecting');
            control.ftp = new JSFtp(config);
            control.connected = true;
            console.log('connected');
        };
    connect();
    return connect;
});

proto.readFiles = function (req, res) {
    console.log(req.params[0]);
    console.log(req.params[1]);
    var root = req.params[0] || handler.startpath,
        i,
        files,
        fileLength,
        count,
        paths = {
            dirs: [],
            files: []
        },
        type = '',
        set = (function (file) {
            var readstat = function (err, stats) {
                    count += 1;
                    if (err) {
                        console.log(err);
                    } else {
                        type = stats.isDirectory() ? 'dirs' : 'files';
                        paths[type].push(file);
                    }
                    //was this the last file?
                    if (count === fileLength) {
                        res.send(paths);
                        //next();
                    }
                };
            //console.log('reading ... '  + file);
            fs.stat(path.join(root, file), readstat);
        }),
        read = function (err, filelist) {
            if (err) {
                console.log(err);
                return;
            }
            files = filelist;
            fileLength = files.length;
            if (fileLength === 0) {
                console.log('dir is empty: ' + root);
                res.send();
                return;
            }
            //console.log(files);
            count = 0;
            for(i = 0; i < fileLength; i++) {
                set(files[i]);
            }
        };
    console.log('fetching list: ' + root);
    fs.readdir(root, read);
};

module.exports = Controller;

