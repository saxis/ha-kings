import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-desire-item',
  templateUrl: './desire-item.component.html',
  styleUrls: ['./desire-item.component.sass']
})
export class DesireItemComponent implements OnInit {
  item$;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.afs.doc('desires/' + id).valueChanges();
      })
    );
    // this.item$ = this.route.data.pipe(map(val => val[0]));
  }

}
