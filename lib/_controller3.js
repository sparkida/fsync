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
        control.config.root = '~' + path.sep + control.config.root.trim(path.sep);
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
        localPath = '',
        connectCallback = function () {
            console.log('>checking: ' + req.params[0]);
            ftp.chdir(control.config.root, function (err, success) {
                if (err) {
                    console.log(err);
                } else {
                    check(req.params[0]);
                }
            });
            //control.ftp.keepAlive();
            check(req.params[0]);
        },
        resolveTime = function (timeString) {
            return new Date(timeString).getTime()
        },
        checkDir = function (filepath, callback, uploadDir) {
        },
        //check is bound 
        check = function (filepath) {
        },
        stageUpload = function (filepath, stats) {
            console.log('>attempting to upload: ' + filepath);
            //check if newer
            ftp.ls(filepath, function (err, fileArray) {
                //control.ftp.keepAlive();
                console.log('>fetching remote for comparison: ' + filepath);
                //ftp error
                if (err) {
                    console.log('err -123');
                    console.log(err);
                    return;
                }
                //no file found
                else if (fileArray.length === 0) {
                    console.log('>new file');
                    //TODO TODO TODO
                    upload(filepath);
                    return;
                }
                //file found - should only be one file in array
                var file = fileArray[0],
                    localTime = resolveTime(stats.mtime),
                    localSize = parseInt(stats.size),
                    remoteTime = file.mtime,
                    remoteSize = parseInt(file.size),
                    newer = (localTime > remoteTime),
                    sameAge = (localTime === remoteTime),
                    differentSize = (localSize !== remoteSize);

                //console.log(localTime, localSize);
                //console.log(remoteTime, remoteSize);
                //check if we need to synchronize
                if ((sameAge && differentSize) || newer) {
                    console.log('>syncing remote file');
                    //TODO TODO TODO
                    upload(filepath);
                } else {
                    console.log(sameAge ? '>remote file is synced' : '>remote file is newer');
                    //res.status(200);
                    res.send({'msg': sameAge ? 'already synced' : 'not newer'});
                }
            });
        },
        updateTime = function (filepath) {
            ftp.ls(filepath, function(err, fileArray) {
                //control.ftp.keepAlive();
                if (err) {
                    console.log(err);
                }
                console.log(filepath, fileArray);
                var remoteTime = fileArray[0].mtime;
                console.log('updating local mtime: ' + filepath);
                fs.utimes(filepath, remoteTime/1000, remoteTime/1000);
            });
        },
        upload = function (filepath) {
            console.log('processing upload...' + filepath);
            ftp.put(filepath, function(err) {
                //control.ftp.keepAlive();
                if(err) {
                    //console.log(control);
                    console.log('err -124');
                    console.log(filepath, err);
                    return;
                }
                updateTime(filepath);
                console.log('file updated: ' + filepath);
                res.status(200);
                res.send({});
                //console.log(control.ftp);
            });
        };
    console.log('--------sync---------');
    console.log(req.params[0]);
    if (ftp.socket === null) {
        ftp.connect();
        ftp.events.once('ready', connectCallback);
    } else {
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
                console.log('err -125');
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

/*
process.on('uncaughtException', function (err) {
    console.log(err);
    console.log('124124124');
});*/

module.exports = Controller;

