import { Component, OnInit, ViewChild } from '@angular/core';
import { Variable } from '../../models/variable';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import { VariableSelectService } from '../../services/variable-select.service';
import { Condition } from '../../models/condition';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css']
})
export class MainEditorComponent implements OnInit {

  stringVariables: Variable[];
  boolVariables: Variable[];
  numVariables: Variable[];
  subscriptionSender$: Observable<Variable[]>;
  index: number;
  condition: Condition = {
    varID: "0",
    operator: "=",
    value: true
  }
  @ViewChild('variableSelect') variableSelect: any;

  constructor(private variableSelectService: VariableSelectService) {}

  ngOnInit() {

    this.index = 2;
    this.stringVariables = this.variableSelectService.globalVars.stringVars;
    this.boolVariables = this.variableSelectService.globalVars.boolVars;
    this.numVariables = this.variableSelectService.globalVars.numVars;
  }

  addVariable(e: Event, type: string) {
    this.variableSelectService.addNewVariable(type, false);
    e.stopPropagation();
  }

  deleteVariable(id: string) {
    this.variableSelectService.deleteVariable(id);
  }

  OnChange() {
    this.variableSelectService.renameVariable();
  }

  ChangeBoolValue(variable: Variable, e: any) {
    console.log(e.target.value === 'true');
    variable.value = (e.target.value === 'true');
  }
}
