import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from './member.service';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberAddComponent } from './components/member-add/member-add.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { RouterModule } from '@angular/router';
import { MemberLoginComponent } from './components/member-login/member-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToggleButtonModule } from "primeng/togglebutton";
import { MemberRoleComponent } from './components/member-role/member-role.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToggleButtonModule,
    MatDialogModule
  ],  
  declarations: [
    MembersComponent, 
    MemberDetailComponent, 
    MemberAddComponent, 
    MemberEditComponent, 
    MemberLoginComponent,
    MemberRoleComponent
  ],
  providers: [MemberService]
})
export class MemberModule { }
