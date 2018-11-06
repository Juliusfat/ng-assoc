//by Cyrille

import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { Router } from '@angular/router';
import { FullCalendar } from 'primeng/fullcalendar';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {

  constructor(
    private eventService: EventService, 
    private route: Router,
    private meta:MetaService
  ) { }

  public goDate : Date;
  public events: Event[];
  public options: any;
  public locale: string;

  @ViewChild('fc') fc: FullCalendar;

  ngOnInit() {

    this.getEventsCalendar();
    this.meta.setTitle('Calendrier des évènements')

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
        const eventDate : string = new Date(Date.parse(obj.event.start)).toISOString();
        const currentId = obj.event.def.publicId;
        this.eventService.changeEventDate(currentId,eventDate).subscribe((event:Event) => {
          this.route.navigate(['/events', event.id]);
      })
      },
      /**
       * limit the starting date of the calendar at the current date
       */
      validRange:(nowDate)=> {
        return {
        start: nowDate
        }
      },

      /**
       * the method that listens to the click on an event and returns the associated id
       */
      eventClick: (obj) => {
        this.route.navigate(['/events', obj.event.id]);
      },
      dateClick: (obj) => {
        this.route.navigate(['/events/add'], { queryParams: { date:obj.dateStr } })
      }
    };
  }
  /**
   * inject the recovered events into the json database in the calendar
   */
  getEventsCalendar(): void {
    this.eventService.getListEvents()
      .subscribe(
        events => {
          this.events = events;
        }
      )
  }

  /**
   * use the child calendar component and allow access to a specific date 
   */
  gotoDate() {
    this.fc.getCalendar().gotoDate(this.goDate);
}
}
