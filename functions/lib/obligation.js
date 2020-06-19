"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const db = admin.firestore();
exports.obligationIncrement = functions.firestore
    .document('obligations/{obligationId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        obligationsCount: userData.obligationsCount + 1,
        obligationsScheduledTotal: userData.obligationsScheduledTotal + Number(data.expectedAmount)
    });
}));
exports.obligationDecrement = functions.firestore
    .document('obligations/{obligationId}')
    .onDelete((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    if (data.amountPaid) {
        return userRef.update({
            obligationsCount: userData.obligationsCount - 1,
            obligationsToDateTotal: userData.obligationsToDateTotal - Number(data.amountPaid),
            obligationsScheduledTotal: userData.obligationsScheduledTotal - Number(data.expectedAmount),
        });
    }
    else {
        return userRef.update({
            obligationsCount: userData.obligationsCount - 1,
            obligationsScheduledTotal: userData.obligationsScheduledTotal - Number(data.expectedAmount),
        });
    }
}));
exports.obligationUpdate = functions.firestore
    .document('obligations/{obligationId}')
    .onUpdate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const userRef = db.doc(`users/${before.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    if (after.amountPaid) {
        console.log('In after.amountPaid');
        // db.collection('obligations').add({
        //   biller: 'my new bill',
        //   owner: userData.owner
        // })
        // .then(function(docRef) {
        //   console.log("Document successfully written!", docRef.id);
        // })
        // .catch(function(error) {
        //   console.error("Error writing document: ", error);
        // });
        return userRef.update({
            obligationsToDateTotal: userData.obligationsToDateTotal + Number(after.amountPaid)
        });
    }
    else {
        return 304;
    }
}));
//I can create a new Bill as soon as the last bill is paid. That is not complete though.
//A new bill should be created on the 1st day of the new month as well if one is
//not already present due to a previous bill being paid.
//# sourceMappingURL=obligation.js.map