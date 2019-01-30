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
    obligationsCount: 0,
    obligationTotal: 0,
    debtsCount: 0,
    debtsTotal: 0,
    assetsCount: 0,
    assetsTotal: 0,
    earningsCount: 0,
    earningsTotal: 0,
    financesTotal: 0
  });

});
