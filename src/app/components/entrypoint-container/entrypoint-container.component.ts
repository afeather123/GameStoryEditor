import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { Interactable } from '../../models/interactable';

@Component({
  selector: 'app-entrypoint-container',
  templateUrl: './entrypoint-container.component.html',
  styleUrls: ['./entrypoint-container.component.css']
})
export class EntrypointContainerComponent implements OnInit {


  currentInteractable: Interactable = new Interactable();

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.interactableService.InteractableObservable().subscribe((interactable: Interactable) => {
      this.currentInteractable = interactable;
    });
  }

}
