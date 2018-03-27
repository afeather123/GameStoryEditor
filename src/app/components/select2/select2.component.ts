import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ID } from '../../models/id';

declare var $: any;

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})

export class Select2Component implements OnInit {

  @Input() options: ID[];
  @ViewChild('select') select: ElementRef;

  constructor() { }

  ngOnInit() {
    $(this.select.nativeElement).select2();
  }

}
