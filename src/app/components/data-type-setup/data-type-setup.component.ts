import { Component, OnInit } from '@angular/core';
import { GlobalDataSettings } from '../../models/globalDataSettings';
import { InteractableService } from '../../services/interactable.service';
import { DataType } from '../../models/dataType';

@Component({
  selector: 'app-data-type-setup',
  templateUrl: './data-type-setup.component.html',
  styleUrls: ['./data-type-setup.component.css']
})
export class DataTypeSetupComponent implements OnInit {

  typeName: string;
  dataSettings: GlobalDataSettings;

  constructor(private _interactableService: InteractableService) { }

  ngOnInit() {
    this.dataSettings = this._interactableService.dataSettings;
  }

  addType() {
    const newDataType: DataType = {
      name: this.typeName,
      options: [{option: 'option'}]
    };
    this._interactableService.dataSettings.dataTypes.push(newDataType);
  }

  deleteType(dataType: DataType) {
    const index = this.dataSettings.dataTypes.indexOf(dataType);
    this.dataSettings.dataTypes.splice(index, 1);
  }

}
