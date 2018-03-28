import { Component, OnInit, Input } from '@angular/core';
import { Redirect } from '../../models/redirect';
import { NodeID } from '../../models/nodeID';

@Component({
  selector: 'app-redirect-container',
  templateUrl: './redirect-container.component.html',
  styleUrls: ['./redirect-container.component.css']
})
export class RedirectContainerComponent implements OnInit {

  static idCount = 0;
  id;
  @Input() redirects: Redirect[] = [];

  constructor() { }

  ngOnInit() {
    this.id = RedirectContainerComponent.idCount++;
  }

  AddRedirect() {
    const newRedirect: Redirect = {
      nodeID: 'none',
      conditions: []
    };
    this.redirects.push(newRedirect);
  }

}
