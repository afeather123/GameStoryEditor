import { Condition } from './condition';
import { Redirect } from './redirect';
import { Choice } from './choice';
import { NodeData } from './nodeData';
import { ID } from './id';

export interface DialogueNode extends ID {
    name: string;
    text: string;
    id: string;
    data?: NodeData[];
    setconditions?: Condition[];
    redirects?: Redirect[];
    choices?: Choice[];
}
