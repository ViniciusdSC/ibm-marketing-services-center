import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import watson from '~/services/watson';
import TicketAction from '~/IntentActions/TicketAction';

const app = express();
const server = http.createServer(app);
const io = socketIO(http);
const port = process.env.PORT || 3000;

// this route will be used in watson webhook
app.post('/actions', (req, res) => {
  const action = req.params.action

  if (!action || TicketAction[action]) {
    return res.send({
      response: 'Internal server error'
    });
  }

  return res.send(TicketAction[action](req.params));
});

io.on('connection', socket => {
  console.log(socket);
  const watsonInstance = watson();
  watsonInstance.createSession().then(() => {
    socket.on('message', text => {
      console.log('authorization');
      watsonInstance.sendMessage({ text })
        .then(res => {
          socket.emit('message', res.result.output.generic.text);
        })
    })
  })
});

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
