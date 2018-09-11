import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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
