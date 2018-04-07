import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Choice } from '../../models/choice';

declare var $: any;

@Component({
  selector: 'app-choice-collection',
  templateUrl: './choice-collection.component.html',
  styleUrls: ['./choice-collection.component.css']
})
export class ChoiceCollectionComponent implements OnInit {

  @Output() deleteLastChoice: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() choices: Choice[];
  @ViewChild('collapse') collapse: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  addChoice(e: Event) {
    const newChoice: Choice = {
      redirects: [{
        nodeID: 'none',
        conditions: []
      }],
      text: 'default',
      conditions: [],
      setConditions: []
    } as Choice;
    this.choices.unshift(newChoice);
    $(this.collapse.nativeElement).collapse('show');
    e.stopPropagation();
  }

  deleteChoice(choice: Choice) {
    if (this.choices.length === 1) {
      this.deleteLastChoice.emit();
    }
    const index = this.choices.indexOf(choice);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

}
