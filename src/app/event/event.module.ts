import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRootingModule } from './event-rooting.module';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { EventsCalendarComponent} from './components/events-calendar/events-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventParticipantsComponent } from './components/event-participants/event-participants.component';
import { FullCalendarModule} from 'primeng/fullcalendar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,    
    EventRootingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule
  ],
  declarations: [
    EventsComponent, 
    EventComponent, 
    EventEditComponent, 
    EventAddComponent, 
    EventParticipantsComponent,
    EventsCalendarComponent
  ]
})
export class EventModule { }
