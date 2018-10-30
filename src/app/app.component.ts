import { Component, OnInit } from '@angular/core';
import { MemberService } from './core/member/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor (private memberservice:MemberService) { }

  ngOnInit() {
    this.memberservice.bootUser();
  }
}
