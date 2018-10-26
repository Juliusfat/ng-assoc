import { Injectable } from '@angular/core';
import { ApiService} from '../core/api/api.service';
import { environment } from '../../environments/environment';
import { Event } from './event.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiEvent : string = environment.apiUrl + '/events';

  constructor( private apiService : ApiService) { }

/**
 * add a new event 
 * @param { Event} event
 * @returns Observable<Event>  
 */

addEvent(event :Event) : Observable<Event> {
  return this.apiService.http.post<Event>(this.apiEvent, {
    "id": event.id,
    "title" : event.title,
    "date" : event.date,
    "duration" : event.duration,
    "capacity" : event.capacity,
    "participants" : event.participants,
    "location" : event.location
   })
}

/**
 * retrieves the list of events
 * @return Observable<Event>
 */

getListEvents() :Observable<Event[]>{
  return this.apiService.http.get<Event[]>(this.apiEvent);
}

/**
 * delete one event with its id
 * @param {string} id
 * @returns Observable<Event>
 */

deleteEvent( id : string) :Observable<Event>{
  return this.apiService.http.delete<Event>(this.apiEvent + '/' + id);

} 

/**
 * get one event with its id
 * @param {string} id
 * @returns Observable<Event> 
 */

getEventById( id : string ) : Observable<Event>{
  return this.apiService.http.get<Event>(this.apiEvent + '/' + id);
}

}