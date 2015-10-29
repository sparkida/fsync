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
    ftp,
    log,
    express,
    app,
    config,
    dbg = function () {},
    fs = require('fs'),
    path = require('path'),
    FTP = require('ftpimp'),
    Controller = function () {
        control = this;
        control.app = app;
        config = config;
        control.handler = handler;
        ftp = FTP.create(config.ftp, false);
        //normalize root
        config.root = path.sep + config.root.trim(path.sep);
        control.init();
    },
    proto = Controller.prototype;


/*
 * Constructor for the Controller class
 */
Controller.build = function (handlerInstance) {
    console.log('building Controller class'.yellow);
    handler = handlerInstance;
    log = handler.log;
    express = handler.express;
    app = handler.app;
    config = handler.config;
    return new Controller();
};


//first run
proto.init = function () {
    /*
     * Route the application parameters, and 
     * handle middleware
     */
    var templateEngine = handler.templateEngine,
        //routes
        readFiles = control.readFiles,
        sync = control.sync,
        home = control.home,
        post = control.post;
    //template engine settings
    app.engine('.hbs', templateEngine.engine);
    app.set('views', path.join(config.apppath, 'views'));
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
    app.get('/favicon.ico', express.static(path.join(config.apppath, 'public/favicon.ico')));
    app.use(express.static(path.join(config.apppath, 'public/static')));
};

proto.home = function (req, res) {
    console.log('home');
    res.render('home');
};


var main = {
        cue: [],
        connected: false,
        started: false,
        processing: false,
        start: function () {
            main.started = true;
            ftp.connect(function () {
                main.connected = true;
                main.run();
            });
        },
        run: function () {
            if (main.cue.length === 0) {
                main.processing = false;
                dbg('main cue empty');
            } else {
                main.processing = true;
                main.cue.splice(0, 1)[0]();
            }
        }
    };


var Sync = function (req, res, localpath, remotepath) {
    var that = this;
    that.req = req;
    that.res = res;
    that.localpath = localpath;
    that.remotepath = remotepath;
	console.log(localpath);
    fs.stat(localpath, function (err, stats) {
        if (err) {
            console.log(err);
            return;
        }
        that.stats = stats;
        that.statHandler.call(that);
    });
};


Sync.create = function (req, res, localpath, remotepath) {
    return new Sync(req, res, localpath, remotepath);
};


Sync.prototype = {
    'localpath': '',
    'remotepath': '',
    'stats': {}
};


Sync.prototype.statHandler = function () {
    var that = this,
        stats = that.stats;
    if (stats.isDirectory()) {
        that.checkDir.call(that);
    }
    else {
        that.stageUpload.call(that);
    }
};


Sync.prototype.checkDir = function () {
    var that = this,
        localpath = that.localpath,
        remotepath = that.remotepath;

    console.log('checking directory: ' + localpath + ' @ ' + remotepath);
    //TODO
    //cache = control.ftpControl.remoteCache,
    //recursive check through directories
    var getFilesHandler = function (err, filelist) {
            var i = 0;
            if (err) {
                console.log('err -121');
                console.log(err);
            } else {
				console.log('filelist', filelist);
                var bindFunc = function (index) {
					console.log(index, filelist[index]);
                        main.cue.push(function () {
                            console.log(localpath, filelist[index]);
							console.log(remotepath, filelist[index]);
                            Sync.create(path.join(localpath, filelist[index]), path.join(remotepath, filelist[index]));
                        });
                    };
                for (i; i < filelist.length ; i++) {
                    bindFunc(i);
                }
                main.run();
            }
        };

    ftp.run('MKD ' + remotepath, function (err, dir) {
        console.log('making remote directories: ' + remotepath);
        //control.ftp.keepAlive();
        //to be uploaded, not an entire directory 
        if (!err) {
            console.log('>remote directories created: ' + dir);
        }
        fs.readdir(localpath, getFilesHandler);
    }, true, true);
};


