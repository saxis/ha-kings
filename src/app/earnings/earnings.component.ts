import { Component, OnInit } from '@angular/core';
import { Earning } from '../../models/earning.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.sass']
})
export class EarningsComponent implements OnInit {
  earningsCollection: AngularFirestoreCollection<Earning>;
  earningsList: Observable<Earning[]>;
  userId: string;

  constructor(private afs: AngularFirestore, private as: AuthService) {
    this.as.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    // Need to get the current month and then add a where clause for the current month only

    this.earningsCollection = this.afs.collection('earnings', ref => ref.where('owner', '==', this.userId));
    this.earningsList = this.earningsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Earning;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  removeEarning(earning) {
    const doc = this.afs.doc(`earnings/${earning.id}`);
    doc.delete();
  }

  onSubmit(f: NgForm) {
    const earning = new Earning(f.value.source, f.value.date, f.value.amount, this.userId);

    const data = JSON.parse(JSON.stringify(earning));

    this.earningsCollection.add(data);
  }

}
