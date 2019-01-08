import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.sass']
})
export class TrackerComponent {
  balance: Number = 100.00;
  userId: string;
  desiresTotal: Number;

  constructor(public auth: AuthService) {
  }

}
