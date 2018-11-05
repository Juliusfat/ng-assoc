//by Cyrille

import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { Router } from '@angular/router';
import { FullCalendar } from 'primeng/fullcalendar';
import * as moment from 'moment';
import { injectComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {

  constructor(private eventService: EventService, private route: Router) { }

  public events: Event[];
  public options: any;
  public locale: string;

  @ViewChild('fc') fc: FullCalendar;

  ngOnInit() {

    this.getEventsCalendar();

    /**
     * create an array to define all the options of the calendar  
     */
    this.options = {
      defaultDate: '2019-01-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      locale: 'fr',
      editable: true,
      droppable: true,

      /**
       * drag and drop function :move an event in the calendar and update the date of the event in the database
       */

      eventDrop: (obj) => {
        const eventDate : string = moment(obj.event.start).format();
        const currentId = obj.event.def.publicId;
        console.log(eventDate);
        console.log(currentId);
        this.eventService.changeEventDate(currentId,eventDate).subscribe((event:Event) => {
          this.route.navigate(['/events', event.id]);
      })
      },

      /**
       * the method that listens to the click on an event and returns the associated id
       */
      eventClick: (obj) => {
        this.route.navigate(['/events', obj.event.id]);
      },
      dateClick: (obj) => {
        console.log(obj);
      }
    };
  }

  getEventsCalendar(): void {
    this.eventService.getListEvents()
      .subscribe(
        events => {
          this.events = events;
        }
      )
  }
}
