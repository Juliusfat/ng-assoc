import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Event } from '../../event.model';
import { EventService } from '../../event.service';
import { Member } from '../../../core/member/member.model';
import { MetaService } from '../../../core/services/meta.service';

// by Guillaume

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  constructor(
    private route:ActivatedRoute, 
    private eventservice:EventService,
    private meta:MetaService
  ) { }

  event$:Observable<Event>;  
  error:string;
  id:string;

  ngOnInit() {        
    // Assigning the observable to the variable (subscription in the template)
    this.event$ = this.route.params.pipe(
      // Get the value of the id params
      tap((params) => this.id = params['id']),
      // subscribe the obserable returned by the service function
      switchMap(() => this.eventservice.getEventById(this.id)),
      tap((event:Event) => {        
        this.meta.setTitle(`Détails concernant l'évènement ${event.title}`)
      }),
      // In case of error, assigning a message error and returning an observable of the error
      catchError((err) => {        
        this.error = `Une erreur est survenue lors de la récupération de l'event portant l'ID ${this.id}`                
        return of(err)
      })    
    )

  }

  /**
   * On participants change, update the event on server
   * @param { Array<Member> } participants 
   */
  updateParticipants(participants:Member[]): void {    
    this.event$ = this.eventservice.updateEvent(this.id, { participants }).pipe(
      switchMap(() => this.eventservice.getEventById(this.id))
    )        
  }

}