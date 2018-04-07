import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Variable } from '../../models/variable';
import { VariableSelectService } from '../../services/variable-select.service';
import { timeout } from 'q';
import { Condition } from '../../models/condition';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
  selector: 'app-global-var-select',
  templateUrl: './global-var-select.component.html',
  styleUrls: ['./global-var-select.component.css']
})
export class GlobalVarSelectComponent implements OnInit, OnDestroy {

  variables: Variable[] = [];
  @ViewChild('varSelect') varSelect: ElementRef;
  @Input() condition: Condition;
  @Output() changeCondition = new EventEmitter<Condition>();
  private nameChangeSubscription: Subscription;
  private deleteVarSubscription: Subscription;

  constructor(private variableSelectService: VariableSelectService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.variables = this.variableSelectService.getAllVariables();
    setTimeout(() => {$(this.varSelect.nativeElement).select2({
      width: 'resolve' // need to override the changed default
  }); }, 2 );
    $(this.varSelect.nativeElement).value = this.condition.varID;
    $(this.varSelect.nativeElement).bind('change', (e) => {
      this.condition.varID = e.target.value;
      this.changeCondition.emit(this.condition);
    });
    this.nameChangeSubscription = this.variableSelectService.NameChangeObservable().subscribe(() => {this.OnVarNameChange(); });
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
    this.deleteVarSubscription.unsubscribe();
  }

  OnAddVariable(variable: Variable) {
    this.variables.unshift(variable);
  }

  OnVarNameChange() {
    // console.log(nameChange);
    // this.globalVariables[nameChange.index].name = nameChange.name;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {$(this.varSelect.nativeElement).select2(); }, 2 );
  }

  OnLoadVariables(vars: Variable[]) {
    this.variables = vars;
    setTimeout(() => {$(this.varSelect.nativeElement).select2(); }, 2 );
  }

  OnChange(e: any) {
    console.log('working?');
    this.condition.varID = e.target.value;
  }

}
