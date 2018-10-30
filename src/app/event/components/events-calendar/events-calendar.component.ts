//by Cyrille

import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { Router } from '@angular/router';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {

  constructor(private eventService: EventService, private route: Router) { }

  public events: any[];
  public options: any;
  public locale: any;

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
      /**
       * the method that listens to the click on an event and returns the associated id
       */
      eventClick: (obj) => {
       this.route.navigate(['/events',obj.event.id]);   
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
