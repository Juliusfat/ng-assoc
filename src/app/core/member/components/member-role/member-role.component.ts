import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member, Role } from '../../member.model';
import { Observable } from 'rxjs';
import { MemberService } from '../../member.service';

@Component({
  selector: 'app-member-role',
  templateUrl: './member-role.component.html',
  styleUrls: ['./member-role.component.css']
})
export class MemberRoleComponent implements OnInit {

  @Input() member : Member;

  @Input() members : Observable<Member[]>;
  @Output() membersChange = new EventEmitter<Observable<Member[]>>();

  isAdmin : boolean;

  constructor(private memberService : MemberService) { }

  ngOnInit() {
    this.isAdmin = this.member.role.indexOf(Role.ADMIN) !== -1;
  }

  /**
   * Toggle Admin role of the member checking the ID.
   * @param { Member } member
   */
  toggleAdmin(member : Member) {
    this.memberService.toggleAdmin(member.id, !this.isAdmin).subscribe(member => {
      if(member) {
        this.members = this.memberService.getMembers();
        this.membersChange.emit(this.members);
      } else {
        console.log("ERROR : mise à jour du membre échouée.");
      }
    });
  }

}
