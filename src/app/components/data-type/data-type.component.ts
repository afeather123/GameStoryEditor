import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataType } from '../../models/dataType';
import { DataOption } from '../../models/DataOption';

@Component({
  selector: 'app-data-type',
  templateUrl: './data-type.component.html',
  styleUrls: ['./data-type.component.css']
})
export class DataTypeComponent implements OnInit {

  static count = 0;
  id: number;
  @Input() dataType: DataType;
  @Output() deleteType = new EventEmitter<DataType>();
  optionName: string;

  constructor() { }

  ngOnInit() {
    this.id = DataTypeComponent.count++;
  }

  DeleteType() {
    this.deleteType.emit(this.dataType);
  }

  AddOption() {
    const option: DataOption = {
      option: this.optionName
    };
    this.dataType.options.push(option);
  }

}
