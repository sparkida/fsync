/**
 * Fsync
 * File synchronization manager built with FTPimp
 * Author: Nick Riley
 */
;(function () {
    "use strict";
    var path = require('path'),
        env = process.env.NODE_ENV || 'dev',
        config = require('./config/config'),
        Fsync;
    config.env = env;
    config.apppath = __dirname;
    config.startpath = path.resolve(process.cwd());
    Fsync = require('./lib/fsync');
    Fsync.build(config);
}());
