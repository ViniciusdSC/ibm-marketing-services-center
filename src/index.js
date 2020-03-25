import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import watson from '~/services/watson';
import TicketAction from '~/actions/TicketAction';

const app = express();
const server = http.createServer(app);
const io = socketIO(http);
const port = process.env.PORT || 3000;

app.post('/actions', (req, res) => {
  const action = req.body.action;

  if (!action || !TicketAction[action]) {
    return res.send({
      response: 'Internal server error'
    });
  }

  return res.send({
    response: TicketAction[action]()
  });
})

io.on('connection', function(socket) {
  const watsonInstance = watson();
  watsonInstance.createSession().then(() => {
    socket.on('message', (text) => {
      watsonInstance.sendMessage({ text })
        .then(res => {
          const output = res.result.output;
          const intent = output.intents.length === 0
            ? 'default'
            : output.intents[0].intent;
          const action = TicketAction[intent]
            ? TicketAction[intent]
            : TicketAction['default'];
          action(output, socket);
        });
    });
  });
});

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
