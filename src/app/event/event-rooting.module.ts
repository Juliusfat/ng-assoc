import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventComponent } from './components/event/event.component'
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';

const ROUTES:Routes = [
  { path:'', component: EventsComponent },
  { path:'add', component: EventAddComponent },
  { path:'calendar', component : EventsCalendarComponent},
  { path:':id', component: EventComponent },
  { path:':id/edit', component: EventEditComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ]
})
export class EventRootingModule { }
