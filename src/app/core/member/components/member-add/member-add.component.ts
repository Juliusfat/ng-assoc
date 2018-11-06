import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'src/app/shared/validators/email';
import { MetaService } from '../../../services/meta.service'

// By GJK
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {

  public addMemberFunction: Function;

  addMemberForm: FormGroup;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private fb: FormBuilder,
    private meta:MetaService
  ) { }

  ngOnInit() {
    this.addMemberFunction = this.addMember.bind(this);
    this.meta.setTitle('Ajouter un membre');
    this.addMemberForm = this.fb.group({
      'firstname': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      'lastname': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      'email': this.fb.control('', [
        Validators.required,
        Validators.email],[
        EmailValidators.isEmailUnique(this.memberService)
      ])
    });
  }

  /**
   * Getters from form to display validation errors.
   */
  get firstname() {
    return this.addMemberForm.get('firstname');
  }
  get lastname() {
    return this.addMemberForm.get('lastname');
  }
  get email() {
    return this.addMemberForm.get('email');
  }

  /**
   * Adding a member and redirection to members list.
   */
  addMember(): void {
    const formValue = this.addMemberForm.value;
    this.memberService.addMember(formValue.firstname, formValue.lastname, formValue.email).then(
      () => this.router.navigate(['/members'])
    );
  }

}
