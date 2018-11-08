import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrimDirective } from './directives/trim.directive';
import { ShowPasswordFieldDirective } from './directives/show-password-field.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    RouterModule,
    MatDialogModule
  ],
  exports: [
    TrimDirective,
    ShowPasswordFieldDirective,
    ConfirmDialogComponent
  ],
  declarations: [
    TrimDirective,
    ShowPasswordFieldDirective,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
