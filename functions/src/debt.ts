import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const debtIncrement = functions.firestore
  .document('debts/{debtId}')
  .onCreate(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      debtsCount: userData.debtsCount + 1,
      debtsTotal: userData.debtsTotal + Number(data.total_amount_due)
    });

  });

export const debtDecrement = functions.firestore
  .document('debts/{debtId}')
  .onDelete(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      debtsCount: userData.debtsCount - 1,
      debtsTotal: userData.debtsTotal - Number(data.total_amount_due)
    });
});
