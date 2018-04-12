import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DialogueNode } from '../../models/node';
import { Condition } from '../../models/condition';
import { Choice } from '../../models/choice';
import { Redirect } from '../../models/redirect';
import { InteractableService } from '../../services/interactable.service';
import { ConditionOperators } from '../../models/ConditionOperators';
import { NodeData } from '../../models/nodeData';
import { VariableSelectService } from '../../services/variable-select.service';

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

  constructor(private interactableService: InteractableService, private _variableSelectService: VariableSelectService) { }

  ngOnInit() {
    console.log('happening?');
  }

  AddChoice() {
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
  }

  AddRedirect() {
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
  }

  AddConditionSetter() {
    const newCondition = new Condition();
    newCondition.operator = '=';
    newCondition.value = 0;
    this.node.setconditions.unshift(newCondition);
  }

  AddNameLabel() {
    this.node.name = 'default';
    this.renameNode();
  }

  AddData() {
    const newData: NodeData = {
      name: 'data',
      value: 'default'
    };
    if (this.node.data === undefined || this.node.data === null) {
      this.node.data = [];
    }
    this.node.data.push(newData);
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

  deleteLastChoice() {
    this.AddRedirect();
  }

}
