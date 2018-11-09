//cyrille

import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Event } from '../../event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidators } from 'src/app/shared/validators/date';
import { MetaService } from 'src/app/core/services/meta.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  
  private id: string;
  private event: Event;  
  form: FormGroup;

  deleteDialogTitle: string;
  deleteDialogContent: string;
  deleteEventFunction: Function;

  updateDialogTitle: string;
  updateDialogContent: string;
  updateEventFunction: Function;

  constructor(
    private eventService : EventService, 
    private route: ActivatedRoute,
    private router: Router,
    private meta: MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {    
    // Initialize the form
    this.form = new FormGroup({
      title: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      date: new FormControl('', [Validators.required, DateValidators.dateAfter()]),
      duration: new FormControl(1, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(0, [Validators.required, Validators.min(0)]),
      location: new FormControl('', [Validators.required, Validators.minLength(5)]) 
    });
    // Get the event
    this.route.params.pipe(
      tap(params => this.id = params['id']),
      switchMap(() => this.eventService.getEventById(this.id))
    ).subscribe((event:Event) => {
      this.event = event;
      this.meta.setTitle(`Édition de l'évènement ${event.title}`);
      let { id, participants, ...props } = event;
      for (let prop in props) {
        this.form.get(prop).setValue(event[prop]);
      }
      // Init update modal
      this.updateDialogTitle = "Modifier l'évènement";
      this.updateDialogContent = "Êtes-vous sûr de vouloir modifier <strong>" + this.event.title + "</strong> ?";
      this.updateEventFunction = this.handleForm.bind(this);
      // Init delete modal
      this.deleteDialogTitle = "Supprimer l'évènement";
      this.deleteDialogContent = "Êtes-vous sûr de vouloir supprimer <strong>" + this.event.title + "</strong> ?";
      this.deleteEventFunction = this.deleteEvent.bind(this, this.id);
    });
  }

  handleForm(): void {
    if (this.form.valid) { 
      this.eventService.updateEvent(this.id, this.form.value).subscribe((event:Event) => {
        this.router.navigate(['/events', event.id]);
      });
    }
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.id).subscribe(() => {
      this.router.navigate(['/events']);
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
        confirmFunction: this.deleteEventFunction
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
        confirmFunction: this.updateEventFunction
      }
    });
  }

}
