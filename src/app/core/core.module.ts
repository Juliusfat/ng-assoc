import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRootingModule } from './core-rooting.module';
import { ApiService } from './api/api.service';

@NgModule({
  imports: [
    CommonModule,
    CoreRootingModule
  ],
  exports:[CoreRootingModule],  
  providers:[ ApiService ],
  declarations: []
})
export class CoreModule { }
