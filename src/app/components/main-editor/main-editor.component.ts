import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Variable } from '../../models/variable';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import { Condition } from '../../models/condition';
import { Redirect } from '../../models/redirect';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.css']
})
export class MainEditorComponent implements OnInit {

  subscriptionSender$: Observable<Variable[]>;
  index: number;
  redirect: Redirect = {
    nodeID: '0',
    conditions: []
  };
  @ViewChild('variableSelect') variableSelect: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.index = 2;
  }

  onSelectChange() {
    this.changeDetectorRef.detectChanges();
  }
}
