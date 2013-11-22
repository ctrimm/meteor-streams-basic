chatStream = new Meteor.Stream('chat');

if (Meteor.isClient) {
  //pretty basic example using Meter.Streams to transmit data from one client, to a checkpoint, 
  // through a set, of filters on the server, to another checkpoint, and then to all the clients. 

  //The filters can add to, modify, or delete the data 
  //The second checkpoint sees which clients can receive the data
  sendChat = function(message) {
    chatStream.emit('message', message);
    console.log('me: ' + message);
  };

  chatStream.on('message', function(message) {
    console.log('user: ' + message);
  });

  Template.hello.greeting = function () {
    return "Welcome to hello-streams. This uses Meteor.Streams";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button. To use Meteor.Streams, you need to use sendChat('message') in the console.");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
