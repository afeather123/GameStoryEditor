import { Component, OnInit } from '@angular/core';
import { InteractableService } from '../../services/interactable.service';
import { VariableSelectService } from '../../services/variable-select.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-game-format',
  templateUrl: './game-format.component.html',
  styleUrls: ['./game-format.component.css']
})
export class GameFormatComponent implements OnInit {

  constructor(private interactableService: InteractableService,
  private variableSelectService: VariableSelectService,
  private downloadService: DownloadService) { }
  sentRequest = false;

  ngOnInit() {
    this.interactableService.JSTreeLoadObservable().subscribe((data: any) => {
      if (this.sentRequest) {
        this.convertToGameFormat(data);
      }
    });
  }

  getJSTreeData() {
    this.sentRequest = true;
    this.interactableService.requestFileTree();
  }

  convertConditions(conditions: any, gameVarData: any): any {
    const formattedConditions = [];
    conditions.forEach(condition => {
      const formattedCondition = {
        varID: gameVarData.varIDs[condition.varID],
        Operator: condition.operator,
        value: condition.value
      };
      if (formattedCondition.varID !== undefined) {
        formattedConditions.push(formattedCondition);
      } else {
        console.log('Error!');
      }
    });
    return formattedConditions;
  }

  convertRedirects(redirects: any, gameVarData: any, interactable: any) {
    const formattedRedirects = [];
    redirects.forEach(redirect => {
      const formattedRedirect: any = {
        nodeID: interactable.nodeIDs[redirect.nodeID],
        conditions: []
      };
      formattedRedirect.conditions = this.convertConditions(redirect.conditions, gameVarData);
      if (formattedRedirect.nodeID !== undefined) {
        formattedRedirects.push(formattedRedirect);
      } else {
        console.log('Error!');
      }
    });
    return formattedRedirects;
  }

  convertToGameFormat(jsTreeData: any) {
    const variableData = this.variableSelectService.stringifyVariables();
    const interactableData = this.interactableService.stringifyInteractables();
    const gameVarData = {
      vars: [],
      varNames: {},
      varIDs: {}
    };
    const gameInteractableData = {};
    const vars = variableData['allVariables'].array;
    for (let i = 0; i < vars.length; i++) {
      gameVarData.vars.push(vars[i].value);
      gameVarData.varNames[vars[i].name] = i;
      gameVarData.varIDs[vars[i].id] = i;
    }
    const ikeys = Object.keys(interactableData);
    ikeys.forEach(ikey => {
      const interactable = {
        entryPoints: [],
        nodes: [],
        nodeIDs: {}
      };
      const thisInteractable = interactableData[ikey];
      for (let i = 0; i < thisInteractable.nodes.array.length; i++) {
        interactable.nodes.push({});
        interactable.nodeIDs[thisInteractable.nodes.array[i].id] = i;
      }

      thisInteractable.entryPoints.forEach(entrypoint => {
        const formattedep: any = {
          nodeID: interactable.nodeIDs[entrypoint.redirect.nodeID],
          conditions: []
        };

        formattedep.conditions = this.convertConditions(entrypoint.redirect.conditions, gameVarData);

        if (formattedep.nodeID !== undefined) {
          interactable.entryPoints.push(formattedep);
        } else {
          console.log('Error!');
        }
      });

      thisInteractable.nodes.array.forEach(node => {
        const formattedNode = {
          text: node.text,
          setconditions: [],
          redirects: [],
          choices: [],
          data: []
        };

        if (node.setconditions !== undefined && node.setconditions.length > 0) {
          formattedNode.setconditions = this.convertConditions(node.setconditions, gameVarData);
        }

        if (node.redirects !== undefined && node.redirects.length > 0) {
          formattedNode.redirects = this.convertRedirects(node.redirects, gameVarData, interactable);
        }

        if (node.choices !== undefined && node.choices.length > 0) {
          node.choices.forEach(choice => {
            const formattedChoice = {
              text: choice.text,
              redirects: [],
              setconditions: [],
              conditions: []
            };

            if (choice.conditions !== undefined) {
              formattedChoice.conditions = this.convertConditions(choice.conditions, gameVarData);
            }

            if (choice.setConditions !== undefined) {
              formattedChoice.setconditions = this.convertConditions(choice.setConditions, gameVarData);
            }

            if (choice.redirects !== undefined) {
              formattedChoice.redirects = this.convertRedirects(choice.redirects, gameVarData, interactable);
            }
            formattedNode.choices.push(formattedChoice);
          });
        }

        if (node.data !== undefined) {
          formattedNode.data = node.data;
        }

        interactable.nodes[interactable.nodeIDs[node.id]] = formattedNode;
      });

      interactable.nodeIDs = undefined;

      jsTreeData.forEach(element => {
        if (element.id === ikey) {
          gameInteractableData[element.text] = interactable;
        }
      });
    });
    gameVarData.varIDs = undefined;
    const gameFile = {
      variables: gameVarData,
      interactables: gameInteractableData
    };
    this.sentRequest = false;
    this.downloadService.download('project-gf.json', JSON.stringify(gameFile));
  }

}
