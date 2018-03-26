export interface Condition {
    varID: string;
    operator: string;
    value: (string | boolean | number);
    type?: string;
}
