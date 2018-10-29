import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MemberService } from '../../member.service';
import { Router } from '@angular/router';

// by Guillaume

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.css']
})
export class MemberLoginComponent implements OnInit {

  form:FormGroup;
  error:string;
  constructor(private membersservice:MemberService, private router:Router) { }

  ngOnInit() {
    // Initialization of the login form
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  handleForm(): void {
    if (this.form.valid) {
      let { email, password } = this.form.value;
      this.membersservice.login(email, password).then(() => {
        this.router.navigate(['/events'])
      }).catch(err => {
        this.error = err;
      })
    }
  }

}
