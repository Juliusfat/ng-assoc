import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../member.model';
import { MetaService } from '../../../services/meta.service'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

// By GJK
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  public member : Member = new Member();
  private id : string;

  private updateDialogTitle: string;
  private updateDialogContent: string;
  public updateMemberFunction : Function;

  private deleteDialogTitle: string;
  private deleteDialogContent: string;
  public deleteMemberFunction : Function;

  constructor(
    private memberService : MemberService, 
    private route : ActivatedRoute, 
    private router : Router,
    private meta: MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
        this.meta.setTitle(`Édition de la fiche de ${this.member.firstname} ${this.member.lastname}`);
        // Init update modal
        this.updateDialogTitle = "Modifier le membre";
        this.updateDialogContent = "Êtes-vous sûr de vouloir modifier <strong>" + member.firstname + " " + member.lastname + "</strong> ?";
        this.updateMemberFunction = this.updateMember.bind(this);
        // Init delete modal
        this.deleteDialogTitle = "Supprimer le membre";
        this.deleteDialogContent = "Êtes-vous sûr de vouloir supprimer <strong>" + member.firstname + " " + member.lastname + "</strong> ?";
        this.deleteMemberFunction = this.deleteMember.bind(this, this.id);
      });
    });
  }

  /**
   * Update member according to his/her id and redirect to member detail.
   */
  updateMember() {
    this.memberService.updateUserById(this.id, this.member).subscribe(member => {
      if(member) {
        this.router.navigate(['/members', this.id]);
      } else {
        console.log("ERROR : mise à jour du membre échouée.");
      }
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

  /**
   * Open a modal dialog to ask confirmation to delete the member.
   */
  openDeleteDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.deleteDialogTitle,
        content: this.deleteDialogContent,
        confirmFunction: this.deleteMemberFunction
      }
    });
  }

  /**
   * Open a modal dialog to ask confirmation to update the member.
   */
  openUpdateDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.updateDialogTitle,
        content: this.updateDialogContent,
        confirmFunction: this.updateMemberFunction
      }
    });
  }

}
