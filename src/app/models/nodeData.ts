export interface NodeData {
    name: string;
    values: {
        [key: string]: (string | number | boolean)
    };
}
