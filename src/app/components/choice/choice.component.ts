import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Choice } from '../../models/choice';
import { ConditionOperators } from '../../models/ConditionOperators';
import { Condition } from '../../models/condition';
import { NodeID } from '../../models/nodeID';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  static idCount = 0;
  static maxNameLength = 20;
  @Input() choice: Choice = {
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
  };
  id: number;
  @Output() deleteChoice: EventEmitter<Choice> = new EventEmitter<Choice>();

  setConditionOperators: ConditionOperators = {
    numberOperators: ['=', '+=', '-=', '*=', '/='],
    stringOperators: ['='],
    boolToggle: true,
    local: false
  };

  constructor() { }

  ngOnInit() {
    this.id = ChoiceComponent.idCount++;
  }

  addCondition(e: Event, setter: boolean) {
    const newCondition: Condition = {
      varID: 'none',
      value: 0,
      operator: '='
    };
    if (!setter) {
      if (this.choice.conditions === null || this.choice.conditions === undefined) {
        this.choice.conditions = [];
      }
      this.choice.conditions.unshift(newCondition);
    } else {
      if (this.choice.setConditions === null || this.choice.setConditions === undefined) {
        this.choice.setConditions = [];
      }
      this.choice.setConditions.unshift(newCondition);
    }
    e.stopPropagation();
  }

  truncateString(str: string): string {
    if (str.length > ChoiceComponent.maxNameLength) {
      const substring = str.substring(0, 19) + '...';
      return substring;
    } else {
      return str;
    }
  }

  DeleteChoice(e: Event) {
    this.deleteChoice.emit(this.choice);
    e.stopPropagation();
  }

}
