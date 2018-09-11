"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var http_1 = require("./http");
exports.basicHTTP = http_1.basicHTTP;
exports.api = http_1.api;
var auth_1 = require("./auth");
exports.createUserRecord = auth_1.createUserRecord;
// export { gameCount } from './firestore';
var desire_1 = require("./desire");
exports.desireCount = desire_1.desireCount;
exports.desireDecrement = desire_1.desireDecrement;
//# sourceMappingURL=index.js.map