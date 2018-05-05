import { DataSetting } from './DataSetting';
import { PresetName } from './presetName';
export class GlobalDataSettings {
    settings: DataSetting[] = [];
    presets: string[] = [];
    topFolder?: string;

    constructor() {}

    getSettingsNames(withExtra: boolean): Array<string> {
        const names: Array<string> = [];
        this.settings.forEach(setting => {
            names.push(setting.name);
        });
        if (withExtra) {
            names.unshift('Custom');
            names.unshift('None Selected');
        }
        return names;
    }
}
