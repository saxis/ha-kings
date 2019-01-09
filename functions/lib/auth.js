"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
exports.createUserRecord = functions.auth.user().onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);
    return userRef.set({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
        desiresCount: 0,
        desiresTotal: 0,
        obligationCount: 0,
        obligationTotal: 0,
        debtsCount: 0,
        debtsTotal: 0,
        assetsCount: 0,
        assetsTotal: 0,
        earningsCount: 0,
        earningsTotal: 0
    });
});
//# sourceMappingURL=auth.js.map
