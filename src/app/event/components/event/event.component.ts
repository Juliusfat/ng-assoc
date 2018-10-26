import { Component, OnInit } from '@angular/core';
import { EventService} from '../../event.service';
import { Event } from '../../event.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private event : Event;
  private id : string;
  private sub : any;

  constructor(private eventService : EventService, private route : ActivatedRoute) { }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(params);
   });
  }

}
