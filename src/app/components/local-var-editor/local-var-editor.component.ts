import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Variable } from '../../models/variable';
import { VariableSelectService } from '../../services/variable-select.service';
import { ScopeVariables } from '../../models/ScopeVariables';

declare var $: any;

@Component({
  selector: 'app-local-var-editor',
  templateUrl: './local-var-editor.component.html',
  styleUrls: ['./local-var-editor.component.css']
})
export class LocalVarEditorComponent implements OnInit {

  currentScope: ScopeVariables;
  @ViewChild('stringVars') stringVars: ElementRef;
  @ViewChild('boolVars') boolVars: ElementRef;
  @ViewChild('numVars') numVars: ElementRef;

  constructor(private variableSelectService: VariableSelectService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentScope = this.variableSelectService.currentLocalScope;
    this.variableSelectService.LocalScopeObservable().subscribe((scopeVars: ScopeVariables) => {this.OnScopeChange(scopeVars); });
  }

  addVariable(e: Event, type: string) {
    this.variableSelectService.addNewVariable(type, true);
    if (type === 'string') {
      $(this.stringVars.nativeElement).collapse('show');
    } else if (type === 'number') {
      $(this.numVars.nativeElement).collapse('show');
    } else if (type === 'boolean') {
      $(this.boolVars.nativeElement).collapse('show');
    }
    e.stopPropagation();
  }

  OnScopeChange(scopeVars: ScopeVariables) {
    this.currentScope = scopeVars;
    this.changeDetectorRef.detectChanges();
  }

  deleteVariable(id: string) {
    this.variableSelectService.deleteVariable(id);
  }

  OnChange() {
    this.variableSelectService.renameVariable();
  }

  ChangeBoolValue(variable: Variable, e: any) {
    variable.value = (e.target.value === 'true');
  }
}
