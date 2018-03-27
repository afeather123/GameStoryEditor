import { Component, OnInit, Input } from '@angular/core';
import { EntryPoint } from '../../models/entrypoint';

@Component({
  selector: 'app-entrypoint',
  templateUrl: './entrypoint.component.html',
  styleUrls: ['./entrypoint.component.css']
})
export class EntrypointComponent implements OnInit {


  @Input() entryPoint: EntryPoint = {
    name: 'something',
    id: '0',
    redirect: {
      nodeID: 'none',
      conditions: []
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
