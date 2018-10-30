import { Component, OnInit, Input } from '@angular/core';

// By GJK
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() confirmFunction : Function;
  @Input('typeModal')
  set typeModal (value : string) {
    this.type = value.toLowerCase();
  }
  
  type : string;
  id : string;
  title : string;
  message : string;
  button : string;

  constructor() { }

  ngOnInit() {
    this.id = this.type + "Modal";

    if (this.type === "delete") {
      this.title = "Suppression du membre";
      this.message = "Êtes-vous sûr de vouloir supprimer le membre ?";
      this.button = "Supprimer";
    } else if (this.type === "update") {
      this.title = "Modification du membre";
      this.message = "Êtes-vous sûr de vouloir modifier le membre ?";
      this.button = "Modifier";
    } else if (this.type === "add") {
      this.title = "Ajout d'un membre";
      this.message = "Êtes-vous sûr de vouloir ajouter le membre ?";
      this.button = "Ajouter";
    }
  }

}