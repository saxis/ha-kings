import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-o-tracker',
  templateUrl: './o-tracker.component.html',
  styleUrls: ['./o-tracker.component.sass']
})
export class OTrackerComponent {

  constructor(public auth: AuthService) {
  }

}
