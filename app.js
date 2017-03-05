module.exports = function(app, socket, express) {
  // var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var Model = require('./models');
  // var app = express();
  // var http = require('http').Server(app);
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  // var io = require('socket.io')(http);

  var index = require('./routes/index');

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  //app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', index);
  
  // catch 404 and forward to error handler
  var users = [];
  var io = socket;

  io.on('connection', function(socket){
    console.log('User got connected');

    socket.on('setUsername', function(name) {
      if(users.indexOf(name) > -1){
        console.log('User exists');
        socket.emit('userExists', { flag:false } );
      }
      else {
        console.log("User " + name + " connected");
        users.push(name);
        socket.emit('userSet', { userName:name } );
      }
    });

      socket.on('msg', function(data){
        console.log("Message Sent");
        Model.ChatMessage.create( {
          Message: data.message,
          User: data.user
        }).then(function(data) {
            io.sockets.emit('newmsg', data);
        });
      });

      socket.on('disconnect',function(){
        console.log('User got disconnected');
      });
  });
}




//
// module.exports = app;
