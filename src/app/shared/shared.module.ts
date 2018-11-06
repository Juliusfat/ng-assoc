import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrimDirective } from './directives/trim.directive';
import { ShowPasswordFieldDirective } from './directives/show-password-field.directive';

@NgModule({
  imports: [
    RouterModule
  ],
  exports: [
    TrimDirective,
    ShowPasswordFieldDirective
  ],
  declarations: [
    TrimDirective,
    ShowPasswordFieldDirective
  ]
})
export class SharedModule { }
