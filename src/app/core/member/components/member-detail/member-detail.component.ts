import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Member } from '../../member.model';
import { Router, ActivatedRoute } from '@angular/router';

// By GJK
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member : Member = new Member();
  private id : string;

  constructor(private memberService : MemberService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
      });
    });
  }

  /**
   * Delete a member according to his/her id and redirect to members list.
   * @param { string } id
   */
  deleteMember(id : string) {
    this.memberService.deleteMember(id);
    this.router.navigate(['/members']);
  }

}
