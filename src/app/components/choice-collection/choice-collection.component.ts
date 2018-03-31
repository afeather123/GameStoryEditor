import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../../models/choice';

@Component({
  selector: 'app-choice-collection',
  templateUrl: './choice-collection.component.html',
  styleUrls: ['./choice-collection.component.css']
})
export class ChoiceCollectionComponent implements OnInit {

  @Input() choices: Choice[];
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
    e.stopPropagation();
  }

  deleteChoice(choice: Choice) {
    const index = this.choices.indexOf(choice);
    if (index >= 0) {
      this.choices.splice(index, 1);
    }
  }

}
