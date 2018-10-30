import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrimDirective } from './directives/trim.directive';

@NgModule({
  imports: [
    RouterModule
  ],
  exports: [ TrimDirective ],
  declarations: [ TrimDirective ]
})
export class SharedModule { }
