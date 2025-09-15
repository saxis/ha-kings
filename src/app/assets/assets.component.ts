// src/app/assets/assets.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from '../core/auth.service';

export interface Asset {
  id?: number;
  asset_denomination: string;
  balance: number;
  purchase_price_per_full_unit: number;
  current_price_per_full_unit: number;
  purchase_val: number;
  current_val: number;
  owner: string;
}

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.sass']
})
export class AssetsComponent implements OnInit {
  assetsList$: Observable<Asset[]> = of([]);
  userId = '';

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.restore();
    this.assetsList$ = this.auth.user$.pipe(
      switchMap((u: User | null) => {
        this.userId = u?.id ?? '';
        return this.http.get<Asset[]>('/api/assets').pipe(
          map(list => this.userId ? list.filter(a => a.owner === this.userId) : list)
        );
      })
    );
  }

  private reload(): void {
    this.assetsList$ = this.http.get<Asset[]>('/api/assets').pipe(
      map(list => this.userId ? list.filter(a => a.owner === this.userId) : list)
    );
  }

  removeAsset(asset: Asset): void {
    if (!asset.id) return;
    this.http.delete(`/api/assets/${asset.id}`).subscribe(() => this.reload());
  }

  onSubmit(f: NgForm): void {
    const balance = Number(f.value.balance || 0);
    const ppu = Number(f.value.purchase_price_per_full_unit || 0);
    const cpu = Number(f.value.current_price_per_full_unit || 0);

    const payload: Asset = {
      asset_denomination: f.value.asset_denomination,
      balance,
      purchase_price_per_full_unit: ppu,
      current_price_per_full_unit: cpu,
      purchase_val: Number((balance * ppu).toFixed(2)),
      current_val: Number((balance * cpu).toFixed(2)),
      owner: this.userId
    };

    this.http.post<Asset>('/api/assets', payload).subscribe(() => this.reload());
    f.reset();
  }
}
