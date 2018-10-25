import { Component, OnInit } from '@angular/core';
import { Member } from '../../member.model';
import { MemberService } from '../../member.service';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  private isLoaded : boolean = false;
  private members : Observable<any[]>;
  // private members : Observable<Member[]>;

  constructor(private memberService : MemberService) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers():void {
    this.isLoaded = false;
    this.members = of([{"firstname":"G", "lastname":"JK"}, {"firstname":"G", "lastname":"DB"}, {"firstname":"C", "lastname":"PL"}]);
    this.isLoaded = true
    // this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
  }

  deleteMember(id : string) {
    console.log("Suppression du membre ID " + id);
    // this.memberService.deleteMember(id);
  }

}
