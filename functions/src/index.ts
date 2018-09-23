import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export { basicHTTP, api } from './http';
export { createUserRecord } from './auth';
export { desireCount, desireDecrement, desireUpdate } from './desire';
export { obligationIncrement, obligationDecrement, obligationUpdate } from './obligation';
export { earningIncrement, earningDecrement } from './earning';
