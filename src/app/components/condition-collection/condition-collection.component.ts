import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Condition } from '../../models/condition';
import { VariableSelectService } from '../../services/variable-select.service';
import { ConditionOperators } from '../../models/ConditionOperators';
import { Variable } from '../../models/variable';

declare var $: any;

@Component({
  selector: 'app-condition-collection',
  templateUrl: './condition-collection.component.html',
  styleUrls: ['./condition-collection.component.css']
})
export class ConditionCollectionComponent implements OnInit {

  static idcount = 0;
  id: number;
  @ViewChild('collapse') collapse: ElementRef;
  @Input() conditions: Condition[] = [
    {
      varID: '0',
      operator: '!=',
      value: 'please',
      type: 'string'
    },
    {
      varID: 'none',
      operator: '=',
      value: 0
    }
  ] as Condition[];

  @Input() conditionOperators: ConditionOperators = {
    numberOperators: ['=', '!=', '>', '<', '>=', '<='],
    stringOperators: ['=', '!='],
    local: true,
    boolToggle: false
  };

  constructor(private variableSelectService: VariableSelectService) { }

  ngOnInit() {
    this.id = ConditionCollectionComponent.idcount++;
  }

  addCondition(e: Event) {
    const condition = {
      varID: 'none',
      operator: '=',
      value: true
    } as Condition;
    this.conditions.unshift(condition);
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

  conditionChanged(condition: Condition) {
    const type = this.variableSelectService.CheckVariableType(condition.varID);
    if (condition.type !== type) {
      condition.operator = '=';
      if (type === 'string') {
        condition.value = 'placeholder';
      } else if (type === 'number') {
        condition.value = 0;
      } else if (type === 'boolean') {
        condition.value = true;
      }
    }
    condition.type = type;
  }

  onBoolChange(e: any, condition: Condition) {
    if (e.target.value === 'true') {
      condition.value = true;
    } else {
      condition.value = false;
    }
  }

  deleteCondition(condition: Condition) {
    const index = this.conditions.indexOf(condition);
    if (index >= 0) {
      this.conditions.splice(index, 1);
    }
  }

}
