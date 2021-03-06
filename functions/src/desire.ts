import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { user } from 'firebase-functions/lib/providers/auth';

const db = admin.firestore();

export const desireCount = functions.firestore
  .document('desires/{desireId}')
  .onCreate(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      desiresCount: userData.desiresCount + 1,
      desiresTotal: userData.desiresTotal + Number(data.amount)
    });
})

export const desireDecrement = functions.firestore
  .document('desires/{desireId}')
  .onDelete(async (snapshot, context) => {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      desiresCount: userData.desiresCount - 1,
      desiresTotal: userData.desiresTotal - Number(data.amount)
    });
})

export const desireUpdate = functions.firestore
  .document('desires/{desireId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const userRef = db.doc(`users/${before.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (before.fulfilled === false && after.fulfilled === true) {
      return userRef.update({
        earningsTotal: userData.earningsTotal - before.amount,
        desiresTotal: userData.desiresTotal - before.amount
      })
    } else {
      return 304
    }
});
