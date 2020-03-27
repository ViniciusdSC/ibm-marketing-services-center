import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import watson from '~/services/watson';
import TicketAction from '~/actions/TicketAction';
import { authorizate } from '~/services/auth';

const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_LIST);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

io.origins(process.env.CORS_LIST)

io.use(async (socket, next) => {
  const token = socket.handshake.query.token;
  socket.handshake.user_id = (await authorizate({ token })).data.data.user.user_id
  return next();
})

io.on('connection', function(socket) {
  const user_id = socket.handshake.user_id;
  const watsonInstance = watson();
  watsonInstance.createSession().then(() => {
    watsonInstance.sendMessage({ text: '', user_id }).then(res => {     
      const output = res.result.output;
      socket.emit('message', output.generic[0].text);
    });
    socket.on('message', (text) => {
      console.log(user_id)
      watsonInstance.sendMessage({ text, user_id })
        .then(res => {
          const output = res.result.output;
          console.log(output)
          socket.emit('message', output.generic[0].text);
        });
    });
  });
});

app.post('/actions', async (req, res) => {
  const action = req.body ? req.body.action : null;

  if (!action || !TicketAction[action]) {
    return res.send({
      response: 'Internal server error'
    });
  }

  return res.send({
    response: await TicketAction[action](req)
  });
});

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
