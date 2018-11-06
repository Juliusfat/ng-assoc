//cyrille

import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { MetaService } from '../../../core/services/meta.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public events : Event[];

  constructor( private eventService : EventService, private meta:MetaService) { }

  ngOnInit() {
    this.getListEvents();
    this.meta.setTitle('Liste des évènements')

  }

  getListEvents() : void{
    this.eventService.getListEvents().subscribe(data => { this.events = data} );
  }
}
