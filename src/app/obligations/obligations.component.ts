// src/app/obligations/obligations.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService, User } from '../core/auth.service';

export interface Obligation {
  id?: number;
  biller: string;
  dueDate?: string;     // ISO yyyy-mm-dd
  datePaid?: string;    // ISO
  expectedAmount: number;
  amountPaid?: number;
  paid: boolean;
  owner: string;        // user id
}

@Component({
  selector: 'app-obligations',
  templateUrl: './obligations.component.html',
  styleUrls: ['./obligations.component.sass']
})
export class ObligationsComponent implements OnInit {
  obligationsList: Observable<Obligation[]> = of([]);
  userId = '';
  amountPaid = 0;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.restore();
    this.obligationsList = this.auth.user$.pipe(
      switchMap((u: User | null) => {
        this.userId = u?.id ?? '';
        return this.http.get<Obligation[]>('/api/obligations').pipe(
          map(list => this.userId ? list.filter(o => o.owner === this.userId) : list)
        );
      })
    );
  }

  reload(): void {
    this.obligationsList = this.http.get<Obligation[]>('/api/obligations').pipe(
      map(list => this.userId ? list.filter(o => o.owner === this.userId) : list)
    );
  }

  removeObligation(obligation: Obligation): void {
    if (!obligation.id) return;
    this.http.delete(`/api/obligations/${obligation.id}`).subscribe(() => this.reload());
  }

  payNow(f: NgForm, obligation: Obligation): void {
    if (!obligation.id) return;
    const patch = { paid: true, amountPaid: Number(f.value.amountPaid || 0) };
    this.http.put<Obligation>(`/api/obligations/${obligation.id}`, patch).subscribe(() => this.reload());
    f.reset();
  }

  onSubmit(f: NgForm): void {
    const payload: Obligation = {
      biller: f.value.biller,
      dueDate: f.value.dueDate || null,
      datePaid: f.value.datePaid || null,
      expectedAmount: Number(f.value.expectedAmount || 0),
      amountPaid: Number(f.value.amountPaid || 0),
      paid: false,
      owner: this.userId
    };
    this.http.post<Obligation>('/api/obligations', payload).subscribe(() => this.reload());
    f.reset();
  }
}
