import { DataOption } from './DataOption';

export interface DataField {
    name: string;
    type: string;
    options?: DataOption[];
}
