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
  @Input() name = 'Condition';
  @Input() class = 'condition';
  @ViewChild('collapse') collapse: ElementRef;
  @Input() conditions: Condition[] = [];

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
    const condition = new Condition();
    condition.varID = 'none';
    condition.operator = '=';
    condition.value = true;
    this.conditions.unshift(condition);
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

  conditionChanged(condition: Condition) {
  }

  TypeOfCondition(condition: Condition) {
    if (condition.varID === 'none' || condition.varID === undefined || condition.varID === null) {
      return 'none';
    } else {
      return typeof this.variableSelectService.allVariables.GetAtId(condition.varID).value;
    }
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
