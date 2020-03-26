import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import watson from '~/services/watson';
import TicketAction from '~/actions/TicketAction';

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

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  socket.handshake.user_id = 1
  return next();
})

io.on('connection', function(socket, teste) {
  console.log(socket.handshake);
  console.log('con')
  const watsonInstance = watson();
  watsonInstance.createSession().then(() => {
    socket.on('message', (text) => {
      watsonInstance.sendMessage({ text })
        .then(res => {
          const output = res.result.output;
          socket.emit('message', output);
        });
    });
  });
});

// app.post('/actions', async (req, res) => {
//   const action = req.body ? req.body.action : null;

//   if (!action || !TicketAction[action]) {
//     return res.send({
//       response: 'Internal server error'
//     });
//   }

//   return res.send({
//     response: await TicketAction[action](req)
//   });
// });

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
