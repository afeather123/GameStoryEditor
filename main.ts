import { BrowserWindow, webContents, app, Menu, ipcMain, dialog, FileFilter } from 'electron';
import { readFile, writeFile, mkdirSync, existsSync } from 'fs';
import {getSubdirectoryFiles} from './iterateFolders';
import * as prompt from 'electron-prompt';
import { join } from 'path';
import * as path from 'path';
import * as url from 'url';
import * as http from 'http';

let mainWindow: BrowserWindow;
let contents: webContents;
let openPath: string;
let savePath: string;
let generatePath: string;
let assetPort: number;
let saveFolder = true;

function createWindow () {

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({width: 1400, height: 1000});
  contents = mainWindow.webContents;
  contents.openDevTools();
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createAssetServer();
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    console.log('PLEASE');
    createWindow();
  }
});

const template = [{
  label: 'File',
  submenu: [{
    label: 'Load Project',
    accelerator: undefined,
    click: () => {
        const loadPath =  dialog.showOpenDialog({properties: ['openFile']});
        if (loadPath === undefined) { return; }
        readFile(loadPath[0], 'utf8', (err, data) => {
          if (err) { throw err; }
          openPath = loadPath[0];
          updateMenuPostUpload();
          contents.send('upload-project', data);
        });
    }
  },
  {
    label: 'Convert Assets to Data Settings',
    accelerator: undefined,
    click: () => {
      prompt({
        title: 'Valid file extensions',
        label: 'Valid file extensions:',
        value: 'png,jpeg,wav,ogg',
        type: 'input'
      })
      .then((r) => {
        const loadPath =  dialog.showOpenDialog({properties: ['openDirectory']});
        if (loadPath === undefined) { return; }
        let dataSettings;
        if (r.length > 0) {
          const validExtensions = r.split(',').map(ext => ext.trim());
          dataSettings = getSubdirectoryFiles(loadPath[0], validExtensions);
        } else {
          dataSettings = getSubdirectoryFiles(loadPath[0]);
        }
        console.log(dataSettings);
        contents.send('asset-settings', dataSettings);
      })
      .catch(console.error);
    }
  },
  {
    label: 'Save Project As...',
    accelerator: 'CmdOrCtrl+S',
    click: () => {
      const fileFilter = {
        name: '.json',
        extensions: ['json']
      };
      const options = {
        filters: [fileFilter],
        defaultPath: undefined
      };
      if (openPath !== undefined) {
        options.defaultPath = openPath;
      }
      dialog.showSaveDialog(mainWindow, options,
      (filename) => {
        if (filename === undefined) {return; }
        savePath = filename;
        contents.send('download-project');
      });
    }
  },
  {
    label: 'Generate Project Folder',
    accelerator: 'F11',
    click: () => {
      saveFolder = true;
      const fileFilter = {
        name: 'Folder Name',
        extensions: ['']
      };
      const options = {
        filters: [fileFilter],
        defaultPath: undefined
      };
      if (openPath !== undefined) {
        const folderPath = openPath.substr(0, openPath.length - 5);
        options.defaultPath = folderPath;
      }
      dialog.showSaveDialog(mainWindow, options,
      (filename) => {
        if (filename === undefined) {return; }
        generatePath = filename;
        contents.send('download-data');
      });
    }
  },
  {
    label: 'Save as Single Game File',
    accelerator: 'F10',
    click: () => {
      saveFolder = false;
      const fileFilter = {
        name: '.json',
        extensions: ['json']
      };
      const options = {
        filters: [fileFilter],
        defaultPath: undefined
      };
      if (openPath !== undefined) {
        const filePath = openPath.substr(0, openPath.length - 5) + '-data.json';
        options.defaultPath = filePath;
      }
      dialog.showSaveDialog(mainWindow, options,
      (filename) => {
        if (filename === undefined) {return; }
        savePath = filename;
        contents.send('download-data');
      });
    }
  }
  ]
}
];

function updateMenuPostUpload() {
  if (template[0].submenu[1].label === 'Save Project') {
    return;
  }
  const saveMenuItem =   {
    label: 'Save Project',
    accelerator: 'CmdOrCtrl+S',
    click: () => {
      savePath = openPath;
      contents.send('download-project');
    }
  };
  template[0].submenu[1].accelerator = 'F12';
  template[0].submenu.splice(1, 0, saveMenuItem);
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Inter-process com stuff

ipcMain.on('ping', () => {console.log('pong'); });

ipcMain.on('complete-save', (event, args) => {
  saveFile(args);
});

ipcMain.on('complete-data', (event, args) => {
  if (saveFolder) {
    generateProjectFolder(args);
  } else {
    saveFile(args);
  }
});

ipcMain.on('get-asset', (event, args: string) => {
  readFile(args, 'utf8', (err, data) => {
    contents.send('load-asset', data);
  });
});

ipcMain.on('get-asset-port', () => {
  contents.send('asset-port', assetPort);
});

function saveFile(file) {
  writeFile(savePath, file, (err) => {
    if (err) { throw err; }
    console.log('saved successfully');
  });
}

function generateProjectFolder(data: string) {
  if (!existsSync(generatePath)) {
    mkdirSync(generatePath, '0777');
    const projectData = JSON.parse(data);
    const variablePath = join(generatePath, 'variables.json');
    writeFile(variablePath, JSON.stringify(projectData['gameData']['variables']), (err) => {
      if (err) {throw err; }
    });
    const keys = Object.keys(projectData['gameData']['interactables']);
    keys.forEach(key => {
      const interactablePath = join(generatePath, (key + '.json'));
      writeFile(interactablePath, JSON.stringify(projectData['gameData']['interactables'][key]), (err) => {
        if (err) {throw err; }
      });
    });
  }
}

function createAssetServer() {
    assetPort = http.createServer((req, res) => {
      // TODO: Add special rendering for certain stuff
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(req.url);
    }).listen(0).address().port;
    console.log('success!');
}
