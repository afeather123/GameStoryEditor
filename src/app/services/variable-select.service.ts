import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { Variable } from '../models/variable';
import { NameChange } from '../models/NameChange';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ScopeVariables } from '../models/ScopeVariables';

@Injectable()
export class VariableSelectService {

  constructor(private http: Http) {
    this.getJSON().subscribe((data: any) => {this.loadData(data.json().vars); });
  }

  allVariables: Variable[] = [];
  allKeys: string[] = [];
  globalVars: ScopeVariables = new ScopeVariables();

  varCount = 0;

  private varsListeners = new Subject<Variable[]>();
  private nameChangeListeners = new Subject<NameChange>();

  getJSON(): Observable<any> {
    return this.http.get('/assets/mock-data.json');
  }

  loadData(data: any) {
    for (let i = 0; i < data.length; i++) {
      const variable = {name: data[i].name, value: data[i].value, id: this.varCount};
      this.allVariables.push(variable);
      this.allKeys.push(this.varCount.toString());
      this.globalVars.addVariable(variable);
      this.varCount++;
    }
  }

  LoadVariables(vars: Variable[]) {
    this.globalVars.vars = vars;
    this.globalVars.keys = [];
    for (let i = 0; i < this.globalVars.vars.length; i++) {
      this.globalVars.keys.push(this.globalVars.vars[i].id.toString());
    }
    this.varsListeners.next(vars);
  }

  getAllVariables(): Variable[] {
    return this.allVariables;
  }

  addNewVariable(type: string, isLocal: boolean) {
    let value: (string | boolean | number) = '';
        if (type === 'string') {
        value = 'default';
        }
        if (type === 'number') {
        value = 0;
        }
        if (type === 'boolean') {
        value = false;
        }
        const variable = {
        name: 'variable' + this.varCount.toString(),
        value: value,
        id: this.varCount
        };
    this.allVariables.push(variable);
    this.allKeys.push(this.varCount.toString());
    if (!isLocal) {
      this.globalVars.addVariable(variable);
    }
    this.varCount++;
  }

  deleteVariable(id: string) {
    const index = this.allKeys.indexOf(id.toString());
    this.allVariables.splice(index, 1);
    this.allKeys.splice(index, 1);
    this.globalVars.deleteVariable(id);
  }

  renameVariable() {
      this.nameChangeListeners.next();
  }

  NameChangeObservable(): Observable<NameChange> {
    return this.nameChangeListeners.asObservable();
  }
}

