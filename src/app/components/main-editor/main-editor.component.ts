import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Variable } from '../../models/variable';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import { Condition } from '../../models/condition';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css']
})
export class MainEditorComponent implements OnInit {

  subscriptionSender$: Observable<Variable[]>;
  index: number;
  condition: Condition = {
    varID: '0',
    operator: '=',
    value: true
  };
  @ViewChild('variableSelect') variableSelect: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.index = 2;
  }

  onSelectChange() {
    this.changeDetectorRef.detectChanges();
    console.log(this.condition);
  }
}
