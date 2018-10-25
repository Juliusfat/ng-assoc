import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from './member.service';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MembersComponent, MemberDetailComponent],
  providers: [MemberService]
})
export class MemberModule { }
