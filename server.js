
var express = require('express');
var fs = require("fs");

var server = new express();
var pathApi = new express();
var port = 8888;


server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route url
server.get('/', function(req, res) {
    res.send( 'We have below endpoints <br /> <br /> 1. http://localhost:'+port+'/api/getCurrentTime <br /> 2. http://localhost:'+port+'/api/addName/Lohit');
});

// get current time
pathApi.get('/getCurrentTime', function(req, res) {
    var d = new Date();
    res.json( { "Hours": d.getHours(), "Minutes" :d.getMinutes(), "Seconds":d.getSeconds() } );
});

// append name to the text file
pathApi.get('/addName/:name', function(req, res) {
    fs.open('message.txt', 'a', function(err, fd) {
        if (err) throw err;
        fs.appendFile(fd, req.params.name+'\n', 'utf8', function(err) {
            fs.close(fd, (err) => {
                if (err) throw err;
            });
            if (err) throw err;
        });
        res.send('<b>'+req.params.name +'</b> added successfully to the file message.txt');
    });
});

server.use('/api', pathApi);

server.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
});