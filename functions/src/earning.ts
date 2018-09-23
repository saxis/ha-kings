import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const earningIncrement = functions.firestore
  .document('earnings/{earningId}')
  .onCreate(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      earningsCount: userData.earningsCount + 1,
      earningsTotal: userData.earningsTotal + Number(data.amount)
    });

  });

export const earningDecrement = functions.firestore
  .document('earnings/{earningId}')
  .onDelete(async (snapshot, context) => {

    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    return userRef.update({
      earningsCount: userData.earningsCount - 1,
      earningsTotal: userData.earningsTotal - Number(data.amount)
    });
});

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
