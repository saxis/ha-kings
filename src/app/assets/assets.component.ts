import { Component, OnInit } from '@angular/core';
import { Asset } from '../../models/asset.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.sass']
})
export class AssetsComponent implements OnInit {
  assetsCollection: AngularFirestoreCollection<Asset>;
  assetsList$: Observable<Asset[]>;
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

    this.assetsCollection = this.afs.collection('assets', ref => ref.where('owner', '==', this.userId));
    this.assetsList$ = this.assetsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Asset;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  removeAsset(asset) {
    const doc = this.afs.doc(`assets/${asset.id}`);
    doc.delete();
  }

  onSubmit(f: NgForm) {
    const purchase_val = Number(f.value.balance * f.value.purchase_price_per_full_unit).toFixed(2);
    const current_val = Number(f.value.balance * f.value.current_price_per_full_unit).toFixed(2);

    const debt = new Asset(f.value.asset_denomination, f.value.balance, f.value.purchase_price_per_full_unit,
      f.value.current_price_per_full_unit, purchase_val, current_val, this.userId);

    const data = JSON.parse(JSON.stringify(debt));

    this.assetsCollection.add(data);

    f.reset();
  }

}
