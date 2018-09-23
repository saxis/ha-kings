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
exports.earningIncrement = functions.firestore
    .document('earnings/{earningId}')
    .onCreate((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        earningsCount: userData.earningsCount + 1,
        earningsTotal: userData.earningsTotal + Number(data.amount)
    });
}));
exports.earningDecrement = functions.firestore
    .document('earnings/{earningId}')
    .onDelete((snapshot, context) => __awaiter(this, void 0, void 0, function* () {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = yield userRef.get();
    const userData = userSnap.data();
    return userRef.update({
        earningsCount: userData.earningsCount - 1,
        earningsTotal: userData.earningsTotal - Number(data.amount)
    });
}));
// export const earningUpdate = functions.firestore
//   .document('earnings/{earningId}')
//   .onUpdate(async (snapshot, context) => {
//     const before = snapshot.before.data(); // 500.00
//     const after = snapshot.after.data(); // 700.00
//     let difference;
//     if (before.amount > after.amount) {
//       difference = before.amount - after.amount
//     } else {
//       difference = after.amount - before.amount - // 200
//     }
//     const userRef = db.doc(`users/${before.owner}`);
//     const userSnap = await userRef.get();
//     const userData = userSnap.data();
//     if (difference > 0) {
//       return userRef.update({
//         earningsTotal: userData.earningsTotal + difference;
//       })
//     } else {
//       return userRef.update({
//         earningsTotal: userData.earningsTotal - difference;
//       })
//     }
//     return userRef.update({
//       earningsCount: userData.earningsCount - 1,
//       earningsTotal: userData.earningsTotal - Number(data.amount)
//     });
// });
//# sourceMappingURL=earning.js.map