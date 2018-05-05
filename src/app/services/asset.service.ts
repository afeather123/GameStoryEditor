import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class AssetService {

  assetPort: number;

  constructor(_electronService: ElectronService) {
    _electronService.ipcRenderer.on('asset-port', (event, args) => {
      this.assetPort = args;
      console.log(this.assetPort);
    });
    _electronService.ipcRenderer.send('get-asset-port');
    console.log('hi!');
  }

}
