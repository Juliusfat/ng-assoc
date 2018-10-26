import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { ActivatedRoute } from '@angular/router';
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
  private isAdmin : boolean;

  constructor(private memberService : MemberService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
        if (this.member.role.indexOf(Role.ADMIN) !== -1) {
          this.isAdmin = true;
        }
      });
    });
  }

}
