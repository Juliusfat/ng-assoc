import { Injectable } from '@angular/core';
import { ApiService} from '../core/api/api.service';
import { environment } from '../../environments/environment';
import { Event } from './event.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private apiService : ApiService) { }


addEvent(event :Event) : Observable<Event> {
  return this.apiService.http.post<Event>(environment.apiUrl, {
    "title" : event.title,
    "date" : event.date,
    "duration" : event.duration,
    "capacity" : event.capacity,
    "participants" : event.participants,
    "location" : event.location
   })
}

getListEvents() :Observable<Event[]>{
  return this.apiService.http.get<Event[]>(environment.apiUrl);
}

deleteEvent( id : string) :Observable<Event>{
  return this.apiService.http.delete<Event>(environment.apiUrl + '/' + id);

} 

getEventById( id : string ) : Observable<Event>{
  return this.apiService.http.get<Event>(environment.apiUrl + '/' + id);
}

}