// src/app/mock/mock-backend.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

type DB = {
  assets: any[]; debts: any[]; goals: any[]; income: any[]; obligations: any[]; summary: any;
};

const db: DB = {
  assets: [
    { id: 1, name: 'Checking', amount: 4200 },
    { id: 2, name: 'Brokerage', amount: 18500 },
  ],
  debts: [
    { id: 1, name: 'Visa', balance: 1200, apr: 22.99, min_payment: 45 },
    { id: 2, name: 'Auto Loan', balance: 9800, apr: 5.2, min_payment: 275 },
  ],
  goals: [{ id: 1, name: 'Emergency Fund', target_amount: 15000, saved: 4200 }],
  income: [{ id: 1, source: 'Salary', cadence: 'biweekly', net_amount: 3200 }],
  obligations: [{ id: 1, name: 'Rent', cadence: 'monthly', amount: 2200 }],
  summary: { netWorth: 4200 + 18500 - (1200 + 9800), savingsRate: 0.22, dti: 0.18, runwayMonths: 4.2 },
};

function parse(url: string) {
  const m = url.match(/^\/api\/([^\/]+)(?:\/(\d+))?/);
  if (!m) return null;
  const [, coll, id] = m;
  return { coll, id: id ? Number(id) : null };
}

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('/api/')) return next.handle(req);

    const parsed = parse(req.url);
    if (!parsed) return next.handle(req);
    const { coll, id } = parsed as { coll: keyof DB; id: number | null };

    // Collections that exist
    if (!(coll in db)) return of(new HttpResponse({ status: 404 })).pipe(delay(100));

    // GET collection or item
    if (req.method === 'GET') {
      const body = id == null ? (db as any)[coll] : (db as any)[coll].find((x: any) => x.id === id);
      return of(new HttpResponse({ status: 200, body })).pipe(delay(150));
    }

    // POST create
    if (req.method === 'POST') {
      const items = (db as any)[coll];
      const newId = items.length ? Math.max(...items.map((x: any) => x.id)) + 1 : 1;
      const item = { id: newId, ...req.body };
      items.push(item);
      return of(new HttpResponse({ status: 201, body: item })).pipe(delay(150));
    }

    // PUT update
    if (req.method === 'PUT' && id != null) {
      const items = (db as any)[coll];
      const idx = items.findIndex((x: any) => x.id === id);
      if (idx === -1) return of(new HttpResponse({ status: 404 })).pipe(delay(100));
      items[idx] = { ...items[idx], ...req.body, id };
      return of(new HttpResponse({ status: 200, body: items[idx] })).pipe(delay(150));
    }

    // DELETE
    if (req.method === 'DELETE' && id != null) {
      const items = (db as any)[coll];
      const idx = items.findIndex((x: any) => x.id === id);
      if (idx === -1) return of(new HttpResponse({ status: 404 })).pipe(delay(100));
      items.splice(idx, 1);
      return of(new HttpResponse({ status: 204 })).pipe(delay(120));
    }

    return next.handle(req);
  }
}
