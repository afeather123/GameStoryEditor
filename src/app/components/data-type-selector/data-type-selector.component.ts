import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { DataType } from '../../models/dataType';

@Component({
  selector: 'app-data-type-selector',
  templateUrl: './data-type-selector.component.html',
  styleUrls: ['./data-type-selector.component.css']
})
export class DataTypeSelectorComponent implements OnInit {

  dataTypes: DataType[];
  @Input() data: any;
  @Input() propertyName: string;
  @Output() changeType = new EventEmitter<string>();

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.dataTypes = this._interactableService.dataSettings.dataTypes;
  }

  ChangeType(e: string) {
    this.changeType.emit(e);
  }

}
