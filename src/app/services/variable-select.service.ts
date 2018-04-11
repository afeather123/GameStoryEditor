import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';
import { Variable } from '../models/variable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ScopeVariables } from '../models/ScopeVariables';
import { ArrayList } from '../models/arraylist';
import { LoadJsonService } from './load-json.service';

interface ScopeVarObject {
  [key: string]: ScopeVariables;
}

@Injectable()
export class VariableSelectService {

  constructor(private http: Http, private loadJsonService: LoadJsonService) {
    loadJsonService.VariableLoadObservable().subscribe((data: any) => {
      this.loadVariables(data);
    });
  }

  allVariables: ArrayList<Variable> = new ArrayList<Variable>();
  // allVariables: Variable[] = [];
  // allKeys: string[] = [];
  globalVars: ScopeVariables = new ScopeVariables();
  localVars: ScopeVarObject = {};
  currentLocalScope: ScopeVariables = null;
  currentScopeID: string;

  varCount = 0;

  private nameChangeListeners = new Subject();
  private deleteVariableListeners = new Subject<string>();
  private localScopeListeners = new Subject<ScopeVariables>();
  private loadVariablesListeners = new Subject<any>();

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
    if (this.localVars[interactableId] === undefined) {
      return;
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
    if (variable !== null) {
      return typeof variable.value;
    } else {
      return 'none';
    }
  }

  stringifyVariables(): any {
    const allData = {
      allVariables: this.allVariables,
      globalVars: this.globalVars,
      localVars: this.localVars
    };
    return allData;
  }

  loadVariables(data: any) {
    this.allVariables = new ArrayList(data['allVariables']);
    this.globalVars = new ScopeVariables(data['globalVars']);
    const localVarKeys = Object.keys(data['localVars']);
    this.localVars = {};
    localVarKeys.forEach(key => {
      this.localVars[key] = new ScopeVariables(data['localVars'][key]);
    });
    this.loadVariablesListeners.next();
  }

  LoadVariablesObservable(): Observable<any> {
    return this.loadVariablesListeners.asObservable();
  }
}

