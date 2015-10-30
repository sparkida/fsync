FTP-sync
--------
Browser based FTP file synchronization manager, built with NodeJS and FTPimp.

![FTP-Sync GUI](./fsync.png?raw=true "FTP-Sync GUI")

Setup
-----
1. Copy the `config/config.sample.js` to `config/config.js` and change `config/config.js` values as needed
1. Copy the `config/ftp.sample.js` to `config/ftp.js` and change `config/ftp.js` values as needed
3. Run `npm install`
4. Start the server `./start` or `node .`
5. Browse to http://localhost:8081/ -- or whatever port you set in the `config/config.js`
