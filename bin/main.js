var express = require('express');
var workspce = require('../app');
//var http = require('http');
var app = express();

var server = workspce.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});