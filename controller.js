var colors = require('colors');
var fs = require('fs');

var controller = {
  add: function (client, clientRequestArray, todos) {
    var taskToAdd = clientRequestArray[1];

    if (!taskToAdd) {
      client.write("'add' requires a second paramter.\n Type 'help' for usage instructions.\n ");
      client.end();
    }

    todos.push({
      task: clientRequestArray[1].trim(),
      completed: false
    });

    fs.writeFile('./lib/data.json', JSON.stringify(todos), function(err){
      if (err) { console.log(err) }
    });

    client.write( colors.green("Task added!\n") );
    client.end();
  },
  completed: function (client, clientRequestArray, todos) {
    var completedTask = clientRequestArray[1].trim();

    if (!completedTask) {
      client.write("'add' requires a second paramter.\n Type 'help' for usage instructions.\n ");
      client.end();
    }

    todos.forEach(function(todo){
      if (todo.task === completedTask) {
        todo.completed = true;
      }
    });

    fs.writeFile('./lib/data.json', JSON.stringify(todos), function(err){
      if (err) { console.log(err) }
    });

    client.write( colors.green("Task status updated\n") );
    client.end();
  },
  list: function (client, todos) {
    client.write( colors.cyan.bold.underline("All ToDo Items:\n") );
    todos.forEach(function(todo){
      if (todo.completed === false) {
        client.write( colors.green( todo.task + ": incomplete \n") );
      } else {
        client.write( colors.strikethrough.red( todo.task + ": complete \n")  );
      }
    })
    client.end();
  },
  help: function (client) {
    client.write( colors.red.bold.underline("Usage Commands:\n") );
    client.write( colors.green("add [ToDo] - add a new ToDo\n") );
    client.write( colors.green("completed [ToDo] - mark a ToDo as complete\n") );
    client.write( colors.green("list - see all ToDo items\n") );
    client.end()
  },
  default: function (client) {
    console.log( colors.rainbow("Unknown action attempted by client\n") ); 
    client.write( colors.red("Action not supported\n") );
    client.write( colors.red("Type 'help' to see all supported commands\n") );
    client.end();
  }
};

module.exports = controller;
