import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Variable } from '../../models/variable';
import { VariableSelectService } from '../../services/variable-select.service';
import { timeout } from 'q';
import { NameChange } from '../../models/NameChange';
import { Condition } from '../../models/condition';
declare var $: any;

@Component({
  selector: 'app-global-var-select',
  templateUrl: './global-var-select.component.html',
  styleUrls: ['./global-var-select.component.css']
})
export class GlobalVarSelectComponent implements OnInit {

  variables: Variable[] = [];
  @ViewChild('varSelect') varSelect: ElementRef;
  @Input() condition: Condition;

  constructor(private variableSelectService: VariableSelectService) { }

  ngOnInit() {
    this.variables = this.variableSelectService.getAllVariables();
    setTimeout(() => {$(this.varSelect.nativeElement).select2(); }, 2 );
    $(this.varSelect.nativeElement).value = this.condition.varID;
    $(this.varSelect.nativeElement).bind('change', (e) => {
      this.condition.varID = e.target.value;
    })
    this.variableSelectService.NameChangeObservable().subscribe(() => {this.OnVarNameChange(); });
  }

  OnAddVariable(variable: Variable) {
    this.variables.unshift(variable);
  }

  OnVarNameChange() {
    // console.log(nameChange);
    // this.variables[nameChange.index].name = nameChange.name;
    setTimeout(() => {$(this.varSelect.nativeElement).select2(); }, 2 );
  }

  OnLoadVariables(vars: Variable[]) {
    this.variables = vars;
    setTimeout(() => {$(this.varSelect.nativeElement).select2(); }, 2 );
  }

  OnChange(e: any) {
    console.log("Is this happening?");
    this.condition.varID = e.target.value;
  }

}
