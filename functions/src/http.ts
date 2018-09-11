import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import * as express from 'express';

import * as cors from 'cors';

export const basicHTTP = functions.https.onRequest((req,res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).send('ERROR: you must supply a name :(')
  }

  res.send(`Hello ${name} from Firebase!`);
});

const app = express();
app.use(cors({ origin: true }))

app.get('/cat', (req, res) => {
  res.send('CAT');
})

app.get('/dog', (req, res) => {
  res.send('DOG');
})
export const api = functions.https.onRequest(app);
