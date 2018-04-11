import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { DownloadService } from './download.service';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class LoadJsonService {


  data: any;
  jstreeDataListeners: Subject<any> = new Subject<any>();
  interactableData: Subject<any> = new Subject<any>();
  variableData: Subject<any> = new Subject<any>();
  dataSettingsData: Subject<any> = new Subject<any>();
  loadProjectName: Subject<string> = new Subject<string>();

  constructor(private http: Http, private _electronService: ElectronService) {
    this.getJSON().subscribe((data: any) => {
      this.data = data.json();
      this.jstreeDataListeners.next(this.data['jstree']);
    });

    _electronService.ipcRenderer.on('upload-project', (event, args) => {
      this.loadFromElectron(args);
    });

    this._electronService.ipcRenderer.on('hello', () => { this.playPingPong(); });
   }

   public playPingPong() {
    if (this._electronService.isElectronApp) {
        this._electronService.ipcRenderer.send('ping', 'Hey there');
    }
}

  getJSON() {
    return this.http.get('./assets/mock-data.json');
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
    this.dataSettingsData.next(projectData['dataSettings']);
    this.variableData.next(projectData['variables']);
    this.interactableData.next(projectData['interactables']);
    this.jstreeDataListeners.next(projectData['jstree']);
  }

  loadFile(file: any) {
    let fr: FileReader;
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

  loadFromElectron(arg: string) {
    const newArr = JSON.parse(arg);
    this.uploadProject(newArr);
  }
}
