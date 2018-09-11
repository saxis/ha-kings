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
exports.desireCount = functions.firestore
    .document('desires/{desireId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        desiresCount: userData.desiresCount + 1,
        desiresTotal: userData.desiresTotal + Number(data.amount)
    });
}));
exports.desireDecrement = functions.firestore
    .document('desires/{desireId}')
    .onDelete((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        desiresCount: userData.desiresCount - 1,
        desiresTotal: userData.desiresTotal - Number(data.amount)
    });
}));
//# sourceMappingURL=desire.js.map