import { Component, OnInit, Input } from '@angular/core';
import { NodeData } from '../../models/nodeData';

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  @Input() nodeData: NodeData[] = [];

  constructor() { }

  ngOnInit() {
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
    this.nodeData.unshift(newData);
    e.stopPropagation();
  }

  deleteData(data: NodeData) {
    const index = this.nodeData.indexOf(data);
    if (index >= 0) {
      this.nodeData.splice(index, 1);
    }
  }

}
