//cyrille

import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidators } from 'src/app/shared/validators/date';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  
  private id:string;
  private event: Event;  
  form:FormGroup

  constructor(
    private eventService : EventService, 
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {    
    // Initialize the form
    this.form = new FormGroup({
      title: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      date: new FormControl('', [Validators.required, DateValidators.dateAfter()]),
      duration: new FormControl(1, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(0, [Validators.required, Validators.min(0)]),
      location: new FormControl('', [Validators.required, Validators.minLength(5)]) 
    })
    // Get the event
    this.route.params.pipe(
      tap(params => this.id = params['id']),
      switchMap(() => this.eventService.getEventById(this.id))
    ).subscribe((event:Event) => {
      this.event = event;
      let { id, participants, ...props } = event;
      for (let prop in props) {
        this.form.get(prop).setValue(event[prop])
      }
    })
  }

  handleForm(): void {
    if (this.form.valid) { 
      this.eventService.updateEvent(this.id, this.form.value).subscribe((event:Event) => {
          this.router.navigate(['/events', event.id]);
      })
    }
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.id).subscribe(() => {
      this.router.navigate(['/events'])
    })
  }

}
