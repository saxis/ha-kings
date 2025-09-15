// src/app/desires/desires.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from '../core/auth.service';
import { DTrackerComponent } from '../d-tracker/d-tracker.component';

export interface Desire {
  id?: number;
  name: string;
  detail?: string;
  year?: number;
  amount: number;
  fulfilled: boolean;
  donated?: boolean;
  recipient?: string;
  owner: string;
}

@Component({
  selector: 'app-desires',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DTrackerComponent],
  templateUrl: './desires.component.html',
  styleUrls: ['./desires.component.sass']
})
export class DesiresComponent implements OnInit {
  desiresList: Observable<Desire[]> = of([]);
  showdesireform = false;
  userId = '';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.restore();
    this.desiresList = this.auth.user$.pipe(
      switchMap((u: User | null) => {
        this.userId = u?.id ?? '';
        return this.http.get<Desire[]>('/api/desires').pipe(
          map(list => list.filter(d => (!this.userId || d.owner === this.userId) && !d.fulfilled))
        );
      })
    );
  }

  private reload(): void {
    this.desiresList = this.http.get<Desire[]>('/api/desires').pipe(
      map(list => list.filter(d => (!this.userId || d.owner === this.userId) && !d.fulfilled))
    );
  }

  removeDesire(desire: Desire): void {
    if (!desire.id) return;
    this.http.delete(`/api/desires/${desire.id}`).subscribe(() => this.reload());
  }

  doNow(desire: Desire): void {
    if (!desire.id) return;
    this.http.put(`/api/desires/${desire.id}`, { fulfilled: true }).subscribe(() => this.reload());
  }

  onSubmit(f: NgForm): void {
    const payload: Desire = {
      name: f.value.name,
      detail: f.value.detail || '',
      year: f.value.year ? Number(f.value.year) : undefined,
      amount: Number(f.value.amount || 0),
      fulfilled: false,
      donated: !!f.value.donated,
      recipient: f.value.recipient || '',
      owner: this.userId
    };
    this.http.post<Desire>('/api/desires', payload).subscribe(() => this.reload());
    f.reset();
  }
}
