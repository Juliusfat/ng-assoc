import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MembersComponent, MemberDetailComponent]
})
export class MemberModule { }
