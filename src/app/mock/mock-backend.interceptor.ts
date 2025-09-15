// src/app/mock/mock-backend.interceptor.ts
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

type Id = number;

export interface Asset {
  id: Id; asset_denomination: string; balance: number;
  purchase_price_per_full_unit: number; current_price_per_full_unit: number;
  purchase_val: number; current_val: number; owner: string;
}
export interface Debt {
  id: Id; biller: string; principal_balance: number;
  original_financed_amount?: number; due_date?: string;
  past_due_amount?: number; total_amount_due?: number;
  interest_rate?: number; payoff_amount?: number; owner: string;
}
export interface Desire {
  id: Id; name: string; detail?: string; year?: number;
  amount: number; fulfilled: boolean; donated?: boolean; recipient?: string; owner: string;
}
export interface Earning {
  id: Id; source: string; date?: string; amount: number; owner: string;
}
export interface Obligation {
  id: Id; name: string; cadence: 'monthly' | 'weekly' | 'yearly'; amount: number; owner: string;
}
export interface Summary {
  netWorth: number; savingsRate: number; dti: number; runwayMonths: number;
}
type DB = {
  assets: Asset[]; debts: Debt[]; desires: Desire[]; income: Earning[];
  obligations: Obligation[]; summary: Summary;
};

const owner = 'local-demo';

const db: DB = {
  assets: [
    { id: 1, asset_denomination: 'Checking', balance: 4200, purchase_price_per_full_unit: 1, current_price_per_full_unit: 1, purchase_val: 4200, current_val: 4200, owner },
    { id: 2, asset_denomination: 'Brokerage', balance: 10, purchase_price_per_full_unit: 1500, current_price_per_full_unit: 1850, purchase_val: 15000, current_val: 18500, owner }
  ],
  debts: [
    { id: 1, biller: 'Visa', principal_balance: 1200, past_due_amount: 0, total_amount_due: 45, interest_rate: 22.99, owner },
    { id: 2, biller: 'Auto Loan', principal_balance: 9800, total_amount_due: 275, interest_rate: 5.2, payoff_amount: 9800, owner }
  ],
  desires: [
    { id: 1, name: 'Noise-cancelling headphones', amount: 299, fulfilled: false, owner },
    { id: 2, name: 'Weekend trip', amount: 600, fulfilled: false, owner }
  ],
  income: [
    { id: 1, source: 'Salary', date: '2025-09-01', amount: 3200, owner },
    { id: 2, source: 'Freelance', date: '2025-09-07', amount: 800, owner }
  ],
  obligations: [
    { id: 1, name: 'Rent', cadence: 'monthly', amount: 2200, owner },
    { id: 2, name: 'Internet', cadence: 'monthly', amount: 80, owner }
  ],
  summary: { netWorth: 4200 + 18500 - (1200 + 9800), savingsRate: 0.22, dti: 0.18, runwayMonths: 4.2 }
};

function parse(url: string) {
  const m = url.match(/^\/api\/([^/]+)(?:\/(\d+))?/);
  if (!m) return null;
  const [, coll, id] = m;
  return { coll: coll as keyof DB, id: id ? Number(id) : null };
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) return next(req);
  const parsed = parse(req.url);
  if (!parsed) return next(req);

  const { coll, id } = parsed;

  if (!(coll in db)) return of(new HttpResponse({ status: 404 })).pipe(delay(50));

  // GET collection or item
  if (req.method === 'GET') {
    const body =
      id == null
        ? (db as any)[coll]
        : (db as any)[coll].find((x: any) => x.id === id);
    return of(new HttpResponse({ status: 200, body })).pipe(delay(120));
  }

  // POST create
  if (req.method === 'POST') {
    const items = (db as any)[coll] as Array<{ id: Id }>;
    const newId = items.length ? Math.max(...items.map((x: any) => x.id)) + 1 : 1;
    const b = (req.body as Record<string, any>) ?? {};
    const item = { id: newId, ...b };
    items.push(item as any);
    return of(new HttpResponse({ status: 201, body: item })).pipe(delay(120));
  }

  // PUT update
  if (req.method === 'PUT' && id != null) {
    const items = (db as any)[coll] as Array<Record<string, any>>;
    const idx = items.findIndex((x: any) => x.id === id);
    if (idx === -1) return of(new HttpResponse({ status: 404 })).pipe(delay(50));
    const b2 = (req.body as Record<string, any>) ?? {};
    items[idx] = { ...items[idx], ...b2, id };
    return of(new HttpResponse({ status: 200, body: items[idx] })).pipe(delay(120));
  }

  // DELETE
  if (req.method === 'DELETE' && id != null) {
    const items = (db as any)[coll] as Array<Record<string, any>>;
    const idx = items.findIndex((x: any) => x.id === id);
    if (idx === -1) return of(new HttpResponse({ status: 404 })).pipe(delay(50));
    items.splice(idx, 1);
    return of(new HttpResponse({ status: 204 })).pipe(delay(90));
  }

  return next(req);
};
