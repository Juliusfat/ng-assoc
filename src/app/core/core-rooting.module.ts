import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './member/components/members/members.component';
import { MemberDetailComponent } from './member/components/member-detail/member-detail.component';
import { MemberService } from './member/member.service';
import { MemberLoginComponent } from './member/components/member-login/member-login.component';
import { MemberAddComponent } from './member/components/member-add/member-add.component';
import { MemberEditComponent } from './member/components/member-edit/member-edit.component';

const ROUTES:Routes = [ 
  { path:'', pathMatch:'full', redirectTo:'events' },
  { path:'login', component: MemberLoginComponent },
  { path:'members', canActivate:[MemberService], children: [
    { path:'', component: MembersComponent },
    { path:'add', component: MemberAddComponent },
    { path:':id/edit', component: MemberEditComponent },
    { path:':id', component: MemberDetailComponent }
  ] },
  { path:'events', loadChildren: '../event/event.module#EventModule', canActivate:[MemberService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash:true })
  ],
  exports:[ RouterModule ]
})
export class CoreRootingModule { }