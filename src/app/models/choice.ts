import { DialogueNode } from './node';
import { Condition } from './condition';
import { NodeID } from './nodeID';
export interface Choice extends NodeID {
    nodeID: string;
    setConditions: Condition[];
    conditions: Condition[];
}
