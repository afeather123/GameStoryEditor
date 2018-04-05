import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSetting } from '../../models/DataSetting';

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

  constructor() { }

  ngOnInit() {
    this.id = DataOptionsComponent.count ++;
  }

  ChangeType(e) {
    console.log(e);
    if (e.target.value !== this.dataSetting.type) {
      this.dataSetting.options = [];
      this.dataSetting.type = e.target.value;
    }
  }

  AddOption() {
    this.dataSetting.options.push({option: this.optionName });
  }

  DeleteSetting() {
    this.deleteSetting.emit(this.dataSetting);
  }
}
