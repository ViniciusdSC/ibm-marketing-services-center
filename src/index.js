import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import watson from '~/services/watson';
import TicketIntentAction from '~/IntentActions/TicketIntentAction';

const server = http.createServer(express());
const io = socketIO(http);
const port = process.env.PORT || 3000;

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
          const action = TicketIntentAction[intent]
            ? TicketIntentAction[intent]
            : TicketIntentAction['default'];
          action(output, socket);
        });
    });
  });
});

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
