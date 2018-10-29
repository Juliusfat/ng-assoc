import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRootingModule } from './event-rooting.module';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventParticipantsComponent } from './components/event-participants/event-participants.component';

@NgModule({
  imports: [
    CommonModule,
    EventRootingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EventsComponent, EventComponent, EventEditComponent, EventAddComponent, EventParticipantsComponent]
})
export class EventModule { }
