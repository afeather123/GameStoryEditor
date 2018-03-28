import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryPoint } from '../../models/entrypoint';
import { InteractableService } from '../../services/interactable.service';

@Component({
  selector: 'app-entrypoint',
  templateUrl: './entrypoint.component.html',
  styleUrls: ['./entrypoint.component.css']
})
export class EntrypointComponent implements OnInit {


  @Input() entryPoint: EntryPoint = {
    name: 'something',
    id: '0',
    redirect: {
      nodeID: 'none',
      conditions: []
    }
  };
  @Output() deleteEntryPoint: EventEmitter<EntryPoint> = new EventEmitter<EntryPoint>();

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
  }

  editNode (nodeID: string) {
    this.interactableService.editNode(nodeID);
  }

  DeleteEntryPoint() {
    this.deleteEntryPoint.emit(this.entryPoint);
  }
}
