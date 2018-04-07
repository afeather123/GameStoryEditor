import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Variable } from '../../models/variable';
import { VariableSelectService } from '../../services/variable-select.service';
import { ScopeVariables } from '../../models/ScopeVariables';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-local-var-editor',
  templateUrl: './local-var-editor.component.html',
  styleUrls: ['./local-var-editor.component.css']
})
export class LocalVarEditorComponent implements OnInit, OnDestroy {

  currentScope: ScopeVariables;
  subscription: Subscription;
  searchString = '';

  constructor(private variableSelectService: VariableSelectService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentScope = this.variableSelectService.currentLocalScope;
    this.subscription = this.variableSelectService.LocalScopeObservable().subscribe((scopeVars: ScopeVariables) => {
      this.OnScopeChange(scopeVars); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addVariable(e: Event, type: string) {
    this.variableSelectService.addNewVariable(type, true);
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

  ChangeType(variable: Variable, type: string) {
    if (type === 'string') {
      variable.value = 'default';
    } else if (type === 'number') {
      variable.value = 0;
    } else if (type === 'boolean') {
      variable.value = true;
    }
  }

  TypeOf(variable: Variable) {
    return typeof variable.value;
  }
}
