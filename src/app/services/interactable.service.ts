import { Injectable } from '@angular/core';
import { Interactable } from '../models/interactable';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { DialogueNode } from '../models/node';
import { Subscription } from 'rxjs/Subscription';
import { EditorNodes } from '../models/editornodes';
import { LoadJsonService } from './load-json.service';
import { DataSetting } from '../models/DataSetting';
import { GlobalDataSettings } from '../models/globalDataSettings';
import { VariableSelectService } from './variable-select.service';
import {ElectronService} from 'ngx-electron';
import {DirectoryData} from '../../../iterateFolders';
import { DataOption } from '../models/DataOption';
import { join } from 'path';
import { AssetService } from './asset.service';
import { DataType } from '../models/dataType';

interface InteractableObject {
  [key: string]: Interactable;
}

@Injectable()
export class InteractableService {

  interactables: InteractableObject = {};
  currentInteractable: Interactable;
  dataSettings: GlobalDataSettings =  new GlobalDataSettings();
  jsTreeData: any;

  interactableSubscribers: Subject<Interactable> = new Subject<Interactable>();
  addNodeSubscribers: Subject<DialogueNode> = new Subject<DialogueNode>();
  nameChangeListeners: Subject<string> = new Subject<string>();
  deletNodeListeners: Subject<string> = new Subject<string>();
  jsTreeRequestListener: Subject<string> = new Subject<string>();
  jsTreeLoadListener: Subject<string> = new Subject<string>();


  editorNodes: EditorNodes = {
    currentNode: null,
    nodeTrail: []
  };

  nodeChangeListeners: Subject<EditorNodes> = new Subject<EditorNodes>();

  constructor(private loadJsonService: LoadJsonService,
    private _variableSelectService: VariableSelectService,
    _electronService: ElectronService,
    _assetService: AssetService) {
    loadJsonService.InteractableLoadObservable().subscribe((data: any) => {
      this.loadInteractables(data);
    });
    loadJsonService.DattaSettingsLoadObservable().subscribe((data: any) => {
      const loadedSettings = new GlobalDataSettings();
      loadedSettings.presets = data.presets;
      loadedSettings.settings = data.settings.map(setting =>  new DataSetting(setting));
      loadedSettings.dataTypes = data.dataTypes;
      loadedSettings.topFolder = data.topFolder;
      this.dataSettings = loadedSettings;
    });
    _electronService.ipcRenderer.on('asset-settings', (event, args: DirectoryData) => {
      const subdirectoryData = args.subdirectoryData;
      this.dataSettings.topFolder = args.path;
      for (let i = 0; i < subdirectoryData.length; i++) {
        const splitDirectory = subdirectoryData[i].relativePath.split('\\');
        const dataSetting = new DataSetting({
          name: splitDirectory[splitDirectory.length - 1],
          type: splitDirectory[splitDirectory.length - 1],
          path: subdirectoryData[i].relativePath,
          options: []
        });
        const dataType: DataType = {
          name: splitDirectory[splitDirectory.length - 1],
          path: subdirectoryData[i].relativePath,
          options: []
        };
        for (let j = 0; j < subdirectoryData[i].files.length; j++) {
          const dataOption: DataOption = {
            option: subdirectoryData[i].files[j].split('.')[0],
            fileName: [args.path, subdirectoryData[i].relativePath, subdirectoryData[i].files[j]].join('\\')
          };
          dataType.options.push(dataOption);
        }
        dataSetting.options = dataType.options;
        this.dataSettings.dataTypes.push(dataType);
        if (this.dataSettings.settings.filter(setting => setting.name === dataSetting.name).length <= 0) {
          this.dataSettings.settings.push(dataSetting);
        } else {
          const index = this.dataSettings.settings.findIndex(setting => setting.name === dataSetting.name);
          this.dataSettings.settings[index] = dataSetting;
        }
      }
    });
  }

  addInteractable(id: string) {
    const newInteractable = new Interactable();
    newInteractable.dataSettings = this.dataSettings;
    this.interactables[id] = newInteractable;
  }

  selectInteractable(id: string) {
    if (id in this.interactables) {
      this.currentInteractable = this.interactables[id];
    }
    this.interactableSubscribers.next(this.currentInteractable);
  }

  InteractableObservable(): Observable<Interactable> {
    return this.interactableSubscribers.asObservable();
  }

  AddNodeObservable(): Observable<DialogueNode> {
    return this.addNodeSubscribers.asObservable();
  }

  NameChangeObservable(): Observable<any> {
    return this.nameChangeListeners.asObservable();
  }

  DeleteNodeObservable(): Observable<string> {
    return this.deletNodeListeners.asObservable();
  }

  changeNodeName(nodeID: string) {
    this.nameChangeListeners.next(nodeID);
  }

  addNode() {
    this.addNodeSubscribers.next(this.jsTreeData);
  }

  deleteNode(id: string) {
    this.deletNodeListeners.next(id);
  }

  editNode(id: string) {
    this.editorNodes.currentNode = this.currentInteractable.nodes.GetAtId(id);
    this.editorNodes.nodeTrail = [];
    this.nodeChangeListeners.next(this.editorNodes);
  }

  goToNode(id: string) {
    this.editorNodes.nodeTrail.push(this.editorNodes.currentNode);
    this.editorNodes.currentNode = this.currentInteractable.nodes.GetAtId(id);
    this.nodeChangeListeners.next(this.editorNodes);
  }

  returnToNode(node: DialogueNode) {
    const index = this.editorNodes.nodeTrail.indexOf(node);
    if (index >= 0) {
      this.editorNodes.currentNode = this.editorNodes.nodeTrail[index];
      this.editorNodes.nodeTrail.splice(index, (this.editorNodes.nodeTrail.length - index));
    }
    this.nodeChangeListeners.next(this.editorNodes);
  }

  NodeChangeObservable(): Observable<EditorNodes> {
    return this.nodeChangeListeners.asObservable();
  }

  getInteractables(): InteractableObject {
    return this.interactables;
  }

  loadInteractables(data: any) {
    const loadedInteractables = {};
    const keys = Object.keys(data);
    keys.forEach(key => {
      const interactable = new Interactable(data[key], this._variableSelectService);
      loadedInteractables[key] = interactable;
    });
    this.interactables = loadedInteractables;
  }

  FileTreeLoadRequestObservable(): Observable<string> {
    return this.jsTreeRequestListener.asObservable();
  }

  requestFileTree() {
    this.jsTreeRequestListener.next();
  }

  JSTreeLoadObservable(): Observable<string> {
    return this.jsTreeLoadListener.asObservable();
  }

  loadFileTree(fileTree: string) {
    this.jsTreeLoadListener.next(fileTree);
  }

  updateFileTree(fileTree: any) {
    this.jsTreeData = fileTree;
  }
}
