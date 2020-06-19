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
      obligationsScheduledTotal: userData.obligationsScheduledTotal + Number(data.expectedAmount)
    });
})

export const obligationDecrement = functions.firestore
  .document('obligations/{obligationId}')
  .onDelete(async (snapshot, context) => {
    const data = snapshot.data();
    const userRef = db.doc(`users/${data.owner}`);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (data.amountPaid) {
      return userRef.update({
        obligationsCount: userData.obligationsCount - 1,
        obligationsToDateTotal: userData.obligationsToDateTotal - Number(data.amountPaid),
        obligationsScheduledTotal: userData.obligationsScheduledTotal - Number(data.expectedAmount),
      });
    } else {
      return userRef.update({
        obligationsCount: userData.obligationsCount - 1,
        obligationsScheduledTotal: userData.obligationsScheduledTotal - Number(data.expectedAmount),
      });
    }

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

      console.log('In after.amountPaid')

      // db.collection('obligations').add({
      //   biller: 'my new bill',
      //   owner: userData.owner
      // })
      // .then(function(docRef) {
      //   console.log("Document successfully written!", docRef.id);
      // })
      // .catch(function(error) {
      //   console.error("Error writing document: ", error);
      // });

      return userRef.update({
        obligationsToDateTotal: userData.obligationsToDateTotal + Number(after.amountPaid)
      });

    } else {
      return 304
    }
});


//I can create a new Bill as soon as the last bill is paid. That is not complete though.
//A new bill should be created on the 1st day of the new month as well if one is
//not already present due to a previous bill being paid.
