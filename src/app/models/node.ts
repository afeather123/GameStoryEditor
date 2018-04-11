import { Condition } from './condition';
import { Redirect } from './redirect';
import { Choice } from './choice';
import { NodeData } from './nodeData';
import { ID } from './id';
import { VariableSelectService } from '../services/variable-select.service';

export class DialogueNode implements ID {

    static maxNameLength = 20;
    static previewLength = 150;

    name?: string;
    text: string;
    id: string;
    data?: NodeData[];
    setconditions?: Condition[];
    redirects?: Redirect[];
    choices?: Choice[];

    constructor(data: any, variableSelectService?: VariableSelectService) {
        this.name = data.name;
        this.text = data.text;
        this.id = data.id;
        this.data = data.data;
        this.redirects = data.redirects;
        this.choices = data.choices;
        this.setconditions = data.setconditions;
    }

    GetName(): string {
        if (this.name === '') {
            return this.TruncateText();
        } else {
            return this.TruncateName();
        }
    }

    GetPreview() {
        return this.truncateString(this.text, DialogueNode.previewLength);
    }

    TruncateName(): string {
        return this.truncateString(this.name, DialogueNode.maxNameLength);
    }

    TruncateText() {
        return this.truncateString(this.text, DialogueNode.maxNameLength);
    }

    private truncateString(str: string, length: number): string {
        if (str.length > length) {
          const substring = str.substring(0, length - 1) + '...';
          return substring;
        } else {
          return str;
        }
    }

}
