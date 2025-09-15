import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User { id: string; email?: string; name?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  signIn(email: string, _password: string): Observable<User> {
    const u = { id: 'local-' + btoa(email), email };
    this._user$.next(u);
    localStorage.setItem('hak_user', JSON.stringify(u));
    return of(u);
  }
  signOut(): void {
    this._user$.next(null);
    localStorage.removeItem('hak_user');
  }
  restore(): void {
    const raw = localStorage.getItem('hak_user');
    if (raw) this._user$.next(JSON.parse(raw));
  }
}
