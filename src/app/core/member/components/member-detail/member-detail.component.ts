import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Member } from '../../member.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from '../../../services/meta.service'

// By GJK
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member : Member = new Member();
  private id : string;
  public deleteMemberFunction : Function;

  constructor(
    private memberService : MemberService, 
    private router : Router, 
    private route : ActivatedRoute,
    private meta: MetaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
        this.meta.setTitle(`Détails concernant ${this.member.firstname} ${this.member.lastname}`)
        this.deleteMemberFunction = this.deleteMember.bind(this, this.id);
      });
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
