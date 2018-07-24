import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NodeData } from '../../models/nodeData';
import { DataSetting } from '../../models/DataSetting';
import { InteractableService } from '../../services/interactable.service';
import { GlobalDataSettings } from '../../models/globalDataSettings';

declare var $: any;

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  @Input() nodeData: NodeData[] = [];
  dataSettings: GlobalDataSettings;
  @ViewChild('collapse') collapse: ElementRef;

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.dataSettings = this._interactableService.dataSettings;
    $('.searchableSelect').select2();
  }


  changeType(data: NodeData,  type: string) {
    console.log('HAPPENING?');
    if (typeof data.values['value'] === type) {
      return;
    } else {
      if (type === 'string') {
        data.values['value'] = 'default';
      } else if (type === 'number') {
        data.values['value'] = 0;
      } else if (type === 'boolean') {
        data.values['value'] = true;
      }
    }
  }

  TypeOf (data: NodeData) {
    return typeof data.values['value'];
  }

  changeBool(bool: string, data: NodeData) {
    if (bool === 'true') {
      data.values['value'] = true;
    } else {
      data.values['value'] = false;
    }
  }

  log(e) {
    console.log(e);
  }

  addData(e: Event) {
    const newData: NodeData = {
      name: 'data',
      values: {
        value: 'default'
      }
    };
    if (this.dataSettings.settings.length > 0) {
      newData.name = this.dataSettings.settings[0].name;
    }
    this.nodeData.unshift(newData);
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

  deleteData(data: NodeData) {
    const index = this.nodeData.indexOf(data);
    if (index >= 0) {
      this.nodeData.splice(index, 1);
    }
  }

  getSetting(settingName: string): DataSetting {
    let thisSetting: DataSetting;
    this.dataSettings.settings.forEach(setting => {
      if (setting.name === settingName) {
        thisSetting = setting;
      }
    });
    return thisSetting;
  }

  dataHasSettingAndFields(dataName: string): boolean {
    const dataSetting = this.getSetting(dataName);
    if (dataSetting === undefined) {
      return null;
    }
    if (dataSetting.dataFields !== undefined && dataSetting.dataFields.length > 0) {
      return true;
    }
    return false;
  }

  changeDataName(data: NodeData, newName: string) {
    data.name = newName;
    const hasFields = this.dataHasSettingAndFields(newName);
    if (hasFields !== true) {
      const keys = Object.keys(data.values);
      keys.forEach(key => {
        if (key !== 'value') {
          delete data.values[key];
        }
      });
    }
  }
}
