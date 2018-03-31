import { Component, OnInit, Input } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';

@Component({
  selector: 'app-go-to-button',
  templateUrl: './go-to-button.component.html',
  styleUrls: ['./go-to-button.component.css']
})
export class GoToButtonComponent implements OnInit {

  @Input() nodeID: string;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
  }

  goToNode() {
    this.interactableService.goToNode(this.nodeID);
  }
}
