"use strict";
exports.__esModule = true;
var iterateFolders_1 = require("./iterateFolders");
// console.log(getAllSubdirectories('C:\\Users\\afeather\\Documents\\AAA'));
// console.log(getSubdirectoryFiles('C:\\Users\\afeather\\Documents\\AAA'));
console.log(iterateFolders_1.checkExtensions(['bob.txt', 'sally.png', 'clap.wav'], ['png', 'wav']));
