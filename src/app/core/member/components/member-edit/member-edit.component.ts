import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member, Role } from '../../member.model';
import { Observable } from 'rxjs';

// By GJK
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member : Member = new Member();
  private id : string;

  constructor(private memberService : MemberService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
      });
    });
  }

  /**
   * Update member according to his/her id and redirect to member detail.
   */
  updateMember() {
    this.memberService.updateUserById(this.id, this.member).subscribe(member => {
      if(member) {
        this.router.navigate(['/members', this.id]);
      } else {
        console.log("ERROR : mise à jour du membre échouée.");
      }
    });
  }

  /**
   * Delete a member according to his/her id and redirect to members list.
   */
  deleteMember() {
    this.memberService.deleteMember(this.id).then(() => {
      this.router.navigate(['/members']);
    });
  }

}
