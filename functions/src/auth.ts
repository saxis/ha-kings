import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions.auth.user().onCreate((user, context) => {
  const userRef = db.doc(`users/${user.uid}`)

  return userRef.set({
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName,
    desiresCount: 0,
    desiresTotal: 0,
    obligationCount: 0,
    obligationTotal: 0,
    debtCount: 0,
    debtTotal: 0,
    assetCount: 0,
    assetTotal: 0,
    earningsCount: 0,
    earningsTotal: 0
  });

});
