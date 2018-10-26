import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES:Routes = [ 
  { path:'', pathMatch:'full', redirectTo:'events' },
  { path:'events', loadChildren: '../event/event.module#EventModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash:true })
  ],
  exports:[ RouterModule ]
})
export class CoreRootingModule { }