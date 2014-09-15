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

    proto.ftpControl.start();
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

proto.sync = function (req, res) {
    var check = function (filepath) {
        var isDir = function (err, stats) {
            if(stats.isDirectory()) {
                console.log('skipping directory for now');
            } else {
                console.log('attempting to upload: ' + filepath);
                upload(filepath);
            }
        };
        console.log('stat: ' + filepath);
        fs.stat(filepath, isDir);
    },
    upload = function (filepath) {
        console.log('processing upload...' + filepath);
        control.ftp.put(filepath, filepath, function(err) {
            if(err) {
                console.log(err);
                return;
            }
            console.log('file updated: ' + filepath);
            control.ftpControl.processCue();
            res.status(200);
            res.send({});
        });
    };
    console.log('--------sync---------');
    console.log(req.params[0]);
    control.ftpControl.connect(function () {
        console.log('checking: ' + req.params[0]);
        check(req.params[0]);
    });
};


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
    control.ftpControl.kill();
    fs.readdir(root, read);
};

proto.ftp = null;

/**
 * manages ftp connections */
proto.ftpControl = {
    connected: false,
    cue: []
};

/**
 * Load the ftp module and its configuration
 * then start the ftp connection */
proto.ftpControl.start = function () {
    control.ftpControl.connect = control.ftpControl.connect();
};

/**
 * We can only process one buffer at a time currently
 * so this is our cue to hold them. In the callback
 * we run the cue */
proto.ftpControl.processCue = function () {
    var cue = control.ftpControl.cue, 
        current;
    if (cue.length > 0) {
        current = cue.splice(0,1)[0];
        current.call(current);
    }
};

/**
 * This will manage the ftp socket connection.
 * When concurrent requests hit the server, we shouldn't
 * create multiple ftp connections, instead we can piggyback ...
 * */
proto.ftpControl.connect = (function () {
    console.log('ftpControl --- connecting');
    //only need this once, when the handler's startpath has been set
    var JSFtp = require('jsftp'),
        config = require(path.join(handler.startpath, 'ftp.json')),
        cue = control.ftpControl.cue,
        connect = function (callback) {
            var connecting;
            console.log('checking ftp status...');
            if (!control.ftpControl.connected) {
                if (null !== control.ftp && control.ftp.socket._connecting) {
                    //connection attemp in progress, add callback to cue
                    console.log('>awaiting connection...')
                    console.log('>adding callback to cue');
                    cue.push(callback);
                    return;
                } 
                cue.push(callback);
                console.log('>connecting...');
                control.ftp = new JSFtp(config);
                control.ftp.socket.on('connect', function () {
                    control.ftpControl.connected = true;
                    console.log('>ftp connected!');
                    console.log('>executing callback sequence...');
                    control.ftpControl.processCue();
                });
            } else {
                console.log('calling back');
                console.log(callback);
                callback();
            }
        };
    return connect;
});


proto.ftpControl.kill = function () {
    //we need to kill for each new page request, not ftp connection
    if (control.ftpControl.connected) {
        console.log('killing ftp');
        control.ftp.destroy();
        control.ftpControl.connected = false;
    }
};
/*
process.on('uncaughtException', function (err) {
    console.log(err);
    console.log('124124124');
});*/
module.exports = Controller;

