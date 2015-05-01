module.exports = {
    logfile: __dirname + '/debug.log',
    base: 'http://localhost',
    port: 8081,
    ftp: require('./ftp'),
    root: 'main'
};
