import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Router } from '@angular/router';
import { MetaService } from '../../../services/meta.service'

// By GJK
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  firstname : string;
  lastname : string;
  email : string;
  public addMemberFunction : Function;

  constructor(
    private memberService : MemberService, 
    private router : Router,
    private meta:MetaService
  ) { }

  ngOnInit() {
    this.addMemberFunction = this.addMember.bind(this);
    this.meta.setTitle('Ajouter un membre')
  }

  /**
   * Adding a member and redirect to members list.
   */
  addMember() : void {
    this.memberService.addMember(this.firstname, this.lastname, this.email).then(
      () => this.router.navigate(['/members'])
    );
  }

}
