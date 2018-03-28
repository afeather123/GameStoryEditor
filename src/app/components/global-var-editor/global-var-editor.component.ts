import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VariableSelectService } from '../../services/variable-select.service';
import { Variable } from '../../models/variable';

declare var $: any;

@Component({
  selector: 'app-global-var-editor',
  templateUrl: './global-var-editor.component.html',
  styleUrls: ['./global-var-editor.component.css']
})
export class GlobalVarEditorComponent implements OnInit {

  stringVariables: Variable[];
  boolVariables: Variable[];
  numVariables: Variable[];
  @ViewChild('stringVars') stringVars: ElementRef;
  @ViewChild('boolVars') boolVars: ElementRef;
  @ViewChild('numVars') numVars: ElementRef;

  constructor(private variableSelectService: VariableSelectService) { }

  ngOnInit() {
    this.OnLoadVariables();
    this.variableSelectService.LoadVariablesObservable().subscribe(() => {
      console.log('working?');
      this.OnLoadVariables();
    });
  }

  OnLoadVariables() {
    this.stringVariables = this.variableSelectService.globalVars.stringVars;
    this.boolVariables = this.variableSelectService.globalVars.boolVars;
    this.numVariables = this.variableSelectService.globalVars.numVars;
  }

  addVariable(e: Event, type: string) {
    this.variableSelectService.addNewVariable(type, false);
    if (type === 'string') {
      $(this.stringVars.nativeElement).collapse('show');
    } else if (type === 'number') {
      $(this.numVars.nativeElement).collapse('show');
    } else if (type === 'boolean') {
      $(this.boolVars.nativeElement).collapse('show');
    }
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
