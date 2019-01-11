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
var desire_1 = require("./desire");
exports.desireCount = desire_1.desireCount;
exports.desireDecrement = desire_1.desireDecrement;
exports.desireUpdate = desire_1.desireUpdate;
var obligation_1 = require("./obligation");
exports.obligationIncrement = obligation_1.obligationIncrement;
exports.obligationDecrement = obligation_1.obligationDecrement;
exports.obligationUpdate = obligation_1.obligationUpdate;
var earning_1 = require("./earning");
exports.earningIncrement = earning_1.earningIncrement;
exports.earningDecrement = earning_1.earningDecrement;
var debt_1 = require("./debt");
exports.debtIncrement = debt_1.debtIncrement;
exports.debtDecrement = debt_1.debtDecrement;
var asset_1 = require("./asset");
exports.assetIncrement = asset_1.assetIncrement;
exports.assetDecrement = asset_1.assetDecrement;
//# sourceMappingURL=index.js.map