var net = require('net');
var fs = require('fs');
var colors = require('colors');

var controller = require('./controller.js');
var server = net.createServer();

var todos = JSON.parse( fs.readFileSync('./data.json') );

server.on('connection', function(client) { 
  console.log('client connected');
  client.write( colors.rainbow("Welcome to our ToDo Application!") );
  client.write("\n");

  client.setEncoding('utf8');

  client.on('data', function(stringFromClient) {
    
    var clientRequestArray = stringFromClient.split(" ")

    switch ( clientRequestArray[0].trim() ) {
      case 'add':
        controller.add(client, clientRequestArray, todos);
        break;

      case 'completed':
        controller.completed(client, clientRequestArray, todos);
        break;

      case 'list':
        controller.list(client, todos);
        break;

      case 'help':
        controller.help(client);
        break;

      default:
        console.log( colors.rainbow("Unknown action attempted by client") ); 
        client.write( colors.red("Action not supported") );
        client.write( colors.red("Type 'help' to see all supported commands") );
        client.end();
    }

  });
});

server.listen(8124, function() { 
  console.log( colors.rainbow('Listening on port 8124') );
});