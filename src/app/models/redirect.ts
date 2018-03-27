import { Condition } from './condition';
import { DialogueNode } from './node';
import { NodeID } from './nodeID';
export interface Redirect extends NodeID {
    nodeID: string;
    conditions: Condition[];
}
