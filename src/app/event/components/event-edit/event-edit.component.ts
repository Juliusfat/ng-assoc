import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  private event : Event;

  constructor( private eventService : EventService) { }

  ngOnInit() {

  }

  

}
