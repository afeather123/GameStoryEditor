import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DialogueNode } from '../../models/node';
import { InteractableService } from '../../services/interactable.service';
import { EditorNodes } from '../../models/editornodes';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-node-display',
  templateUrl: './node-display.component.html',
  styleUrls: ['./node-display.component.css']
})
export class NodeDisplayComponent implements OnInit, OnDestroy {

  editorNodes: EditorNodes = {
    currentNode: null,
    nodeTrail: []
  };
  @ViewChild('mainNode') mainNode: ElementRef;
  nodeChangeSubscription: Subscription;
  interactableSubscription: Subscription;

  constructor(private interactableService: InteractableService) {
  }

  ngOnInit() {
    this.nodeChangeSubscription = this.interactableService.NodeChangeObservable().subscribe((editorNodes: EditorNodes) => {
      this.editorNodes = editorNodes;
      this.mainNode.nativeElement.scrollIntoView(true);
    });
    this.interactableSubscription = this.interactableService.InteractableObservable().subscribe(() => {
      this.editorNodes = {
        currentNode: null,
        nodeTrail: []
      };
    });
  }

  ngOnDestroy() {
    this.nodeChangeSubscription.unsubscribe();
    this.interactableSubscription.unsubscribe();
  }

  returnToNode(node: DialogueNode) {
    this.interactableService.returnToNode(node);
  }

}
