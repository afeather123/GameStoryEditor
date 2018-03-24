import { Component, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'app-variable-name',
  templateUrl: './variable-name.component.html',
  styleUrls: ['./variable-name.component.css']
})
export class VariableNameComponent implements OnInit, OnChanges {

  @Output() name;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for ( const propName in changes) {
      if (true) {
        const chng = changes[propName];
        console.log(chng.currentValue);
      }
    }
  }

  ngOnInit() {
  }

}
