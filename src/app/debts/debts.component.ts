import { Component, OnInit } from '@angular/core';
import { Debt } from '../../models/debt.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.sass']
})
export class DebtsComponent implements OnInit {
  debtsCollection: AngularFirestoreCollection<Debt>;
  debtsList$: Observable<Debt[]>;
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

    this.debtsCollection = this.afs.collection('debts', ref => ref.where('owner', '==', this.userId));
    this.debtsList$ = this.debtsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Debt;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  removeDebt(debt) {
    const doc = this.afs.doc(`debts/${debt.id}`);
    doc.delete();
  }

  onSubmit(f: NgForm) {
    const debt = new Debt(f.value.biller, f.value.original_financed_amount, f.value.principal_balance,
      f.value.due_date, f.value.past_due_amount, f.value.total_amount_due, f.value.interest_rate, f.value.payoff_amount, this.userId);

    const data = JSON.parse(JSON.stringify(debt));

    this.debtsCollection.add(data);

    f.reset();
  }

}
