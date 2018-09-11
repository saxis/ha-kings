"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const cors = require("cors");
exports.basicHTTP = functions.https.onRequest((req, res) => {
    const name = req.query.name;
    if (!name) {
        res.status(400).send('ERROR: you must supply a name :(');
    }
    res.send(`Hello ${name} from Firebase!`);
});
const app = express();
app.use(cors({ origin: true }));
app.get('/cat', (req, res) => {
    res.send('CAT');
});
app.get('/dog', (req, res) => {
    res.send('DOG');
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=http.js.map