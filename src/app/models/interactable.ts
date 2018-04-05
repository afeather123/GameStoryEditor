import { DialogueNode } from './node';
import { Redirect } from './redirect';
import { NodeObject } from './nodeobject';
import { ArrayList } from './arraylist';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { EntryPoint } from './entrypoint';
import { GlobalDataSettings } from './globalDataSettings';
import { NodeData } from './nodeData';

export class Interactable {
    nodes: ArrayList<DialogueNode> = new ArrayList<DialogueNode>();
    entryPoints: EntryPoint[] = [];
    dataSettings: GlobalDataSettings;

    constructor(data?: any) {
        const newNodes: DialogueNode[] = [];
        if (data !== undefined) {
            data['nodes']['array'].forEach(node => {
                const loadedNode = new DialogueNode(node);
                newNodes.push(loadedNode);
            });
            data['nodes']['array'] = newNodes;
            this.nodes = new ArrayList(data['nodes']);
            this.entryPoints = data['entryPoints'];
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
        if (this.dataSettings.presets.length > 0) {
            const data: NodeData[] = [];
            this.dataSettings.presets.forEach(preset => {
                const datum: NodeData = {
                    name: preset,
                    value: ''
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
