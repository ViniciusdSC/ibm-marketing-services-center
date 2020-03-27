'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _TicketAction = require('./actions/TicketAction');

var _TicketAction2 = _interopRequireDefault(_TicketAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_LIST);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
const port = process.env.PORT || 3000;

app.post('/actions', async (req, res) => {
  const action = req.body ? req.body.action : null;

  if (!action || !_TicketAction2.default[action]) {
    return res.send({
      response: 'Internal server error'
    });
  }

  return res.send({
    response: await _TicketAction2.default[action](req)
  });
});

app.listen(port, function () {
  console.log(`listening on *:${port}`);
});
//# sourceMappingURL=index.js.map