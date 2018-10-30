import { Component, OnInit } from '@angular/core';
import { Member, Role } from '../../member.model';
import { MemberService } from '../../member.service';
import { Observable } from 'rxjs';
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

  /**
   * Toggle Admin role of the member checking the ID.
   * @param id 
   */
  toggleAdmin(member : Member) {
    this.memberService.toggleAdmin(member.id, member.role.indexOf(Role.ADMIN) === -1 ? false : true).subscribe(member => {
      if(member) {
        this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
      } else {
        console.log("ERROR : mise à jour du membre échouée.");
      }
    });
  }

  /**
   * Return Bootstrap active class if the member is Admin.
   * @param { Member } member 
   */
  isActiveClass(member : Member) : string {
    return member.role.indexOf(Role.ADMIN) === -1 ? '' : 'active';
  }

}
