import { Component, OnInit } from '@angular/core';
import { Obligation } from '../../models/obligation.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-obligations',
  templateUrl: './obligations.component.html',
  styleUrls: ['./obligations.component.sass']
})
export class ObligationsComponent implements OnInit {
  obligationsCollection: AngularFirestoreCollection<Obligation>;
  obligationsList: Observable<Obligation[]>;
  userId: string;
  amountPaid: number;

  constructor(private afs: AngularFirestore, private as: AuthService) {
    this.as.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.obligationsCollection = this.afs.collection('obligations', ref => ref.where('owner', '==', this.userId));
    this.obligationsList = this.obligationsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Obligation;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  removeObligation(obligation) {
    const doc = this.afs.doc(`obligations/${obligation.id}`);
    doc.delete();
  }

  payNow(u: NgForm, obligation) {
    console.log(u.value.amountPaid);
    console.log(obligation);
    const doc = this.afs.doc(`obligations/${obligation.id}`);
    doc.update({paid: true, amountPaid: u.value.amountPaid });
    // console.log('Clicking this should decrease the earnings total by the desires amount');
  }

  onSubmit(f: NgForm) {
    const obligation = new Obligation(f.value.biller, f.value.dueDate, f.value.datePaid,
      f.value.expectedAmount, f.value.amountPaid, false, this.userId);

    const data = JSON.parse(JSON.stringify(obligation));

    this.obligationsCollection.add(data);
  }
  // biller: string;
  // dueDate: string;
  // datePaid?: string;
  // expectedAmount: number;
  // amountPaid: number;
  // paid: boolean;
  // owner: string;
}
