"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var isDirectory = function (path, directoryName) { return fs_1.lstatSync(path_1.join(path, directoryName)).isDirectory(); };
var getDirectories = function (path) { return fs_1.readdirSync(path).filter(function (directory) { return isDirectory(path, directory); }); };
exports.getDirectories = getDirectories;
var isFile = function (path, fileName) { return fs_1.lstatSync(path_1.join(path, fileName)).isFile(); };
var getFiles = function (path) { return fs_1.readdirSync(path).filter(function (file) { return isFile(path, file); }); };
exports.getFiles = getFiles;
var checkExtensions = function (paths, validExtensions) {
    var validPaths = [];
    paths.forEach(function (path) {
        validExtensions.forEach(function (validExtension) {
            var splitPath = path.split('.');
            if (splitPath[splitPath.length - 1] === validExtension) {
                validPaths.push(path);
            }
        });
    });
    return validPaths;
};
exports.checkExtensions = checkExtensions;
var testFolder = './tests/';
function getSubdirectoryFiles(directory, validExtensions) {
    var directoryData = {
        path: directory,
        subdirectoryData: []
    };
    var subdirectories = getAllSubdirectories(directory);
    for (var i = 0; i < subdirectories.length; i++) {
        var files = getFiles(path_1.join(directory, subdirectories[i]));
        if (validExtensions !== null && validExtensions.length > 0) {
            files = checkExtensions(files, validExtensions);
        }
        var subdirectoryData = {
            relativePath: subdirectories[i],
            files: files
        };
        if (subdirectoryData.files.length > 0) {
            directoryData.subdirectoryData.push(subdirectoryData);
        }
    }
    return directoryData;
}
exports.getSubdirectoryFiles = getSubdirectoryFiles;
function getAllSubdirectories(source, parentPath) {
    if (source === null) {
        return [];
    }
    var directories = getDirectories(source);
    // if (typeof directories !== 'object') {return []; }
    var allSubdirectories = [];
    for (var i = 0; i < directories.length; i++) {
        var subdirectories = getAllSubdirectories(path_1.join(source, directories[i]), directories[i]);
        allSubdirectories.push.apply(allSubdirectories, subdirectories);
    }
    directories.push.apply(directories, allSubdirectories);
    if (parentPath !== undefined) {
        return directories.map(function (directory) { return path_1.join(parentPath, directory); });
    }
    return directories;
}
exports.getAllSubdirectories = getAllSubdirectories;
