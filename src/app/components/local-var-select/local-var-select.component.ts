import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Variable } from '../../models/variable';
import { Condition } from '../../models/condition';
import { Subscription } from 'rxjs/Subscription';
import { VariableSelectService } from '../../services/variable-select.service';
import { ScopeVariables } from '../../models/ScopeVariables';

declare var $: any;

@Component({
  selector: 'app-local-var-select',
  templateUrl: './local-var-select.component.html',
  styleUrls: ['./local-var-select.component.css']
})
export class LocalVarSelectComponent implements OnInit, OnDestroy, AfterViewInit {

  globalVariables: Variable[] = [];
  localScopeVariables: Variable[] = [];
  @ViewChild('varSelect') varSelect: ElementRef;
  @Input() condition: Condition;
  @Output() changeCondition = new EventEmitter<Condition>();
  private nameChangeSubscription: Subscription;
  private scopeChangeSubscription: Subscription;
  private deleteVarSubscription: Subscription;

  constructor(private variableSelectService: VariableSelectService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.globalVariables = this.variableSelectService.globalVars.vars;
    this.localScopeVariables = this.variableSelectService.currentLocalScope.vars;
  }

  ngAfterViewInit() {
    this.resetSelect();
    $(this.varSelect.nativeElement).value = this.condition.varID;
    $(this.varSelect.nativeElement).bind('change', (e) => {
      this.condition.varID = e.target.value;
      this.changeCondition.emit(this.condition);
    });
    this.nameChangeSubscription = this.variableSelectService.NameChangeObservable().subscribe(() => {this.OnVarNameChange(); });
    this.scopeChangeSubscription = this.variableSelectService.LocalScopeObservable().subscribe((scope) => { this.OnChangeScope(scope); } );
    this.deleteVarSubscription = this.variableSelectService.DeleteVariableObservable().subscribe((id: string) => {
      if (this.condition.varID === id) {
        this.condition.varID = 'none';
        this.changeDetectorRef.detectChanges();
        this.changeCondition.emit(this.condition);
      }
    });
  }

  ngOnDestroy() {
    this.nameChangeSubscription.unsubscribe();
    this.scopeChangeSubscription.unsubscribe();
    this.deleteVarSubscription.unsubscribe();
  }

  OnAddVariable(variable: Variable) {
    this.globalVariables.unshift(variable);
  }

  OnVarNameChange() {
    // console.log(nameChange);
    // this.globalVariables[nameChange.index].name = nameChange.name;
    this.changeDetectorRef.detectChanges();
    this.resetSelect();
  }

  OnLoadVariables(vars: Variable[]) {
    this.globalVariables = vars;
    this.resetSelect();
  }

  resetSelect() {
    setTimeout(() => {$(this.varSelect.nativeElement).select2({ width: 'resolve', 'max-width': 'resolve' }); }, 2 );
  }

  OnChange(e: any) {
    console.log('working?');
    this.condition.varID = e.target.value;
  }

  OnChangeScope(scope: ScopeVariables) {
    if (scope != null) {
      this.localScopeVariables = scope.vars;
      this.changeDetectorRef.detectChanges();
    } else {
      this.localScopeVariables = [];
    }
  }

}
