import { Component, OnInit } from '@angular/core';
import { Member } from '../../member.model';
import { MemberService } from '../../member.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MetaService } from '../../../services/meta.service'
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

// By GJK
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  private isLoaded : boolean = false;
  public members : Observable<Member[]>;
  
  private deleteDialogTitle: string;
  private deleteDialogContent: string;
  private deleteMemberFunction : Function;

  constructor(
    private memberService : MemberService,
    private meta:MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getMembers();
    this.meta.setTitle('Liste des membres');
    // Init dialog datas
    this.deleteDialogTitle = "Supprimer un membre";
    this.deleteDialogContent = "Êtes-vous sûr de vouloir supprimer le membre ?";
  }

  /**
   * Get all members to display.
   */
  getMembers() : void {
    this.isLoaded = false;
    this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
  }
  
  /**
   * Delete a member according to his/her id.
   * @param { string } id
   */
  deleteMember(id : string) : void {
    this.isLoaded = false;
    this.memberService.deleteMember(id).then(() => {
      this.members = this.memberService.getMembers().pipe(finalize( () => this.isLoaded = true));
    });
  }

  /**
   * Open a modal dialog to ask confirmation to delete a member with the specified ID.
   * @param { string } id
   */
  openDeleteDialog(id: string) {
    this.deleteMemberFunction = this.deleteMember.bind(this, id);
    this.memberService.getMemberById(id).subscribe(member => {
      this.deleteDialogContent = "Êtes-vous sûr de vouloir supprimer <strong>" + member.firstname + " " + member.lastname + "</strong> ?";
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: this.deleteDialogTitle,
          content: this.deleteDialogContent,
          confirmFunction: this.deleteMemberFunction
        }
      });
    });
  }

}
