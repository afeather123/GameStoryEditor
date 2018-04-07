import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VariableSelectService } from '../../services/variable-select.service';
import { Variable } from '../../models/variable';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-global-var-editor',
  templateUrl: './global-var-editor.component.html',
  styleUrls: ['./global-var-editor.component.css']
})
export class GlobalVarEditorComponent implements OnInit, OnDestroy {

  globalVariables: Variable[];
  subscription: Subscription;
  searchString = '';
  @ViewChild('collapse') collapse: ElementRef;

  constructor(private variableSelectService: VariableSelectService) { }

  ngOnInit() {
    this.OnLoadVariables();
    this.subscription = this.variableSelectService.LoadVariablesObservable().subscribe(() => {
      console.log('working?');
      this.OnLoadVariables();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  OnLoadVariables() {
    this.globalVariables = this.variableSelectService.globalVars.vars;
  }

  addVariable(e: Event, type: string) {
    $(this.collapse.nativeElement).collapse('show');
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
