import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSetting } from '../../models/DataSetting';
import { DataField } from '../../models/dataField';
import { findDataTypeOfName } from '../../models/model_functions/findDataTypeOfName';
import { InteractableService } from '../../services/interactable.service';

@Component({
  selector: 'app-data-options',
  templateUrl: './data-options.component.html',
  styleUrls: ['./data-options.component.css']
})
export class DataOptionsComponent implements OnInit {

  static count = 0;
  id: number;
  optionName = '';
  @Input() dataSetting: DataSetting;
  @Output() deleteSetting: EventEmitter<DataSetting> = new EventEmitter<DataSetting>();

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.id = DataOptionsComponent.count ++;
  }

  ChangeType(e: string) {
    console.log(e);
    if (e !== this.dataSetting.type) {
      this.dataSetting.type = e;
      if (e !== 'string' && e !== 'number' && e !== 'boolean') {
        const dataType = findDataTypeOfName(this._interactableService.dataSettings.dataTypes, e);
        this.dataSetting.options = dataType.options;
      } else {
        this.dataSetting.options = [];
      }
    }
  }

  AddOption() {
    this.dataSetting.options.push({option: this.optionName });
  }

  AddField() {
    const dataField: DataField = {
      name: 'default',
      type: 'string',
      options: [{option: 'choice name'}]
    };
    if (this.dataSetting.dataFields === null || this.dataSetting.dataFields === undefined) {
      this.dataSetting.dataFields = [];
    }
    this.dataSetting.dataFields.push(dataField);
  }

  DeleteField(field: DataField) {
    const index = this.dataSetting.dataFields.indexOf(field);
    this.dataSetting.dataFields.splice(index, 1);
  }

  DeleteSetting() {
    this.deleteSetting.emit(this.dataSetting);
  }
}
