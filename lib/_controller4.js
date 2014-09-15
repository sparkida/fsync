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
    ftpConfig = {},
    ftp,
    FTP = require('/home/nick/ftpimp'),
    dbg = function () {},
    Controller = function (build) {
        var n;
        control = this;
        handler = build;
        path = build.path;
        fs = require('fs'),
        control.app = build.app;
        control.config = require(path.join(handler.startpath, 'ftp.json'));
        //normalize root
        control.config.root = path.sep + control.config.root.trim(path.sep);
        ftpConfig = {};
        for (n in control.config) {
            if (control.config.hasOwnProperty(n)) {
                ftpConfig[n] = control.config[n];
            }
        }
        ftpConfig.debug = ftpConfig.ftpdebug;
        ftpConfig.ftpdebug = null;
        delete ftpConfig.ftpdebug;
        if (control.config.debug) {
            dbg = function () {
                for (n = 0; n < arguments.length; n++) {
                    console.log(arguments[n]);
                }
            };
        }
        ftp = FTP.create(ftpConfig, false);
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
    //template engine settings
    app.engine('.hbs', templateEngine.engine);
    app.set('views', path.join(handler.apppath, 'views'));
    app.set('view engine', '.hbs');
    app.set('error', false);
    //routes
    //DEP. as of Express4; app.use(app.router);
    //app.use(express.json());
    //app.use(express.urlencoded());
    //app.use(express.bodyParser());
    app.get(/getfiles\/?(.*)?/, readFiles);
    app.get(/sync\/?(.*)?/, sync);
    app.get('/', home);
    app.get('/favicon.ico', express.static(path.join(handler.apppath, 'public/favicon.ico')));
    app.use(express.static(path.join(handler.apppath, 'public/static')));
};

proto.home = function (req, res) {
    console.log('home');
    res.render('home');
};

/**
 * API call to upload a file if newer
 * then file on remote server */
proto.sync = function (req, res) {
    var update = false,
        connectCallback = function () {
            var userPath = control.config.root + path.sep + req.params[0],
                localPath = req.params[0];
            dbg('>checking: ' +  userPath);
            ftp.chdir(control.config.root, function (err, success) {
                if (err) {
                    console.log(err);
                    ftp.mkdir(control.config.root, function (err, dirPath) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('dir created: ' + dirPath);
                            check(localPath, userPath);
                        }
                    });
                } else {
                    check(localPath, userPath);
                }
            });
        },
        resolveTime = function (timeString) {
            return new Date(timeString).getTime()
        },
        check = function (localPath, remotePath) {
            dbg('>check: ' + localPath + ' -> ' + remotePath);
            ftp.put([localPath, remotePath], function (err, data) {
                if (err) {
                    if (undefined !== err.code && err.code === 'ENOENT') {
                        dbg(err);
                        dbg('invalid local filepath');
                    } else {
                        dbg('could not put file to server');
                    }
                } else {
                    dbg(data);
                    dbg('file put successfully');
                }
            });           
        };
    dbg('sync > ' + req.params[0]);
    if (ftp.socket === null) {
        dbg('--- starting new socket ---');
        ftp.connect(connectCallback);
    } else {
        dbg('--- using existing socket ---');
        connectCallback();
    }
};

/**
 * API call to read files from a given directory
 * set in the request parameters */
proto.readFiles = function (req, res) {
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
            dbg('getting stats: ' + file);
            var filepath = path.join(root, file),
                readstat = function (err, stats) {
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
                    }
                };
            fs.stat(filepath, readstat);
        }),
        read = function (err, filelist) {
            if (err) {
                console.log('err -125');
                console.log(err);
            } else {
                files = filelist;
                fileLength = files.length;
                if (fileLength === 0) {
                    console.log('dir is empty: ' + root);
                    res.send();
                } else {
                    //console.log(files);
                    count = 0;
                    for(i = 0; i < fileLength; i++) {
                        set(files[i]);
                    }
                }
            }
        };
    console.log('fetching list: ' + root);
    fs.readdir(root, read);
};

/*
process.on('uncaughtException', function (err) {
    console.log(err);
    console.log('124124124');
});*/

module.exports = Controller;

