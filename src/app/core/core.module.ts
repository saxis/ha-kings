import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { SortableDirective } from './sortable.directive';

@NgModule({
  imports: [
    CommonModule,
    SortableDirective // ✅ import instead of declare
  ],
  providers: [AuthService],
  // declarations: [SortableDirective] ❌ remove this
  exports: [SortableDirective]
})
export class CoreModule { }
