"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var fs_1 = require("fs");
var path_1 = require("path");
var path = require('path');
var url = require('url');
var mainWindow;
var contents;
var openPath;
var savePath;
var generatePath;
function createWindow() {
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
    mainWindow = new electron_1.BrowserWindow({ width: 1400, height: 1000 });
    contents = mainWindow.webContents;
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
var template = [{
        label: 'File',
        submenu: [{
                label: 'Load Project',
                accelerator: undefined,
                click: function () {
                    var loadPath = electron_1.dialog.showOpenDialog({ properties: ['openFile'] });
                    if (loadPath === undefined) {
                        return;
                    }
                    fs_1.readFile(loadPath[0], 'utf8', function (err, data) {
                        if (err) {
                            throw err;
                        }
                        openPath = loadPath[0];
                        updateMenuPostUpload();
                        contents.send('upload-project', data);
                    });
                    // contents.send('upload-project', loadPath[0]);
                }
            },
            {
                label: 'Save Project As...',
                accelerator: 'CmdOrCtrl+S',
                click: function () {
                    var fileFilter = {
                        name: '.json',
                        extensions: ['json']
                    };
                    var options = {
                        filters: [fileFilter],
                        defaultPath: undefined
                    };
                    if (openPath !== undefined) {
                        options.defaultPath = openPath;
                    }
                    electron_1.dialog.showSaveDialog(mainWindow, options, function (filename) {
                        if (filename === undefined) {
                            return;
                        }
                        savePath = filename;
                        contents.send('download-project');
                    });
                }
            },
            {
                label: 'Generate Project Folder',
                accelerator: 'F11',
                click: function () {
                    var fileFilter = {
                        name: 'Folder Name',
                        extensions: ['']
                    };
                    var options = {
                        filters: [fileFilter],
                        defaultPath: undefined
                    };
                    if (openPath !== undefined) {
                        var folderPath = openPath.substr(0, openPath.length - 5);
                        options.defaultPath = folderPath;
                    }
                    electron_1.dialog.showSaveDialog(mainWindow, options, function (filename) {
                        if (filename === undefined) {
                            return;
                        }
                        generatePath = filename;
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
    var saveMenuItem = {
        label: 'Save Project',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
            savePath = openPath;
            contents.send('download-project');
        }
    };
    template[0].submenu[1].accelerator = 'F12';
    template[0].submenu.splice(1, 0, saveMenuItem);
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
// Inter-process com stuff
electron_1.ipcMain.on('ping', function () { console.log('pong'); });
electron_1.ipcMain.on('complete-save', function (event, args) {
    fs_1.writeFile(savePath, args, function (err) {
        if (err) {
            throw err;
        }
        console.log('saved successfully!');
    });
});
electron_1.ipcMain.on('complete-data', function (event, args) {
    generateProjectFolder(args);
});
function generateProjectFolder(data) {
    if (!fs_1.existsSync(generatePath)) {
        fs_1.mkdirSync(generatePath, '0777');
        var projectData_1 = JSON.parse(data);
        var variablePath = path_1.join(generatePath, 'variables.json');
        fs_1.writeFile(variablePath, JSON.stringify(projectData_1['gameData']['variables']), function (err) {
            if (err) {
                throw err;
            }
        });
        var keys = Object.keys(projectData_1['gameData']['interactables']);
        keys.forEach(function (key) {
            var interactablePath = path_1.join(generatePath, (key + '.json'));
            fs_1.writeFile(interactablePath, JSON.stringify(projectData_1['gameData']['interactables'][key]), function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    }
}
