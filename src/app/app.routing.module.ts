import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObligationsComponent } from './obligations/obligations.component';
import { AssetsComponent } from './assets/assets.component';
import { DebtsComponent } from './debts/debts.component';
import { DesiresComponent } from './desires/desires.component';
import { DesireItemComponent } from './desires/desire-item/desire-item.component';
import { EarningsComponent } from './earnings/earnings.component';
import { AuthGuard } from './core/auth.guard';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'desires', component: DesiresComponent, canActivate: [AuthGuard], children: [ { path: ':id', component: DesireItemComponent } ] },
  { path: 'debts',      component: DebtsComponent, canActivate: [AuthGuard] },
  { path: 'obligations', component: ObligationsComponent, canActivate: [AuthGuard] },
  { path: 'earnings', component: EarningsComponent, canActivate: [AuthGuard] },
  { path: 'assets', component: AssetsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
