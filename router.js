var router = function(stringFromClient, client, controller, todos) {
  
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
      controller.default(client);
  }
};

module.exports = router;