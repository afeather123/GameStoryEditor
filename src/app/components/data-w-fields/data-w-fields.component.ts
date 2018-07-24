import { Component, OnInit, Input } from '@angular/core';
import { NodeData } from '../../models/nodeData';
import { GlobalDataSettings } from '../../models/globalDataSettings';
import { InteractableService } from '../../services/interactable.service';
import { DataSetting } from '../../models/DataSetting';
import { DataField } from '../../models/dataField';
import { DataOption } from '../../models/DataOption';

@Component({
  selector: 'app-data-w-fields',
  templateUrl: './data-w-fields.component.html',
  styleUrls: ['./data-w-fields.component.css']
})
export class DataWFieldsComponent implements OnInit {

  static count = 0;
  id: number;
  @Input() nodeData: NodeData;
  fields: DataField[];
  dataSettings: GlobalDataSettings;

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.dataSettings = this._interactableService.dataSettings;
    this.id = DataWFieldsComponent.count++;
    this.fields = this.getFields(this.nodeData.name);
    const keys = Object.keys(this.nodeData.values);
    keys.forEach(key => {
      if (this.fields.filter(field => field.name === key).length <= 0) {
        this.nodeData.values[key] = undefined;
      }
    });
    this.fields.forEach(field => {
      if (this.nodeData.values[field.name] === undefined) {
        if (field.type === 'string') {
          this.nodeData.values[field.name] = 'default';
        } else if (field.type === 'boolean') {
          this.nodeData.values[field.name] = true;
        } else {
          this.nodeData.values[field.name] = 0;
        }
      }
    });
  }

  getFields(settingName: string): DataField[] {
    let thisSetting: DataSetting;
    this.dataSettings.settings.forEach(setting => {
      if (setting.name === settingName) {
        thisSetting = setting;
      }
    });
    return thisSetting.dataFields;
  }

  getFieldOptions(field: DataField): string[] {
    const options: string[] = [];
    field.options.forEach(option => {
      options.push(option.option);
    });
    return options;
  }

  changeBool(value: string, fieldName: string) {
    if (value === 'true') {
      this.nodeData.values[fieldName] = true;
    } else {
      this.nodeData.values[fieldName] = false;
    }
  }

}
