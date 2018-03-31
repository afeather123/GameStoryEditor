import { Component, OnInit, Input } from '@angular/core';
import { DialogueNode } from '../../models/node';
import { Condition } from '../../models/condition';
import { Choice } from '../../models/choice';
import { Redirect } from '../../models/redirect';
import { InteractableService } from '../../services/interactable.service';
import { ConditionOperators } from '../../models/ConditionOperators';
import { NodeData } from '../../models/nodeData';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  setConditionOperators: ConditionOperators = {
    numberOperators: ['=', '+=', '-=', '*=', '/='],
    stringOperators: ['='],
    boolToggle: true,
    local: false
  };

  @Input() node: DialogueNode;

  constructor(private interactableService: InteractableService) { }

  ngOnInit() {
  }

  AddChoice(e: Event) {
    if (this.node.redirects.length > 0) {
      if (!confirm('A node can only have redirects or choices. Are you sure you want to delete the redirects currently on the node?')) {
        return;
      } else {
        this.node.redirects = [];
      }
    }
    const newChoice: Choice = {
      text: 'default',
      redirects: [{
        nodeID: 'none',
        conditions: []
      }],
      conditions: [],
      setConditions: []
    } as Choice;
    this.node.choices.push(newChoice);
    e.stopPropagation();
  }

  AddRedirect(e: Event) {
    if (this.node.choices.length > 0) {
      if (!confirm('A node can only have redirects or choices. Are you sure you want to delete the choices currently on the node?')) {
        return;
      } else {
        this.node.choices = [];
      }
    }
    if (this.node.redirects === null || this.node.redirects === undefined) {
      this.node.redirects = [];
    }
    const newRedirect: Redirect = {
      nodeID: 'none',
      conditions: []
    };
    this.node.redirects.push(newRedirect);
    e.stopPropagation();
  }

  AddConditionSetter(e: Event) {
    const newCondition: Condition = {
      varID: 'none',
      value: 0,
      operator: '='
    };
    this.node.setconditions.unshift(newCondition);
    e.stopPropagation();
  }

  AddNameLabel() {
    this.node.name = 'default';
    this.renameNode();
  }

  AddData(e: Event) {
    const newData: NodeData = {
      name: 'data',
      value: 'default'
    };
    if (this.node.data === undefined || this.node.data === null) {
      this.node.data = [];
    }
    this.node.data.push(newData);
    e.stopPropagation();
  }

  changeText(e) {
    if (this.getCaretPosition(e.target).start < DialogueNode.maxNameLength) {
      this.renameNode();
    }
  }

  getCaretPosition (ctrl): any {
    // IE < 9 Support
    if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
    } else {
      return {'start': 0, 'end': 0};
    }
  }

  changeName(e) {
    if (this.getCaretPosition(e.target).start < DialogueNode.maxNameLength) {
      this.renameNode();
    }
  }

  renameNode () {
    this.interactableService.changeNodeName(this.node.id);
  }

}
