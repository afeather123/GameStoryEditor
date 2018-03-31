import { DialogueNode } from './node';
import { Condition } from './condition';
import { NodeID } from './nodeID';
import { Redirect } from './redirect';
export interface Choice extends NodeID {
    text: string;
    redirects: Redirect[];
    setConditions?: Condition[];
    conditions?: Condition[];
}
