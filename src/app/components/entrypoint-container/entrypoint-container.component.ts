import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { Interactable } from '../../models/interactable';
import { EntryPoint } from '../../models/entrypoint';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-entrypoint-container',
  templateUrl: './entrypoint-container.component.html',
  styleUrls: ['./entrypoint-container.component.css']
})
export class EntrypointContainerComponent implements OnInit, OnDestroy {


  currentInteractable: Interactable;
  subscription: Subscription;
  @ViewChild('collapse') collapse: ElementRef;

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

  AddEntryPoint(e: Event) {
    this.currentInteractable.AddEntryPoint();
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

}
