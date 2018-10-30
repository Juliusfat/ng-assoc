//guillaume

import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';
import { Member } from 'src/app/core/member/member.model';
import { MemberService } from '../../../core/member/member.service'

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {

  protected _participants:Member[] = [];
  protected non_participants:Member[] = [];  

  @Output() 
  updateParticipants: EventEmitter<Member[]> = new EventEmitter<Member[]>();

  // Duplicate the participants of the event 
  // Avoid direct change on the object
  @Input()
  set participants (value:Member[]) {
    this._participants = value;
    this.updateNonParticipants();    
  }

  @Input()
  max:number

  constructor(private memberservice:MemberService) { }

  ngOnInit() { }

  /**
   * Hydrate the list of non participants
   * according to the list of participants
   */
  private updateNonParticipants(): void {        
    this.memberservice.getMembers().subscribe(members => {      
      this.non_participants = members.filter((m:Member) => {
        return !this._participants.find((member:Member) => m.id === member.id)
      })      
    })
  }

  /**
   * Emit the new list of the participants for the event
   */
  private emitParticipants (): void {
    this.updateParticipants.emit(this._participants);
  }
  
  /**
   * Add the member to the list of participants if the event is not completed yet.
   * @param { Member } member 
   */
  addParticipantToEvent(member:Member): void {
    if (this.max === 0 || this._participants.length + 1 <= this.max) {
      this._participants = [...this._participants, member];
      this.non_participants = this.non_participants.filter((m:Member) => m !== member);
      // Emit the new list to the event component, which updates.
      this.emitParticipants(); 
    }   
  }

  /**
   * Remove the member for the list of participants
   * @param { Member } member 
   */
  removeParticipantToEvent(member:Member): void {
    this._participants = this._participants.filter((m:Member) => member !== m);
    this.non_participants.unshift(member);
    // Emit the new list to the event component, which updates.
    this.emitParticipants();
  }

}
