import { DataOption } from './DataOption';
import { DataField } from './dataField';
export class DataSetting {
    name: string;
    type: string;
    options?: DataOption[];
    dataFields?: DataField[];
    path?: string;

    constructor(data: any) {
        this.name = data.name;
        this.type = data.type;
        this.options = data.options;
        this.path = data.path;
        this.dataFields = data.dataFields;
    }

    getOptionsArray(): Array<string> {
        const optionsArray: Array<string> = [];
        if (this.options !== undefined) {
            this.options.forEach(element => {
                optionsArray.push(element.option);
            });
        }
        return optionsArray;
    }
}
