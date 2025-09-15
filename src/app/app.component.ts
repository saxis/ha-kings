import { Component } from '@angular/core';
import { AuthService, User } from './core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ha-kings2';
  user$: Observable<User | null>;

  constructor(public auth: AuthService) {
    this.auth.restore();
    this.user$ = this.auth.user$;
  }

  isLoggedIn(): boolean {
    return !!this.auth.user$.getValue?.() || !!localStorage.getItem('hak_user');
  }

  logout(): void {
    this.auth.signOut();
  }
}
