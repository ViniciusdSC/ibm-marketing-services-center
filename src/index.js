var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;

io.on('connection', function(socket){
  socket.on('message', (msg) => {
    console.log(`msg: ${msg}`);
    socket.emit('message', 'Ola Mundo');
  });
  console.log('user connected');
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});