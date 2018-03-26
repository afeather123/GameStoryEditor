import { DialogueNode } from './node';
import { Condition } from './condition';
export interface Choice {
    node: DialogueNode;
    setConditions: Condition[];
    conditions: Condition[];
}
