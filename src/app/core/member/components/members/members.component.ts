import { Component, OnInit } from '@angular/core';
import { Member } from '../../member.model';
import { MemberService } from '../../member.service';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

// By GJK
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  private isLoaded : boolean = false;
  public members : Observable<Member[]>;
  public deleteMemberFunction : Function;

  constructor(private memberService : MemberService) { }

  ngOnInit() {
    this.getMembers();
  }

  /**
   * Get all members to display.
   */
  getMembers() : void {
    this.isLoaded = false;
    this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
  }
  
  /**
   * Delete a member according to his/her id.
   * @param { string } id
   */
  deleteMember(id : string) : void {
    this.memberService.deleteMember(id).then(() => {
      this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
    });
  }

  getMemberIdClicked(id : string) {
    this.deleteMemberFunction = this.deleteMember.bind(this, id);
  }

}
