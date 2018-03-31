import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Redirect } from '../../models/redirect';
import { InteractableService } from '../../services/interactable.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {


  @Input() redirect: Redirect = {
    nodeID: 'none',
    conditions: []
  };
  @Output() selectNode: EventEmitter<string> = new EventEmitter<string>();

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
  }

  OnChange(nodeID: string) {
    console.log(nodeID);
    this.selectNode.emit(nodeID);
  }

  goToNode() {
    this.interactableService.goToNode(this.redirect.nodeID);
  }

}
