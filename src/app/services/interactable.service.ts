import { Injectable } from '@angular/core';
import { Interactable } from '../models/interactable';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

interface InteractableObject {
  [key: string]: Interactable;
}

@Injectable()
export class InteractableService {

  interactables: InteractableObject = {};
  currentInteractable: Interactable;

  interactableSubscribers: Subject<Interactable> = new Subject<Interactable>();

  constructor() { }

  addInteractable(id: string) {
    const newInteractable = {
      nodes: {},
      entryPoints: []
    } as Interactable;
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

}
