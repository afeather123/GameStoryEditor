import { ID } from './id';

export interface Variable extends ID {
    name: string;
    value: (string | number | boolean);
    id: string;
}
