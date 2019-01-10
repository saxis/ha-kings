import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const assetIncrement = functions.firestore
  .document('assets/{assetId}')
  .onCreate(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      assetsCount: userData.assetsCount + 1,
      assetsTotal: userData.assetsTotal + Number(data.current_value)
    });

  });

export const assettDecrement = functions.firestore
  .document('assets/{assetId}')
  .onDelete(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      assetsCount: userData.assetsCount - 1,
      assetsTotal: userData.assetsTotal - Number(data.current_value)
    });
});
