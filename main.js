"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var fs_1 = require("fs");
var iterateFolders_1 = require("./iterateFolders");
var prompt = require("electron-prompt");
var path_1 = require("path");
var path = require("path");
var url = require("url");
var http = require("http");
var mainWindow;
var contents;
var openPath;
var savePath;
var generatePath;
var assetPort;
var saveFolder = true;
function createWindow() {
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
    mainWindow = new electron_1.BrowserWindow({ width: 1400, height: 1000 });
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
electron_1.app.on('ready', function () {
    createAssetServer();
    createWindow();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        console.log('PLEASE');
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
                }
            },
            {
                label: 'Convert Assets to Data Settings',
                accelerator: undefined,
                click: function () {
                    prompt({
                        title: 'Valid file extensions',
                        label: 'Valid file extensions:',
                        value: 'png,jpeg,wav,ogg',
                        type: 'input'
                    })
                        .then(function (r) {
                        var loadPath = electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] });
                        if (loadPath === undefined) {
                            return;
                        }
                        var dataSettings;
                        if (r.length > 0) {
                            var validExtensions = r.split(',').map(function (ext) { return ext.trim(); });
                            dataSettings = iterateFolders_1.getSubdirectoryFiles(loadPath[0], validExtensions);
                        }
                        else {
                            dataSettings = iterateFolders_1.getSubdirectoryFiles(loadPath[0]);
                        }
                        console.log(dataSettings);
                        contents.send('asset-settings', dataSettings);
                    })["catch"](console.error);
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
                    saveFolder = true;
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
            },
            {
                label: 'Save as Single Game File',
                accelerator: 'F10',
                click: function () {
                    saveFolder = false;
                    var fileFilter = {
                        name: '.json',
                        extensions: ['json']
                    };
                    var options = {
                        filters: [fileFilter],
                        defaultPath: undefined
                    };
                    if (openPath !== undefined) {
                        var filePath = openPath.substr(0, openPath.length - 5) + '-data.json';
                        options.defaultPath = filePath;
                    }
                    electron_1.dialog.showSaveDialog(mainWindow, options, function (filename) {
                        if (filename === undefined) {
                            return;
                        }
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
    saveFile(args);
});
electron_1.ipcMain.on('complete-data', function (event, args) {
    if (saveFolder) {
        console.log("Generating folder...");
        generateProjectFolder(args);
    }
    else {
        saveFile(args);
    }
});
electron_1.ipcMain.on('get-asset', function (event, args) {
    fs_1.readFile(args, 'utf8', function (err, data) {
        contents.send('load-asset', data);
    });
});
electron_1.ipcMain.on('get-asset-port', function () {
    contents.send('asset-port', assetPort);
});
function saveFile(file) {
    fs_1.writeFile(savePath, file, function (err) {
        if (err) {
            throw err;
        }
        console.log('saved successfully');
    });
}
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
function createAssetServer() {
    assetPort = http.createServer(function (req, res) {
        // TODO: Add special rendering for certain stuff
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(req.url);
    }).listen(0).address().port;
    console.log('success!');
}
