import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { DownloadService } from './download.service';

@Injectable()
export class LoadJsonService {


  data: any;
  jstreeDataListeners: Subject<any> = new Subject<any>();
  interactableData: Subject<any> = new Subject<any>();
  variableData: Subject<any> = new Subject<any>();
  dataSettingsData: Subject<any> = new Subject<any>();
  loadProjectName: Subject<string> = new Subject<string>();

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

  DattaSettingsLoadObservable(): Observable<any> {
    return this.dataSettingsData.asObservable();
  }

  VariableLoadObservable(): Observable<any> {
    return this.variableData.asObservable();
  }

  ProjectNameObservable() {
    return this.loadProjectName.asObservable();
  }

  uploadProject(projectData: any) {
    this.interactableData.next(projectData['interactables']);
    this.variableData.next(projectData['variables']);
    this.jstreeDataListeners.next(projectData['jstree']);
    this.dataSettingsData.next(projectData['dataSettings']);
  }

  loadFile(file: any) {
    let fr;
      // this._downloadService.ChangeFileName(file.name.substr(0, file.name.length - 5));
      this.loadProjectName.next(file.name.substr(0, file.name.length - 5));
      fr = new FileReader();
      fr.onload = this.recievedText();
      fr.readAsText(file);
  }

  recievedText() {
    return (e) => {
      console.log(e);
      const lines = e.target.result;
      const newArr = JSON.parse(lines);
      this.uploadProject(newArr);
    };
  }
}
