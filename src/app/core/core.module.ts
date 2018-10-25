import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRootingModule } from './core-rooting.module';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CoreRootingModule,
    HttpClientModule
  ],
  exports:[CoreRootingModule, HttpClientModule],  
  providers:[ ApiService ],
  declarations: []
})
export class CoreModule { }
