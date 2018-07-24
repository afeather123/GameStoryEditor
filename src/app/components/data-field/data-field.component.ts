import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataField } from '../../models/dataField';
import { InteractableService } from '../../services/interactable.service';
import { findDataTypeOfName } from '../../models/model_functions/findDataTypeOfName';

@Component({
  selector: 'app-data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.css']
})
export class DataFieldComponent  implements OnInit {

  static count = 0;
  id: number;
  optionName = '';
  @Input() dataField: DataField;
  @Output() deleteField: EventEmitter<DataField> = new EventEmitter<DataField>();

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.id = DataFieldComponent.count ++;
  }

  ChangeType(e: string) {
    if (e !== this.dataField.type) {
      this.dataField.type = e;
      if (e !== 'string' && e !== 'number' && e !== 'boolean') {
        const dataType = findDataTypeOfName(this._interactableService.dataSettings.dataTypes, e);
        this.dataField.options = dataType.options;
      } else {
        this.dataField.options = [];
      }
    }
  }

  AddOption() {
    this.dataField.options.push({option: this.optionName});
  }

  DeleteField() {
    this.deleteField.emit(this.dataField);
  }
}
