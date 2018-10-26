import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from './member.service';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[MembersComponent, MemberDetailComponent],
  declarations: [MembersComponent, MemberDetailComponent],
  providers: [MemberService]
})
export class MemberModule { }
