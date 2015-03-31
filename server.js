var net = require('net');
var fs = require('fs');
var colors = require('colors');

var router = require('./router.js');
var server = net.createServer();

var todos = JSON.parse( fs.readFileSync('./lib/data.json') );

server.on('connection', function(client) { 
  console.log('client connected');
  client.write( colors.rainbow("Welcome to our ToDo Application!") );
  client.write("\n");

  client.setEncoding('utf8');

  client.on('data', function(stringFromClient){
   router(stringFromClient, client, todos); 
  });
});

server.listen(8124, function() { 
  console.log( colors.rainbow('Listening on port 8124') );
});