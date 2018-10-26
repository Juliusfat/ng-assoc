import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Router } from '@angular/router';

// By GJK
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  private firstname : string;
  private lastname : string;
  private email : string;

  constructor(private memberService : MemberService, private router : Router) { }

  ngOnInit() {
  }

  /**
   * Adding a member.
   */
  addMember() : void {
    this.memberService.addMember(this.firstname, this.lastname, this.email);
    this.router.navigate(['/members']);
  }

}
