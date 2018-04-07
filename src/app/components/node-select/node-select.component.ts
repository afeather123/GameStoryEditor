import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { Interactable } from '../../models/interactable';
import { Subscription } from 'rxjs/Subscription';
import { NodeID } from '../../models/nodeID';

declare var $: any;

@Component({
  selector: 'app-node-select',
  templateUrl: './node-select.component.html',
  styleUrls: ['./node-select.component.css']
})
export class NodeSelectComponent implements OnInit, OnDestroy, OnChanges {

  currentInteractable: Interactable = new Interactable();
  interactableSubscription: Subscription;
  nameChangeSubscription: Subscription;
  addNodeSubscription: Subscription;
  deleteNodeSubscription: Subscription;
  @ViewChild('select') select: ElementRef;
  @Input() value: NodeID;
  @Input() styles: any = {};
  @Output() selectNode: EventEmitter<string> = new EventEmitter<string>();

  constructor(private interactableService: InteractableService,
  private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentInteractable = this.interactableService.currentInteractable;
    $(this.select.nativeElement).select2();
    this.interactableSubscription = this.interactableService.InteractableObservable().subscribe((interactable: Interactable) => {
      this.currentInteractable = interactable;
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {$(this.select.nativeElement).select2(); }, 2 );
    });
    this.addNodeSubscription = this.interactableService.AddNodeObservable().subscribe(() => {
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {$(this.select.nativeElement).select2(); }, 2 );
    });
    this.nameChangeSubscription = this.interactableService.NameChangeObservable().subscribe(() => {
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {$(this.select.nativeElement).select2(); }, 2 );
    });
    this.deleteNodeSubscription =  this.interactableService.DeleteNodeObservable().subscribe((id: string) => {
      if (this.value.nodeID === id) {
        this.value.nodeID = 'none';
      }
    });
    $(this.select.nativeElement).bind('change', (e) => {this.OnChange(e); });
  }

  ngOnChanges(changes) {
    setTimeout(() => {$(this.select.nativeElement).select2(); }, 2 );
  }

  ngOnDestroy() {
    this.interactableSubscription.unsubscribe();
    this.nameChangeSubscription.unsubscribe();
    this.addNodeSubscription.unsubscribe();
    this.deleteNodeSubscription.unsubscribe();
  }

  OnChange(e: any) {
    this.value.nodeID = e.target.value;
    this.selectNode.emit(e.target.value);
  }

}
