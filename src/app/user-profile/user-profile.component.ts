import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent {

  constructor(public auth: AuthService) { }

  onPayment (payment) {
    console.log('on payment: ', payment);
  }

  onError (error) {
    console.log('there was an error: ', error);
  }


}
