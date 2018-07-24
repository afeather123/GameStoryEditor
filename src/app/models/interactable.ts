import { DialogueNode } from './node';
import { Redirect } from './redirect';
import { NodeObject } from './nodeobject';
import { ArrayList } from './arraylist';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { EntryPoint } from './entrypoint';
import { GlobalDataSettings } from './globalDataSettings';
import { NodeData } from './nodeData';
import { Condition } from './condition';
import { VariableSelectService } from '../services/variable-select.service';

export class Interactable {
    nodes: ArrayList<DialogueNode> = new ArrayList<DialogueNode>();
    entryPoints: EntryPoint[] = [];
    dataSettings: GlobalDataSettings = new GlobalDataSettings();

    constructor(data?: any, variableSelectService?: VariableSelectService) {
        const newNodes: DialogueNode[] = [];
        if (data !== undefined) {
            data['nodes']['array'].forEach(node => {
                const loadedNode = new DialogueNode(node, variableSelectService);
                newNodes.push(loadedNode);
            });
            data['nodes']['array'] = newNodes;
            this.nodes = new ArrayList(data['nodes']);
            const loadedEntryPoints: EntryPoint[] = [];
            data['entryPoints'].forEach(entryPoint => {
                const loadedRedirect: Redirect = {
                    nodeID: entryPoint.redirect.nodeID,
                    conditions: []
                } as Redirect;
                entryPoint.redirect.conditions.forEach(condition => {
                    const loadedCondition = new Condition();
                    loadedCondition.varID = condition.varID;
                    loadedCondition.operator = condition.operator;
                    loadedCondition.value = condition.value;
                    loadedRedirect.conditions.push(loadedCondition);
                });
                const loadedPoint: EntryPoint = {
                    name: entryPoint.name,
                    id: entryPoint.id,
                    redirect: loadedRedirect
                } as EntryPoint;
                loadedEntryPoints.push(loadedPoint);
            });
            this.entryPoints = loadedEntryPoints;
        }
    }

    AddNode (): DialogueNode {
        const newNodeData: any = {
            name: '',
            text: 'node' + this.nodes.idCount.toString(),
            id: 'sasdf',
            setconditions: [],
            redirects: [{
                nodeID: 'none',
                conditions: []
            }],
            choices: []
        };
        if (this.dataSettings !== undefined && this.dataSettings.presets !== undefined && this.dataSettings.presets.length > 0) {
            const data: NodeData[] = [];
            this.dataSettings.presets.forEach(preset => {
                const datum: NodeData = {
                    name: preset,
                    values: {value: ''}
                };
                data.push(datum);
            });
            newNodeData.data = data;
        }
        const newNode = new DialogueNode(newNodeData);
        this.nodes.Add(newNode);
        return newNode;
    }

    AddEntryPoint () {
        const newNode = this.AddNode();
        const newEntryPoint = {
            name: 'entryPoint' + newNode.id,
            id: newNode.id.toString(),
            redirect: {
                nodeID: newNode.id,
                conditions: []
            }
        };
        this.entryPoints.push(newEntryPoint);
    }

    DeleteEntryPoint (entryPoint: EntryPoint) {
        const index = this.entryPoints.indexOf(entryPoint);
        if (index >= 0) {
            this.entryPoints.splice(index, 1);
        }
    }

}
