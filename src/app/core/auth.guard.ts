import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate() {
    this.auth.restore();
    return this.auth.user$.pipe(map(u => !!u || (this.router.navigate(['/login']), false)));
  }
}
