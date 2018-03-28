import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

@Injectable()
export class LoadJsonService {


  data: any;
  jstreeDataListeners: Subject<any> = new Subject<any>();
  interactableData: Subject<any> = new Subject<any>();
  variableData: Subject<any> = new Subject<any>();

  constructor(private http: Http) {
    this.getJSON().subscribe((data: any) => {
      this.data = data.json();
      this.jstreeDataListeners.next(this.data['jstree']);
    });
   }

  getJSON() {
    return this.http.get('/assets/mock-data.json');
  }

  getJSTreeData(): Observable<any> {
    return this.jstreeDataListeners.asObservable();
  }

  InteractableLoadObservable(): Observable<any> {
    return this.interactableData.asObservable();
  }

  VariableLoadObservable(): Observable<any> {
    return this.variableData.asObservable();
  }

  uploadProject(projectData: any) {
    this.interactableData.next(projectData['interactables']);
    this.variableData.next(projectData['variables']);
    this.jstreeDataListeners.next(projectData['jstree']);
  }
}
