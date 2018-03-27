import { DialogueNode } from './node';
import { Redirect } from './redirect';
import { NodeObject } from './nodeobject';
import { ArrayList } from './arraylist';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { EntryPoint } from './entrypoint';

export class Interactable {
    nodes: ArrayList<DialogueNode> = new ArrayList<DialogueNode>();
    entryPoints: EntryPoint[] = [];

    AddNode (): DialogueNode {
        const newNode: DialogueNode = {
            name: 'node' + this.nodes.idCount.toString(),
            text: 'default',
            id: 'sasdf'
        };
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

}
