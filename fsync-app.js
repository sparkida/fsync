/*
 * The fsync inializer
 * ./fsync-app.js
 * (c) 2014
 * Author: Nicholas Riley
 */
(function () {
    "use strict";
    //build environment for app
    var emitter = require('events').EventEmitter(),
        express = require('express'),
        Server = require('http');
    /*
     *  Handler.createInstance
     *  returns Handler object
     */
    require('./lib/handler').createInstance({
        'Server': Server,
        'emitter': emitter,
        //'templateEngine': templateEngine,
        'express': express
    });
}());

