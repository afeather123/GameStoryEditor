import { Component, OnInit } from '@angular/core';
import { DialogueNode } from '../../models/node';
import { InteractableService } from '../../services/interactable.service';
import { EditorNodes } from '../../models/editornodes';

@Component({
  selector: 'app-node-display',
  templateUrl: './node-display.component.html',
  styleUrls: ['./node-display.component.css']
})
export class NodeDisplayComponent implements OnInit {

  editorNodes: EditorNodes = {
    currentNode: null,
    nodeTrail: []
  };

  constructor(private interactableService: InteractableService) {}

  ngOnInit() {
    this.interactableService.NodeChangeObservable().subscribe((editorNodes: EditorNodes) => {
      this.editorNodes = editorNodes;
    });
  }

  returnToNode(node: DialogueNode) {
    this.interactableService.returnToNode(node);
  }

}
