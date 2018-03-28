import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Interactable } from '../../models/interactable';
import { InteractableService } from '../../services/interactable.service';
import { DialogueNode } from '../../models/node';
import { NodeObject } from '../../models/nodeobject';
import { Condition } from '../../models/condition';

@Component({
  selector: 'app-node-preview',
  templateUrl: './node-preview.component.html',
  styleUrls: ['./node-preview.component.css']
})


export class NodePreviewComponent implements OnInit {

  currentInteractable: Interactable;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
    this.interactableService.InteractableObservable().subscribe((interactable: Interactable) => {
      this.currentInteractable = interactable;
    });
  }

  addNode(e: Event) {
    this.currentInteractable.AddNode();
    this.interactableService.addNode();
    e.stopPropagation();
  }

  deleteNode (node: DialogueNode) {
    const deletedNode = this.currentInteractable.nodes.Remove(node);
    this.interactableService.deleteNode(deletedNode.id);
  }

  renameNode (nodeID: string) {
    this.interactableService.changeNodeName(nodeID);
  }

  editNode (nodeID: string) {
    this.interactableService.editNode(nodeID);
  }
 }
