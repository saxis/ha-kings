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
        obligationsTotal: userData.obligationsTotal + Number(data.expectedAmount)
    });
}));
exports.obligationDecrement = functions.firestore
    .document('obligations/{obligationId}')
    .onDelete((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        obligationsCount: userData.obligationsCount - 1,
        obligationsTotal: userData.obligationsTotal - Number(data.expectedAmount)
    });
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
        return userRef.update({
            earningsTotal: userData.earningsTotal - after.amountPaid
        });
    }
    else {
        return 304;
    }
}));
//# sourceMappingURL=obligation.js.map
