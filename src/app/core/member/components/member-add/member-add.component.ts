import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'src/app/shared/validators/email';
import { MetaService } from '../../../services/meta.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

// By GJK
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {

  private addDialogTitle: string;
  private addDialogContent: string;
  private addMemberFunction: Function;

  addMemberForm: FormGroup;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private fb: FormBuilder,
    private meta: MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Init dialog datas
    this.addDialogTitle = "Ajouter un membre";
    this.addDialogContent = "Êtes-vous sûr de vouloir ajouter le membre ?";
    this.addMemberFunction = this.addMember.bind(this);

    this.meta.setTitle('Ajouter un membre');

    this.addMemberForm = this.fb.group({
      'firstname': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      'lastname': this.fb.control('', [Validators.required, Validators.minLength(2)]),
      'email': this.fb.control('',
        [Validators.required, Validators.email],
        [EmailValidators.isEmailUnique(this.memberService)]
      )
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

  /**
   * Open a modal dialog to ask confirmation to add a member.
   */
  openAddDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.addDialogTitle,
        content: this.addDialogContent,
        confirmFunction: this.addMemberFunction
      }
    });
  }

}
