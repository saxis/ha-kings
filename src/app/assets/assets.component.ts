import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


interface Asset {
  name: string;
  detail: string;
  amount: number;
}

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.sass']
})
export class AssetsComponent implements OnInit {
  notesCollection: AngularFirestoreCollection<Asset>;
  notes: Observable<Asset[]>;
  data = {
    name: 'Savings Account',
    detail: 'Simple Backup Checking',
    amount: 100.0
  };

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.notesCollection = this.afs.collection('assets'); // reference
    this.notes = this.notesCollection.valueChanges(); // observable of notes data
  }

  addData() {
    this.notesCollection = this.afs.collection('assets');
    this.notesCollection.add(this.data)
      .then(() => console.log('success'))
      .catch(err => console.log(err));
  }

}
