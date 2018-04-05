import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { DataSetting } from '../../models/DataSetting';
import { GlobalDataSettings } from '../../models/globalDataSettings';

@Component({
  selector: 'app-data-setup',
  templateUrl: './data-setup.component.html',
  styleUrls: ['./data-setup.component.css']
})
export class DataSetupComponent implements OnInit {

  dataSettings: GlobalDataSettings;
  dataName = '';

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.dataSettings = this._interactableService.dataSettings;
  }

  AddSetting() {

    const newSetting = new DataSetting( {
      name: this.dataName,
      type: 'string',
      options: []
    } );
    this.dataSettings.settings.unshift(newSetting);
  }

  DeleteSetting(setting: DataSetting) {
    const index = this.dataSettings.settings.indexOf(setting);
    if (index >= 0) {
      this.dataSettings.settings.splice(index, 1);
    }
  }

}
