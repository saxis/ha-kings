import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const obligationIncrement = functions.firestore
  .document('obligations/{obligationId}')
  .onCreate(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      obligationsCount: userData.obligationsCount + 1,
      obligationsTotal: userData.obligationsTotal + Number(data.expectedAmount)
    });
})

export const obligationDecrement = functions.firestore
  .document('obligations/{obligationId}')
  .onDelete(async (snapshot, context) => {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      obligationsCount: userData.obligationsCount - 1,
      obligationTotal: userData.obligationTotal - Number(data.expectedAmount)
    });
});

export const obligationUpdate = functions.firestore
  .document('obligations/{obligationId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const userRef = db.doc(`users/${before.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (after.amountPaid) {
      return userRef.update({
        earningsTotal: userData.earningsTotal - after.amountPaid
      });
    } else {
      return 304
    }
});
