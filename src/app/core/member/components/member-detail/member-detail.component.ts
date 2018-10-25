import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Observable } from 'rxjs';
import { Member } from '../../member.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  private member : Observable<Member>;

  constructor(private memberService : MemberService, private router : Router) { }

  ngOnInit() {
    this.member = this.memberService.getMemberById();
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
