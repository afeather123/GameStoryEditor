import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { Interactable } from '../../models/interactable';
import { EntryPoint } from '../../models/entrypoint';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-entrypoint-container',
  templateUrl: './entrypoint-container.component.html',
  styleUrls: ['./entrypoint-container.component.css']
})
export class EntrypointContainerComponent implements OnInit, OnDestroy {


  currentInteractable: Interactable;
  subscription: Subscription;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.subscription = this.interactableService.InteractableObservable().subscribe((interactable: Interactable) => {
      this.currentInteractable = interactable;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  DeleteEntryPoint(entryPoint: EntryPoint) {
    this.currentInteractable.DeleteEntryPoint(entryPoint);
  }

}
