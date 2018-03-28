import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../../models/choice';

@Component({
  selector: 'app-choice-collection',
  templateUrl: './choice-collection.component.html',
  styleUrls: ['./choice-collection.component.css']
})
export class ChoiceCollectionComponent implements OnInit {

  @Input() choices: Choice[] = [{
    text: 'kill bobby',
    nodeID: 'none',
    conditions: [{
      varID: 'none',
      value: 0,
      operator: '='
    }],
    setConditions: [{
        varID: 'none',
        value: 0,
        operator: '='
      }]
    },
    {
      text: 'kill bobby',
      nodeID: 'none',
      conditions: [{
        varID: 'none',
        value: 0,
        operator: '='
      }],
      setConditions: [{
        varID: 'none',
        value: 0,
        operator: '='
      }]
    },
    {
      text: 'kill bobby',
      nodeID: 'none',
      conditions: [{
        varID: 'none',
        value: 0,
        operator: '='
      }],
      setConditions: [{
        varID: 'none',
        value: 0,
        operator: '='
      }]
    }];

  constructor() { }

  ngOnInit() {
  }

  addChoice(e: Event) {
    const newChoice: Choice = {
      nodeID: 'none',
      text: 'default',
      conditions: [],
      setConditions: []
    };
    this.choices.unshift(newChoice);
    e.stopPropagation();
  }

  deleteChoice(choice: Choice) {
    const index = this.choices.indexOf(choice);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

}
