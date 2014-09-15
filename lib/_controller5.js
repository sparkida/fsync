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
            var userPath = control.config.root + path.sep + req.params[0],
                localPath = req.params[0];
            paths.local = localPath;
            paths.remote = userPath;
            dbg('>checking: ' +  userPath);
            ftp.chdir(control.config.root, function (err, success) {
                if (err) {
                    console.log(err);
                    ftp.mkdir(control.config.root, function (err, dirPath) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('dir created: ' + dirPath);
                            connectCallback();
                        }
                    });
                } else {
                    dbg('switched to root: ' + control.config.root);
                    check(localPath, userPath);
                }
            });
        },
        resolveTime = function (timeString) {
            return new Date(timeString).getTime()
        },
       
        //if directory doesn't exist, create it
        //the callback is only used if the directory was from a filepath
        checkDir = function (localpath, remotepath, runNow) {
            console.log('checking directory: ' + localpath + ' @ ' + remotepath);
            //TODO
            //cache = control.ftpControl.remoteCache,
            //recursive check through directories
            var cueFile = function (lpath, rpath) {
                    console.log(('checkdir->check: ' + localpath).red);
                    check(lpath, rpath);
                },
                getFilesHandler = function (err, filelist) {
                    var files, i = 0;
                    if (err) {
                        console.log('err -121');
                        console.log(err);
                    } else {
                        for (i; i < filelist.length ; i++) {
                            cueFile(path.join(localpath, filelist[i]), path.join(remotepath, filelist[i]));
                        }
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
            }, true);

        },
        //check is bound 
        check = function (localpath, remotepath) {
            //check if local remotepath is directory
            var getStats = function (err, stats) {
                    dbg(('stats retrieved: ' + localpath).cyan);
                    if (err) {
                        console.log('err -122');
                        console.log(err);
                    } else {
                        var isDir = stats.isDirectory();
                        if (isDir) {
                            dbg('checking directory'.cyan);
                            checkDir(localpath, remotepath);
                        } else {
                            dbg('checking file'.cyan);
                            var dirpath = path.dirname(remotepath),
                                continueUpload = function (err, data) {
                                    dbg('Fsync::check:mkdir >'.yellow);
                                    dbg(dirpath.yellow, localpath.yellow);
                                    if (err) {
                                        dbg(err);
                                    } else {
                                        if (data.length > 0) {
                                            dbg('The following directories were created:', data.join('\n'));
                                        }
                                    }
                                    stageUpload(localpath, remotepath, stats);
                                };

                            dbg('>checking remote parent directory: ' + dirpath);
                            ftp.run('MKD ' + dirpath, continueUpload, true, true);
                        }
                    }
                };
                //dirname = path.dirname(remotepath);

            console.log('>stat local: ' + localpath);
            //add to cue
            fs.stat(localpath, getStats)
            //console.log('>checking directory: ' + remotepath);
            //checkDir(remotepath, (dirname === remotepath) ? undefined : cueFile);
        },
        stageUpload = function (localpath, remotepath, stats) {
            console.log('>staging upload...comparing remote: ' + remotepath);
            //check if newer
            var readfile = function (err, fileArray) {
                    //control.ftp.keepAlive();
                    //ftp error
                    dbg('----fileArray: ',fileArray);
                    if (err) {
                        console.log('err -123');
                        console.log(err);
                        return;
                    }
                    //no file found
                    else if (fileArray.length === 0) {
                        console.log('>stageUpload: new file ' + localpath + ' -> ' + remotepath);
                        //TODO TODO TODO
                        upload(localpath, remotepath);
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
                        console.log('>stageUpload: syncing remote file');
                        //TODO TODO TODO
                        upload(localpath, remotepath);
                    } else {
                        console.log(sameAge ? '>stageUpload: remote file is synced' : '>stageUpload: remote file is newer');
                        main.run();
                        //res.status(200);
                        res.send({'msg': sameAge ? 'already synced' : 'not newer'});
                    }
                };
            ftp.ls(remotepath, readfile, true, true);
        },
        updateTime = function (localpath, remotepath) {
            ftp.ls(remotepath, function(err, fileArray) {
                //control.ftp.keepAlive();
                if (err) {
                    console.log(err);
                }
                var remoteTime = fileArray[0].mtime;
                console.log('updating local mtime: ' + localpath);
                fs.utimes(localpath, remoteTime/1000, remoteTime/1000);
                main.run();
            }, true);
        },
        upload = function (localpath, remotepath) {
            console.log(('>processing upload: ' + localpath + ' -> ' + remotepath).magenta);
            ftp.put([localpath, remotepath], function(err, data) {
                dbg(('>Upload: file put to remote ' + localpath).magenta);
                //control.ftp.keepAlive();
                if (err) {
                    //console.log(control);
                    console.log('err -124');
                    console.log(remotepath, err);
                } else {
                    updateTime(localpath, remotepath);
                    console.log('file updated: ' + remotepath);
                    res.status(200);
                    res.send({});
                }
                //console.log(control.ftp);
            }, true, true);
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

