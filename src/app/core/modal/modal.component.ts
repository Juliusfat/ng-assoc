import { Component, OnInit, Input } from '@angular/core';

// By GJK
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() confirmFunction : Function;
  @Input() typeModal : string;
  @Input() idModal : string;

  titleModal : string;
  messageModal : string;
  buttonModal : string;

  constructor() { }

  ngOnInit() {
    if (this.typeModal.toLowerCase() === "delete") {
      this.titleModal = "Suppression du membre";
      this.messageModal = "Êtes-vous sûr de vouloir supprimer le membre ?";
      this.buttonModal = "Supprimer";
    } else if (this.typeModal.toLowerCase() === "update") {
      this.titleModal = "Modification du membre";
      this.messageModal = "Êtes-vous sûr de vouloir modifier le membre ?";
      this.buttonModal = "Modifier";
    } else {
      this.titleModal = "Titre";
      this.messageModal = "Message";
      this.buttonModal = "Bouton";
    }
  }

}