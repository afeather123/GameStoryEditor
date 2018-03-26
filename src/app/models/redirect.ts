import { Condition } from './condition';
import { DialogueNode } from './node';
export interface Redirect {
    nodeID: string;
    conditions: Condition[];
}
