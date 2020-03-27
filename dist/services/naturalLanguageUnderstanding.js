'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyze = exports.instance = undefined;

var _v = require('ibm-watson/natural-language-understanding/v1');

var _v2 = _interopRequireDefault(_v);

var _auth = require('ibm-watson/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const instance = () => new _v2.default({
  authenticator: new _auth.IamAuthenticator({ apikey: process.env.NLU_API_KEY }),
  version: '2020-02-05',
  url: process.env.NLU_URL
});

const analyze = ({ text }) => instance().analyze({
  text,
  features: {
    categories: {
      explanation: true
    }
  }
}).catch(err => {
  console.log(`error: ${err}`);
});

exports.instance = instance;
exports.analyze = analyze;
//# sourceMappingURL=naturalLanguageUnderstanding.js.map