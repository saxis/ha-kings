import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ha-kings2';

  constructor(public auth: AuthService) {}

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
