// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DesiresComponent } from './desires/desires.component';
import { DesireItemComponent } from './desires/desire-item/desire-item.component';
import { DebtsComponent } from './debts/debts.component';
import { AssetsComponent } from './assets/assets.component';
import { EarningsComponent } from './earnings/earnings.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'desires', component: DesiresComponent },
  { path: 'desires/:id', component: DesireItemComponent },
  { path: 'debts', component: DebtsComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'earnings', component: EarningsComponent },
];
