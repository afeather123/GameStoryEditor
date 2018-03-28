import { ID } from './id';
import { Variable } from './variable';

export class ArrayList<T extends ID> {
    array: T[] = [];
    keys: string[] = [];
    idCount = 0;

    constructor(data?: any) {
        if (data !== undefined) {
            this.array = data['array'];
            this.keys = data['keys'];
            this.idCount = data['idCount'];
        }
    }

    Add(element: T) {
        element.id = this.idCount.toString();
        this.array.unshift(element);
        this.keys.unshift(element.id);
        this.idCount++;
    }

    Remove(element: (string | T)): T {
        if (typeof element === 'string') {
            const index = this.keys.indexOf(element);
            if (index >= 0) {
                const variable = this.array[index];
                this.array.splice(index, 1);
                this.keys.splice(index, 1);
                return variable;
            }
        } else {
            const index = this.array.indexOf(element);
            if (index >= 0) {
                const variable = this.array[index];
                this.array.splice(index, 1);
                this.keys.splice(index, 1);
                return variable;
            }
        }
        return null;
    }

    GetAtId(id: string): T {
        const index = this.keys.indexOf(id);
        if (index >= 0) {
            return this.array[index];
        } else {
            return null;
        }
    }

}