Sync.prototype.stageUpload = function () {
    //check if newer
    var that = this,
        localpath = that.localpath,
        remotepath = that.remotepath,
        stats = that.stats,
        readfile = function (err, fileArray) {
            //control.ftp.keepAlive();
            //ftp error
            if (err || fileArray.length === 0) {
                console.log('>stageUpload: new file ' + localpath + ' -> ' + remotepath);
                that.upload.call(that);
                return;
            }

            //file found - should only be one file in array
            var file = fileArray[0],
                localTime = that.resolveTime(stats.mtime),
                localSize = parseInt(stats.size),
                remoteTime = file.mtime,
                remoteSize = parseInt(file.size),
                newer = (localTime > remoteTime),
                sameAge = (localTime === remoteTime),
                differentSize = (localSize !== remoteSize),
                compare = sameAge ? 'synced' : 'newer';

            //console.log(localTime, localSize);
            //console.log(remoteTime, remoteSize);
            //check if we need to synchronize
            if ((sameAge && differentSize) || newer) {
                console.log('>stageUpload: syncing remote file'.cyan);
                //TODO TODO TODO
                that.upload.call(that);
            } else {
                console.log('>stageUpload: remote file is ' + compare);
                that.res.send({
                    status: 1,
                    msg: compare
                });
                main.run();
                //res.status(200);
                //that.res.send({'msg': sameAge ? 'already synced' : 'not newer'});
            }
        };
    console.log(('>staging upload...comparing remote: ' + remotepath).cyan);
    ftp.ls(remotepath, readfile, true, true);
};


Sync.prototype.resolveTime = function (timeString) {
    return new Date(timeString).getTime()
};


Sync.prototype.updateTime = function () {
    var that = this,
        localpath = that.localpath,
        remotepath = that.remotepath;

    console.log(('updating local mtime: ' + localpath).cyan);
    ftp.ls(remotepath, function(err, fileArray) {
        //control.ftp.keepAlive();
        if (err) {
            console.log(err);
        }
        console.log(('setting local mtime: ' + localpath).cyan);
        var remoteTime = fileArray[0].mtime;
        fs.utimes(localpath, remoteTime/1000, remoteTime/1000);
        main.run();
    }, true);
};


Sync.prototype.upload = function () {
    var that = this,
        localpath = that.localpath,
        remotepath = that.remotepath;
    console.log(('>processing upload: ' + localpath + ' -> ' + remotepath).magenta);
    ftp.put([localpath, remotepath], function(err, data) {
        dbg(('>Upload: file put to remote ' + localpath).magenta);
        //control.ftp.keepAlive();
        if (err) {
            //console.log(control);
            console.log('err -124');
            console.log(remotepath, err);
        } else {
            console.log('file updated: ' + remotepath);
            that.updateTime.call(that);
            /*that.res.status(200);
            that.res.send({});*/
            that.res.send({
                status: 1, 
                file: localpath
            });
        }
        //console.log(control.ftp);
    }, true, true);
};


/**
 * API call to upload a file if newer
 * then file on remote server */
proto.sync = function (req, res) {
    var update = false,
        paths = {
            local: '',
            remote: ''
        },
        connectCallback = function () {
            var remotepath = config.root + path.sep + req.params[0],
                localpath = req.params[0];
            paths.local = localpath;
            paths.remote = remotepath;
            dbg('>checking: ' +  remotepath);
            ftp.chdir(config.root, function (err, success) {
                if (err) {
                    console.log(err);
                    ftp.mkdir(config.root, function (err, dirpath) {
                        console.log('--------------------');
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('dir created: ' + dirpath);
                            connectCallback();
                        }
                    });
                } else {
                    dbg('switched to root: ' + config.root);
                    //compare local file to remote
                    Sync.create(req, res, localpath, remotepath);
                }
            });
        };
    dbg('sync > '.red + req.params[0]);
    main.cue.push(connectCallback);
    if ( ! main.started) {
        dbg('--- starting new socket ---');
        main.start();
    }
    else if (main.connected && ! main.processing) {
        main.run();        
    }
};


/**
 * API call to read files from a given directory
 * set in the request parameters */
proto.readFiles = function (req, res) {
    var root = req.params[0] || config.startpath,
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

