import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { SortableDirective } from './sortable.directive';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, WINDOW_PROVIDERS],
  declarations: [SortableDirective]
})
export class CoreModule { }
