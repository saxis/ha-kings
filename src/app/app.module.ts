import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { ObligationsComponent } from './obligations/obligations.component';
import { AssetsComponent } from './assets/assets.component';
import { DebtsComponent } from './debts/debts.component';
import { DesiresComponent } from './desires/desires.component';
import { EarningsComponent } from './earnings/earnings.component';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from './hero/hero.component';
import { MediaComponent } from './media/media.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './core/auth.guard';
import { TrackerComponent } from './tracker/tracker.component';
export const firebaseConfig = environment.firebaseConfig;


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
    TrackerComponent
  ],
  providers: [
    AuthGuard
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
