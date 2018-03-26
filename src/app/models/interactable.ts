import { DialogueNode } from './node';
import { Redirect } from './redirect';
import { NodeObject } from './nodeobject';
import { ArrayList } from './arraylist';

export class Interactable {
    nodes: ArrayList<DialogueNode> = new ArrayList<DialogueNode>();
    entryPoints: Redirect[] = [];

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
            nodeID: newNode.id,
            conditions: []
        } as Redirect;
        this.entryPoints.push(newEntryPoint);
    }
}
