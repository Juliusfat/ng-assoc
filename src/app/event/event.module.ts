import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRootingModule } from './event-rooting.module';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventAddComponent } from './components/event-add/event-add.component';

@NgModule({
  imports: [
    CommonModule,
    EventRootingModule
  ],
  declarations: [EventsComponent, EventComponent, EventEditComponent, EventAddComponent]
})
export class EventModule { }
