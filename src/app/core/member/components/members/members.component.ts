import { Component, OnInit } from '@angular/core';
import { Member, Role } from '../../member.model';
import { MemberService } from '../../member.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MetaService } from '../../../services/meta.service'

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

  constructor(private memberService : MemberService, private meta:MetaService) { }

  ngOnInit() {
    this.getMembers();
    this.meta.setTitle('Liste des membres')
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
    this.isLoaded = false;
    this.memberService.deleteMember(id).then(() => {
      this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
    });
  }

  /**
   * Set the delete function with a member ID.
   * @param id 
   */
  setDeleteFunctionWithId(id : string) {
    this.deleteMemberFunction = this.deleteMember.bind(this, id);
  }

}
