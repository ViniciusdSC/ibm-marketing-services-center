import express from 'express';
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
const port = process.env.PORT || 3000;

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

app.listen(port, function() {
  console.log(`listening on *:${port}`);
});
