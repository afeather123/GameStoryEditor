import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { Variable } from '../models/variable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ScopeVariables } from '../models/ScopeVariables';
import { ArrayList } from '../models/arraylist';

interface ScopeVarObject {
  [key: string]: ScopeVariables;
}

@Injectable()
export class VariableSelectService {

  constructor(private http: Http) {
    this.getJSON().subscribe((data: any) => {this.loadData(data.json().vars); });
  }

  allVariables: ArrayList<Variable> = new ArrayList<Variable>();
  // allVariables: Variable[] = [];
  // allKeys: string[] = [];
  globalVars: ScopeVariables = new ScopeVariables();
  localVars: ScopeVarObject = {};
  currentLocalScope: ScopeVariables = new ScopeVariables();
  currentScopeID: string;

  varCount = 0;

  private nameChangeListeners = new Subject();
  private deleteVariableListeners = new Subject<string>();
  private localScopeListeners = new Subject<ScopeVariables>();

  getJSON(): Observable<any> {
    return this.http.get('/assets/mock-data.json');
  }

  loadData(data: Variable[]) {
    for (let i = 0; i < data.length; i++) {
      this.allVariables.Add(data[i]);
      this.globalVars.addVariable(data[i]);
    }
  }

  LoadVariables(vars: Variable[]) {
    this.globalVars.vars = vars;
    this.globalVars.keys = [];
    for (let i = 0; i < this.globalVars.vars.length; i++) {
      this.globalVars.keys.push(this.globalVars.vars[i].id.toString());
    }
  }

  getAllVariables(): Variable[] {
    return this.allVariables.array;
  }

  getLocalVariables(): Variable[] {
    return this.currentLocalScope.vars;
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
        id: 'none'
        };
    this.allVariables.Add(variable);
    if (!isLocal) {
      this.globalVars.addVariable(variable);
    } else {
      this.currentLocalScope.addVariable(variable);
    }
    this.varCount++;
  }

  deleteVariable(id: string) {
    this.allVariables.Remove(id);
    this.globalVars.deleteVariable(id);
    if (this.currentLocalScope != null) {
      this.currentLocalScope.deleteVariable(id);
    }
    this.deleteVariableListeners.next(id);
  }

  renameVariable() {
    this.nameChangeListeners.next();
  }

  NameChangeObservable(): Observable<any> {
    return this.nameChangeListeners.asObservable();
  }

  AddNewScope(interactableId: string) {
    this.localVars[interactableId] = new ScopeVariables();
  }

  DeleteScope(interactableId: string) {
    if (this.currentScopeID = interactableId) {
      this.localScopeListeners.next(null);
      this.currentLocalScope = null;
      this.localScopeListeners.next(null);
    }
    const keys = this.localVars[interactableId].keys;
    delete this.localVars[interactableId];
    console.log(keys.length);
    keys.forEach(key => {
      this.deleteVariable(key);
    });
    this.nameChangeListeners.next();
  }

  ChangeLocalScope(interactableId: string) {
    this.currentLocalScope = this.localVars[interactableId];
    this.currentScopeID = interactableId;
    this.localScopeListeners.next(this.currentLocalScope);
  }

  LocalScopeObservable(): Observable<ScopeVariables> {
    return this.localScopeListeners.asObservable();
  }

  DeleteVariableObservable(): Observable<string> {
    return this.deleteVariableListeners.asObservable();
  }

  CheckVariableType(id: string): string {
    const variable = this.allVariables.GetAtId(id);
    console.log(variable);
    return typeof variable.value;
  }
}

