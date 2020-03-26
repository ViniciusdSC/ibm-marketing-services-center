import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const instance = () => (
  new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: process.env.NLU_API_KEY }),
    version: '2020-02-05',
    url: process.env.NLU_URL
  })
);

const analyze = ({ text }) => (
  instance().analyze({
    text,
    features: {
      categories: {
        explanation: true
      }
    }
  }).catch(err => {
    console.log(`error: ${err}`);
  })
)

export {
  instance,
  analyze
}
