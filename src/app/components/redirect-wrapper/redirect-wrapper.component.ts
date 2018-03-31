import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Redirect } from '../../models/redirect';
import { InteractableService } from '../../services/interactable.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-redirect-wrapper',
  templateUrl: './redirect-wrapper.component.html',
  styleUrls: ['./redirect-wrapper.component.css']
})
export class RedirectWrapperComponent implements OnInit, OnDestroy {

  static idCount = 0;
  id: number;
  nodeName: string;
  @Input() redirect: Redirect = {
    nodeID: 'none',
    conditions: []
  };
  @Output() deleteRedirect: EventEmitter<Redirect> = new EventEmitter<Redirect>();

  nameChangeSubscription: Subscription;
  deleteNodeSubscription: Subscription;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.id = RedirectWrapperComponent.idCount++;
    this.GetNodeName(this.redirect.nodeID);
    this.nameChangeSubscription = this.interactableService.NameChangeObservable().subscribe((nodeID: string) => {
      if (this.redirect.nodeID === nodeID) {
        this.GetNodeName(nodeID);
      }
    });
    this.deleteNodeSubscription = this.interactableService.DeleteNodeObservable().subscribe((nodeID: string) => {
      if (this.redirect.nodeID === 'none' || this.redirect.nodeID === nodeID) {
        this.nodeName = 'No node selected';
      }
    });
  }

  ngOnDestroy() {
    this.nameChangeSubscription.unsubscribe();
    this.deleteNodeSubscription.unsubscribe();
  }

  GetNodeName(nodeID: string) {
    if (nodeID === 'none') {
      this.nodeName = 'No node selected';
      return;
    }
    const node = this.interactableService.currentInteractable.nodes.GetAtId(nodeID);
    if (node != null) {
      this.nodeName = node.name;
    } else {
      this.nodeName = 'No node selected';
    }
  }

  DeleteRedirect() {
    this.deleteRedirect.emit(this.redirect);
  }
}
