// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { ObligationsComponent } from './obligations/obligations.component';
import { AssetsComponent } from './assets/assets.component';
import { DebtsComponent } from './debts/debts.component';
import { DesiresComponent } from './desires/desires.component';
import { EarningsComponent } from './earnings/earnings.component';
import { HeroComponent } from './hero/hero.component';
import { MediaComponent } from './media/media.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './core/auth.guard';
import { TrackerComponent } from './tracker/tracker.component';
import { DesireItemComponent } from './desires/desire-item/desire-item.component';
import { ObligationDetailComponent } from './obligations/obligation-detail/obligation-detail.component';
import { OTrackerComponent } from './o-tracker/o-tracker.component';
import { FTrackerComponent } from './f-tracker/f-tracker.component';
import { DTrackerComponent } from './d-tracker/d-tracker.component';

import { MockBackendInterceptor } from './mock/mock-backend.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    ObligationsComponent,
    AssetsComponent,
    DebtsComponent,
    DesiresComponent,
    EarningsComponent,
    HeroComponent,
    MediaComponent,
    FooterComponent,
    UserProfileComponent,
    TrackerComponent,
    DesireItemComponent,
    ObligationDetailComponent,
    OTrackerComponent,
    FTrackerComponent,
    DTrackerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [ObligationDetailComponent]
})
export class AppModule { }
