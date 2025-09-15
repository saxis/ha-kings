// src/app/earnings/earnings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from '../core/auth.service';

export interface Earning {
  id?: number; source: string; date?: string; amount: number; owner: string;
}

@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.sass']
})
export class EarningsComponent implements OnInit {
  earningsList: Observable<Earning[]> = of([]);
  userId = '';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.restore();
    this.earningsList = this.auth.user$.pipe(
      switchMap((u: User | null) => {
        this.userId = u?.id ?? '';
        return this.http.get<Earning[]>('/api/income').pipe(
          map(list => this.userId ? list.filter(e => e.owner === this.userId) : list)
        );
      })
    );
  }

  private reload(): void {
    this.earningsList = this.http.get<Earning[]>('/api/income').pipe(
      map(list => this.userId ? list.filter(e => e.owner === this.userId) : list)
    );
  }

  removeEarning(earning: Earning): void {
    if (!earning.id) return;
    this.http.delete(`/api/income/${earning.id}`).subscribe(() => this.reload());
  }

  onSubmit(f: NgForm): void {
    const payload: Earning = {
      source: f.value.source,
      date: f.value.date || null,
      amount: Number(f.value.amount || 0),
      owner: this.userId
    };
    this.http.post<Earning>('/api/income', payload).subscribe(() => this.reload());
    f.reset();
  }
}
