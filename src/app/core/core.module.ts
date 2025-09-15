import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { SortableDirective } from './sortable.directive';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [AuthService, WINDOW_PROVIDERS],
  declarations: [SortableDirective]
})
export class CoreModule { }
