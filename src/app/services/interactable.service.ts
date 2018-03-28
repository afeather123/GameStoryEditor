import { Injectable } from '@angular/core';
import { Interactable } from '../models/interactable';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { DialogueNode } from '../models/node';
import { Subscription } from 'rxjs/Subscription';
import { EditorNodes } from '../models/editornodes';
import { LoadJsonService } from './load-json.service';

interface InteractableObject {
  [key: string]: Interactable;
}

@Injectable()
export class InteractableService {

  interactables: InteractableObject = {};
  currentInteractable: Interactable;

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

  constructor(private loadJsonService: LoadJsonService) {
    loadJsonService.InteractableLoadObservable().subscribe((data: any) => {
      console.log('is this happening?');
      this.loadInteractables(data);
    });
  }

  addInteractable(id: string) {
    const newInteractable = new Interactable();
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
    this.addNodeSubscribers.next();
  }

  deleteNode(id: string) {
    this.deletNodeListeners.next(id);
  }

  editNode(id: string) {
    this.editorNodes.currentNode = this.currentInteractable.nodes.GetAtId(id);
    this.nodeChangeListeners.next(this.editorNodes);
  }

  goToNode(id: string) {
  }

  NodeChangeObservable(): Observable<EditorNodes> {
    return this.nodeChangeListeners.asObservable();
  }

  stringifyInteractables(): any {
    return this.interactables;
  }

  loadInteractables(data: any) {
    const loadedInteractables = {};
    const keys = Object.keys(data);
    keys.forEach(key => {
      const interactable = new Interactable(data[key]);
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
}
