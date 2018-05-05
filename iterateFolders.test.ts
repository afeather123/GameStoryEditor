import {getAllSubdirectories, getSubdirectoryFiles, checkExtensions} from './iterateFolders';

// console.log(getAllSubdirectories('C:\\Users\\afeather\\Documents\\AAA'));

// console.log(getSubdirectoryFiles('C:\\Users\\afeather\\Documents\\AAA'));

console.log(checkExtensions(['bob.txt', 'sally.png', 'clap.wav'], ['png', 'wav']));
