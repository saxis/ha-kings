import { Component, OnInit } from '@angular/core';
import { Desire } from '../../models/desire.model';
import { NgForm } from '@angular/forms';
// import { DragulaService } from 'ng2-dragula';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-desires',
  templateUrl: './desires.component.html',
  styleUrls: ['./desires.component.sass']
})
export class DesiresComponent implements OnInit {
  desiresCollection: AngularFirestoreCollection<Desire>;
  desiresList: Observable<Desire[]>;
  showdesireform = false;
  fulfilledList: Observable<Desire[]>;
  balance: Number = 100.00;
  userId: string;

  constructor(private afs: AngularFirestore, private as: AuthService) {
    this.as.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
   }

  ngOnInit() {
    this.desiresCollection = this.afs.collection('desires', ref => ref.where('owner', '==', this.userId));
    this.desiresList = this.desiresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Desire;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  removeDesire(desire) {
    const doc = this.afs.doc(`desires/${desire.id}`);
    doc.delete();
  }

  doNow(desire) {
    console.log('Clicking this should decrease the earnings total by the desires amount');
    console.log('It should be added to a list of desires fulfilled for the day/month');
    console.log('Fulfilled Desires needs to be its own collection reached via a subpage somehwere on the desires page');
  }

  onSubmit(f: NgForm) {
    console.log(typeof(f.value.amount));

    const desire = new Desire(f.value.name, f.value.detail, f.value.year, f.value.amount,
      f.value.scheduled, f.value.fulfilled, f.value.recipient, this.userId);

    const data = JSON.parse(JSON.stringify(desire));

    this.desiresCollection.add(data);
  }

}
