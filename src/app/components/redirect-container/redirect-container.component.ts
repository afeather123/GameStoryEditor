import { Component, OnInit, Input } from '@angular/core';
import { Redirect } from '../../models/redirect';
import { NodeID } from '../../models/nodeID';
import { InteractableService } from '../../services/interactable.service';

@Component({
  selector: 'app-redirect-container',
  templateUrl: './redirect-container.component.html',
  styleUrls: ['./redirect-container.component.css']
})
export class RedirectContainerComponent implements OnInit {

  static idCount = 0;
  id;
  @Input() redirects: Redirect[] = [];

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.id = RedirectContainerComponent.idCount++;
  }

  AddRedirect() {
    const newRedirect: Redirect = {
      nodeID: 'none',
      conditions: []
    };
    this.redirects.push(newRedirect);
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
