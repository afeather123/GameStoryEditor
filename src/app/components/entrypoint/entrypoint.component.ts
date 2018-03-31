import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryPoint } from '../../models/entrypoint';
import { InteractableService } from '../../services/interactable.service';
import { VariableSelectService } from '../../services/variable-select.service';
import { DialogueNode } from '../../models/node';

@Component({
  selector: 'app-entrypoint',
  templateUrl: './entrypoint.component.html',
  styleUrls: ['./entrypoint.component.css']
})
export class EntrypointComponent implements OnInit {

  node: DialogueNode;
  @Input() entryPoint: EntryPoint = {
    name: 'something',
    id: '0',
    redirect: {
      nodeID: 'none',
      conditions: []
    }
  };
  @Output() deleteEntryPoint: EventEmitter<EntryPoint> = new EventEmitter<EntryPoint>();

  constructor(private interactableService: InteractableService, private variableSelectService: VariableSelectService) {
   }

  ngOnInit() {
    this.ChangeNode(this.entryPoint.redirect.nodeID);
  }

  editNode (nodeID: string) {
    this.interactableService.editNode(nodeID);
  }

  DeleteEntryPoint() {
    this.deleteEntryPoint.emit(this.entryPoint);
  }

  ChangeNode(e: string) {
    this.node = this.interactableService.currentInteractable.nodes.GetAtId(e);
  }

}
