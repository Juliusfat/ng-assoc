import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private events : Event[];

  constructor( private eventService : EventService) { }

  ngOnInit() {
    this.getListEvents();

  }

  getListEvents() : void{
    this.eventService.getListEvents().subscribe(data => { this.events = data} );
  }
}
