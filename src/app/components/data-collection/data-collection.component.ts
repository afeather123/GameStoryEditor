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
    if (typeof data.value === type) {
      return;
    } else {
      if (type === 'string') {
        data.value = 'default';
      } else if (type === 'number') {
        data.value = 0;
      } else if (type === 'boolean') {
        data.value = true;
      }
    }
  }

  TypeOf (data: NodeData) {
    return typeof data.value;
  }

  changeBool(bool: string, data: NodeData) {
    if (bool === 'true') {
      data.value = true;
    } else {
      data.value = false;
    }
  }

  addData(e: Event) {
    const newData: NodeData = {
      name: 'data',
      value: 'default'
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

  changeDataName(data: NodeData, newName: string) {
    data.name = newName;
  }
}
