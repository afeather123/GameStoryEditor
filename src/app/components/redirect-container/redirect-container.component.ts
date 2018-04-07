import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Redirect } from '../../models/redirect';
import { NodeID } from '../../models/nodeID';
import { InteractableService } from '../../services/interactable.service';

declare var $: any;

@Component({
  selector: 'app-redirect-container',
  templateUrl: './redirect-container.component.html',
  styleUrls: ['./redirect-container.component.css']
})
export class RedirectContainerComponent implements OnInit {

  static idCount = 0;
  id;
  @Input() redirects: Redirect[] = [];
  @ViewChild('collapse') collapse: ElementRef;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.id = RedirectContainerComponent.idCount++;
  }

  AddRedirect(e: Event) {
    const newRedirect: Redirect = {
      nodeID: 'none',
      conditions: []
    };
    this.redirects.push(newRedirect);
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

  DeleteRedirect(redirect: Redirect) {
    const index = this.redirects.indexOf(redirect);
    if (index >= 0) {
      this.redirects.splice(index, 1);
    }
  }

  AddNewNodeToRedirect() {
    const newNode = this.interactableService.currentInteractable.AddNode();
    this.redirects[0].nodeID = newNode.id;
  }
}
