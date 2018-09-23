import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);
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
import { DesireItemComponent } from './desires/desire-item/desire-item.component';
import { ObligationDetailComponent } from './obligations/obligation-detail/obligation-detail.component';
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
    TrackerComponent,
    DesireItemComponent,
    ObligationDetailComponent
  ],
  providers: [
    AuthGuard
  ],
  imports: [
    CoreModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [AppComponent],
  exports: [ObligationDetailComponent]
})
export class AppModule { }
