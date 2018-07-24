import { DataType } from '../dataType';
export function findDataTypeOfName(dataTypes: DataType[], name: string): DataType {
    let dt: DataType;
    dataTypes.forEach(dataType => {
        if (dataType.name === name) {
            dt = dataType;
        }
    });
    return dt;
}
