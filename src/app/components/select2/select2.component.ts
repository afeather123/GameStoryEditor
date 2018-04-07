import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ID } from '../../models/id';
import { NodeData } from '../../models/nodeData';
import { Variable } from '../../models/variable';

declare var $: any;

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})

export class Select2Component implements OnInit, AfterViewInit, OnChanges {


  @Input() width = 100;
  @Input() options: Array<string> = [];
  @Input() data: any;
  @Input() propertyName = '';
  @Input() multiple = false;
  @Input() overrideInitial: string;
  @ViewChild('select') select: ElementRef;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  styles: any = {
    'margin-right': '5px'
  };

  constructor() { }

  ngOnInit() {
    if (this.width !== undefined) {
      this.styles.width = this.width;
    }
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    if (this.multiple) {
      $(this.select.nativeElement).select2({multiple: true});
    } else {
      $(this.select.nativeElement).select2();
    }
    if (this.overrideInitial !== undefined) {
      $(this.select.nativeElement).select2().val(this.overrideInitial).trigger('change');
    } else {
      $(this.select.nativeElement).select2().val(this.data[this.propertyName]).trigger('change');
    }
    $(this.select.nativeElement).bind('change', (e) => {
        if (this.multiple) {
          this.data[this.propertyName] = $(e.target).val();
          console.log($(e.target).val());
          console.log(this.data);
          this.change.emit($(e.target).val());
        } else {
          this.data[this.propertyName] = e.target.value;
          this.change.emit(e.target.value);
        }
    });
  }

  InitialValue() {
    if (this.overrideInitial !== undefined) {
      return this.overrideInitial;
    } else {
      return this.data[this.propertyName];
    }
  }

  getStyle(): any {
    const styles: any = {};
    if (this.width !== undefined) {
      styles.width = this.width;
    }
    styles['margin-right'] = '5px';
    return styles;
  }
}
