// src/app/debts/debts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from '../core/auth.service';

export interface Debt {
  id?: number;
  biller: string;
  original_financed_amount?: number;
  principal_balance: number;
  due_date?: string;
  past_due_amount?: number;
  total_amount_due?: number;
  interest_rate?: number;
  payoff_amount?: number;
  owner: string;
}

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.sass']
})
export class DebtsComponent implements OnInit {
  debtsList$: Observable<Debt[]> = of([]);
  userId = '';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.restore();
    this.debtsList$ = this.auth.user$.pipe(
      switchMap((u: User | null) => {
        this.userId = u?.id ?? '';
        return this.http.get<Debt[]>('/api/debts').pipe(
          map(list => this.userId ? list.filter(d => d.owner === this.userId) : list)
        );
      })
    );
  }

  private reload(): void {
    this.debtsList$ = this.http.get<Debt[]>('/api/debts').pipe(
      map(list => this.userId ? list.filter(d => d.owner === this.userId) : list)
    );
  }

  removeDebt(debt: Debt): void {
    if (!debt.id) return;
    this.http.delete(`/api/debts/${debt.id}`).subscribe(() => this.reload());
  }

  onSubmit(f: NgForm): void {
    const payload: Debt = {
      biller: f.value.biller,
      original_financed_amount: Number(f.value.original_financed_amount || 0),
      principal_balance: Number(f.value.principal_balance || 0),
      due_date: f.value.due_date || null,
      past_due_amount: Number(f.value.past_due_amount || 0),
      total_amount_due: Number(f.value.total_amount_due || 0),
      interest_rate: Number(f.value.interest_rate || 0),
      payoff_amount: Number(f.value.payoff_amount || 0),
      owner: this.userId
    };
    this.http.post<Debt>('/api/debts', payload).subscribe(() => this.reload());
    f.reset();
  }
}
