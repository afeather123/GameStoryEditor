import { DataOption } from './DataOption';
export class DataSetting {
    name: string;
    type: string;
    options?: DataOption[];
    path?: string;

    constructor(data: any) {
        this.name = data.name;
        this.type = data.type;
        this.options = data.options;
        this.path = data.path;
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
