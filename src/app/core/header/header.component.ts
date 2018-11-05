import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { MemberService } from '../../core/member/member.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string = environment.appName  
  
  constructor(public memberservice:MemberService, private router:Router) { }

  ngOnInit() { }

  /**
   * Log out the user and redirect to the login page
   * @returns void
   */
  logout (): void {
    // Logout and redirect to the login page.
    this.memberservice.logout().then(() => {
      this.router.navigate(['/login']);
    });    
  }

}
