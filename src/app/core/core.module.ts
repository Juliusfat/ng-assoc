import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRootingModule } from './core-rooting.module';
import { ApiService } from './api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module'
import { MemberModule } from './member/member.module'
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRootingModule,
    HttpClientModule,
    SharedModule,
    MemberModule
  ],
  exports:[CoreRootingModule, HttpClientModule, SharedModule, HeaderComponent],  
  providers:[ ApiService ],
  declarations: [HeaderComponent]
})
export class CoreModule { }
