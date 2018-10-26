import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRootingModule } from './core-rooting.module';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    CoreRootingModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[CoreRootingModule, HttpClientModule, SharedModule],  
  providers:[ ApiService ],
  declarations: []
})
export class CoreModule { }
