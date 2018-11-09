import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member.service';
import { Member } from '../../member.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from '../../../services/meta.service'
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

// By GJK
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member : Member = new Member();
  private id : string;

  private deleteDialogTitle: string;
  private deleteDialogContent: string;
  private deleteMemberFunction : Function;

  constructor(
    private memberService : MemberService, 
    private router : Router, 
    private route : ActivatedRoute,
    private meta: MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get ID from URL.
      this.memberService.getMemberById(this.id).subscribe(member => {
        this.member = member;
        this.meta.setTitle(`Détails concernant ${this.member.firstname} ${this.member.lastname}`);
        // Init delete modal
        this.deleteDialogTitle = "Supprimer le membre";
        this.deleteDialogContent = "Êtes-vous sûr de vouloir supprimer <strong>" + member.firstname + " " + member.lastname + "</strong> ?";
        this.deleteMemberFunction = this.deleteMember.bind(this, this.id);
      });
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

}
