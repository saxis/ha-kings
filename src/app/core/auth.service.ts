import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName?: string;
  desiresCount?: number;
  desiresTotal?: number;
  obligationsCount?: number;
  obligationsTotal?: number;
  debtsCount?: number;
  debtsTotal?: number;
  assetsCount?: number;
  assetsTotal?: number;
  earningsCount?: number;
  earningsTotal?: number;
  financesTotal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider: firebase.auth.GoogleAuthProvider): any {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  updateUserData(user: User): any {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      desiresCount: 0,
      desiresTotal: 0,
      obligationsCount: 0,
      obligationsTotal: 0,
      debtsCount: 0,
      debtsTotal: 0,
      assetsCount: 0,
      assetsTotal: 0,
      earningsCount: 0,
      earningsTotal: 0,
      financesTotal: 0
    };

    if (userRef) {
      return userRef;
    } else {
      return userRef.set(data);
    }


  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }
    console.log('currentUser ', this.currentUser);
    return true;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/main']);
  }
}
