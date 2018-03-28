import { Variable } from './variable';
export class ScopeVariables {
    vars: Variable[] = [];
    keys: string[] = [];
    stringVars: Variable[] = [];
    stringKeys: string[] = [];
    numVars: Variable[] = [];
    numKeys: string[] = [];
    boolVars: Variable[] = [];
    boolKeys: string[] = [];

    constructor(data?: any) {
        if (data !== undefined) {
            this.vars = data['vars'];
            this.keys = data['keys'];
            this.numKeys = data['numKeys'];
            this.stringKeys = data['stringKeys'];
            this.boolKeys = data['boolKeys'];
            for (let i = 0; i < this.numKeys.length; i++) {
                const index = this.keys.indexOf(this.numKeys[i]);
                this.numVars[i] = this.vars[index];
            }
            for (let i = 0; i < this.stringKeys.length; i++) {
                const index = this.keys.indexOf(this.stringKeys[i]);
                this.stringVars[i] = this.vars[index];
            }
            for (let i = 0; i < this.boolKeys.length; i++) {
                const index = this.keys.indexOf(this.boolKeys[i]);
                this.boolVars[i] = this.vars[index];
            }
        }
    }

    addVariable(variable: Variable) {
        const type = typeof variable.value;
        if (type === 'string') {
            this.stringVars.unshift(variable);
            this.stringKeys.unshift(variable.id.toString());
        }
        if (type === 'number') {
            this.numVars.unshift(variable);
            this.numKeys.unshift(variable.id.toString());
        }
        if (type === 'boolean') {
            this.boolVars.unshift(variable);
            this.boolKeys.unshift(variable.id.toString());
        }
        this.vars.unshift(variable);
        this.keys.unshift(variable.id.toString());
    }

    deleteVariable(id: string) {
        let index = this.keys.indexOf(id);
        if (index <= -1) {
            return;
        }
        const type = typeof this.vars[index].value;
        this.vars.splice(index, 1);
        this.keys.splice(index, 1);

        if (type === 'string') {
            index = this.stringKeys.indexOf(id);
            this.stringVars.splice(index, 1);
            this.stringKeys.splice(index, 1);
        }

        if (type === 'number') {
            index = this.numKeys.indexOf(id);
            this.numVars.splice(index, 1);
            this.numKeys.splice(index, 1);
        }

        if (type === 'boolean') {
            index = this.boolKeys.indexOf(id);
            this.boolVars.splice(index, 1);
            this.boolKeys.splice(index, 1);
        }
    }
}
