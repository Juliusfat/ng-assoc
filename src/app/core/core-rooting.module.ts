import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './member/components/members/members.component';
import { MemberDetailComponent } from './member/components/member-detail/member-detail.component';
import { MemberEditComponent } from './member/components/member-edit/member-edit.component';
import { MemberAddComponent } from './member/components/member-add/member-add.component';

const ROUTES:Routes = [ 
  { path:'', pathMatch:'full', redirectTo:'events' },
  { path:'members', children: [
    { path:'', component: MembersComponent },
    { path:'add', component: MemberAddComponent },
    { path:':id', component: MemberDetailComponent },
    { path:':id/edit', component: MemberEditComponent }
  ] },
  { path:'events', loadChildren: '../event/event.module#EventModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash:true })
  ],
  exports:[ RouterModule ]
})
export class CoreRootingModule { }