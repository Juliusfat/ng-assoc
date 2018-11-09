import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { 
  FormGroup, 
  FormControl, 
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../event.model'
import { EventService } from '../../event.service'
import { DateValidators } from 'src/app/shared/validators/date';
import { MetaService } from 'src/app/core/services/meta.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

// by Guillaume

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  form:FormGroup
  inputDelay:number = 400

  addDialogTitle: string;
  addDialogContent: string;
  addEventFunction: Function;

  constructor(
    private eventservice:EventService,
    private router:Router,
    private route:ActivatedRoute,
    private meta:MetaService,
    private dialog: MatDialog
  ) { }

  ngOnInit() { 

    this.form = new FormGroup({
      title: new FormControl('', [ Validators.required, Validators.minLength(2) ]),
      date: new FormControl('', [Validators.required, DateValidators.dateAfter()]),
      duration: new FormControl(1, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(0, [Validators.required, Validators.min(0)]),
      location: new FormControl('', [Validators.required, Validators.minLength(5)])      
    });

    this.route.queryParams.subscribe(params => { 
      if (params['date']) {
        this.form.get('date').setValue(`${params['date']}T08:00`);  
      }
    })

    this.meta.setTitle('Ajouter un évènement');

    // Init dialog datas
    this.addDialogTitle = "Ajouter un évènement";
    this.addDialogContent = "Êtes-vous sûr de vouloir ajouter l'évènement ?";
    this.addEventFunction = this.handleForm.bind(this);
  }

  /**
   * Handle form submit
   */
  handleForm(): void {
    if (this.form.valid) {
      const event:Event = { ...this.form.value, participants:[], id:uuid() }      
      this.eventservice.addEvent(event).subscribe((response: Event) => {
        // Reset form and redirect to the event details page.
        this.form.reset();
        this.router.navigate(['/events', response.id]);
      })
      this.form.reset();
    }
  }

  /**
   * Open a modal dialog to ask confirmation to add an event.
   */
  openAddDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.addDialogTitle,
        content: this.addDialogContent,
        confirmFunction: this.addEventFunction
      }
    });
  }
}
