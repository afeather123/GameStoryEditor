import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { InteractableService } from './interactable.service';
import { VariableSelectService } from './variable-select.service';
import { LoadJsonService } from './load-json.service';
import {ElectronService} from 'ngx-electron';
import { findDataTypeOfName } from '../models/model_functions/findDataTypeOfName';

@Injectable()
export class DownloadService {

  filename = '';
  nameChange: Subject<string> = new Subject<string>();
  interactableData: any;
  variableData: any;
  downloadType = '';

  ChangeFileName(name: string) {
    this.filename = name;
    this.nameChange.next(name);
  }

  NameObservable(): Observable<string> {
    return this.nameChange.asObservable();
  }

  constructor(private interactableService: InteractableService, private variableSelectService: VariableSelectService,
    private loadJsonService: LoadJsonService, private _electronService: ElectronService) {
    this.interactableService.JSTreeLoadObservable().subscribe((fileTree: any) => {
      if (this.downloadType === 'withProject') {
        this.ComlpeteDownloadProject(fileTree);
      } else {
        this.ComlpeteDownloadGameData(fileTree);
      }
    });
    this.loadJsonService.ProjectNameObservable().subscribe((name: string) => {
      this.filename = name;
    });
    this._electronService.ipcRenderer.on('download-project', () => {this.electronDownloadRequest(); });
    this._electronService.ipcRenderer.on('download-data', () => { 
      console.log("THIS HAPPENS");
      this.DownloadProject(false); });
  }

  private electronDownloadRequest() {
    this.DownloadProject(true);
  }

  download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    if (this.filename === '') {
      element.setAttribute('download', filename);
    } else {
      element.setAttribute('download', this.filename + '.json');
    }

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  DownloadProject(withProjectData: boolean) {
    if (withProjectData) {
      this.downloadType = 'withProject';
    } else {
      this.downloadType = 'withoutProject';
    }
    this.interactableData = this.interactableService.getInteractables();
    this.variableData = this.variableSelectService.stringifyVariables();
    this.interactableService.requestFileTree();
  }

  private ComlpeteDownloadProject(fileTree: any) {
    console.log(this.interactableData);
    const dataSettings = this.interactableService.dataSettings;
    const projectData = {
      interactables: this.interactableData,
      variables: this.variableData,
      dataSettings: dataSettings,
      jstree: fileTree
    };
    this._electronService.ipcRenderer.send('complete-save', JSON.stringify(projectData));
  }

  private ComlpeteDownloadGameData(fileTree: any) {
    const gameFile = this.convertToGameFormat(fileTree);
    const projectData = {
      gameData: gameFile
    };
    this._electronService.ipcRenderer.send('complete-data', JSON.stringify(projectData));
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
        console.log(gameVarData);
        console.log(condition);
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
    const interactableData = this.interactableService.getInteractables();
    const dataSettings = this.interactableService.dataSettings;
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
        nodeIDs: {},
        assetPaths: []
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
          // formattedNode.data = node.data.values['value'];
          node.data.forEach((datum) => {
            const keys = Object.keys(datum.values);
            let formattedData: any;
            if (keys.length === 1) {
              formattedData = {
                name: datum.name,
                value: datum.values['value']
              };
            } else {
              formattedData = {
                name: datum.name,
                value: datum.values
              };
            }
            formattedNode.data.push(formattedData);
          });
          if (dataSettings.topFolder !== undefined) {
            const settings = dataSettings.settings;
            const sp = dataSettings.topFolder.split('\\');
            const topFolder = sp[sp.length - 1];
            for (let i = 0; i < node.data.length; i++) {
              const data = node.data[i];
              for (let j = 0; j < settings.length; j++) {
                const setting = settings[j];
                if (data.name === setting.name) {
                  const options = setting.options;
                  for (let k = 0; k < options.length; k++) {
                    const option = options[k];
                    if (data.values['value'] === option.option) {
                      const dataType = findDataTypeOfName(this.interactableService.dataSettings.dataTypes, setting.type);
                      if (dataType !== undefined && dataType !== null) {
                        const splitPath = option.fileName.split('.');
                        const path = {
                          path: [topFolder, dataType.path.split('\\').join('/'), option.option].join('/'),
                          extension: splitPath[splitPath.length - 1]
                        };
                        interactable.assetPaths.push(path);
                      }
                    }
                  }
                  const fields = setting.dataFields;
                  if (fields !== undefined) {
                    for (let k = 0; k < fields.length; k++) {
                      const field = fields[k];
                      const fieldOptions = fields[k].options;
                      for (let l = 0; l < fieldOptions.length; l++) {
                        const fieldOption = fieldOptions[l];
                        if (data.values[field.name] === fieldOption.option && fieldOption.fileName !== undefined && fieldOption.fileName !== null) {
                          const splitPath = fieldOption.fileName.split('.');
                          const dataType = findDataTypeOfName(this.interactableService.dataSettings.dataTypes, field.type);
                          const path = {
                            path: [topFolder, dataType.path.split('\\').join('/'), fieldOption.option].join('/'),
                            extension: splitPath[splitPath.length - 1]
                          };
                          interactable.assetPaths.push(path);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          // const filteredAssets = [];
          // for (let i = 0; i < interactable.assetPaths.length; i++) {
          //   let isUnique = true;
          //   for (let j = 0; j < filteredAssets.length; j++) {
          //     if (filteredAssets[j].path === interactable.assetPaths[i].path
          //       && filteredAssets[j].extension === interactable.assetPaths[i].extension) {
          //       isUnique = false;
          //     }
          //   }
          //   if (isUnique) {
          //     filteredAssets.push(interactable.assetPaths[i]);
          //   }
          // }
          // interactable.assetPaths = filteredAssets;
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
    return gameFile;
  }
}
