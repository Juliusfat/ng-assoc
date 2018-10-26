import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from './member.service';
import { MembersComponent } from './components/members/members.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberAddComponent } from './components/member-add/member-add.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MembersComponent, MemberDetailComponent, MemberAddComponent, MemberEditComponent],
  providers: [MemberService]
})
export class MemberModule { }
