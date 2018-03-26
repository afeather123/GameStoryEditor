import { ID } from './id';

export class ArrayList<T extends ID> {
    array: T[] = [];
    keys: string[] = [];
    idCount = 0;

    constructor(array?: T[]) {
        if (array === undefined) {return; }
        array.forEach(element => {
            const id = parseInt(element.id, 10);
            if (id >= this.idCount) {
                this.idCount = id + 1;
            }
            this.array.push(element);
            this.keys.push(element.id);
        });
    }

    Add(element: T) {
        element.id = this.idCount.toString();
        this.array.unshift(element);
        this.keys.unshift(element.id);
        this.idCount++;
    }

    Remove(element: (string | T)): boolean {
        if (typeof element === 'string') {
            const index = this.keys.indexOf(element);
            if (index >= 0) {
                this.array.splice(index, 1);
                this.keys.splice(index, 1);
                return true;
            }
        } else {
            const index = this.array.indexOf(element);
            if (index >= 0) {
                this.array.splice(index, 1);
                this.keys.splice(index, 1);
                return true;
            }
        }
        return false;
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
