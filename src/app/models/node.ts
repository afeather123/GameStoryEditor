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
        if (variableSelectService !== undefined) {
            this.setconditions = this.loadConditions(data.setconditions, variableSelectService);
            this.redirects = this.loadRedirects(data.redirects, variableSelectService);
            this.choices = this.loadChocies(data.choices, variableSelectService);
        } else {
            this.setconditions = data.setconditions;
            this.redirects = data.redirects;
            this.choices = data.choices;
        }
    }

    private loadChocies(choices: any, variableSelectService: VariableSelectService) {
        const loadedChoices: Choice[] = [];
        choices.forEach(choice => {
            const loadedChoice: Choice = {
                nodeID: choice.nodeID,
                redirects: [],
                setConditions: [],
                conditions: []
            } as Choice;
            loadedChoice.redirects = this.loadRedirects(choice.redirects, variableSelectService);
            loadedChoice.setConditions = this.loadConditions(choice.setConditions, variableSelectService);
            loadedChoice.conditions = this.loadConditions(choice.conditions, variableSelectService);
            loadedChoices.push(loadedChoice);
        });
        return loadedChoices;
    }

    private loadRedirects(redirects: any, variableSelectService: VariableSelectService) {
        const loadedRedirects: Redirect[] = [];
        redirects.forEach(redirect => {
            const loadedRedirect: Redirect = {
                nodeID: redirect.nodeID,
                conditions: []
            };
            loadedRedirect.conditions = this.loadConditions(redirect.conditions, variableSelectService);
        });
        return loadedRedirects;
    }

    private loadConditions(conditions: any, variableSelectService: VariableSelectService): Condition[] {
        const loadedConditions: Condition[] = [];
        conditions.forEach(condition => {
            const loadedCondition = new Condition();
            loadedCondition.varID = condition.varID;
            loadedCondition.operator = condition.operator;
            loadedCondition.value = condition.value;
            loadedConditions.push(loadedCondition);
        });
        return loadedConditions;
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
