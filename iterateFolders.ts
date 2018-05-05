import { lstatSync, readdirSync, readdir } from 'fs';
import { join } from 'path';

const isDirectory = (path, directoryName) => lstatSync(join(path, directoryName)).isDirectory();
const getDirectories = path => readdirSync(path).filter(directory => isDirectory(path, directory));
const isFile = (path, fileName) => lstatSync(join(path, fileName)).isFile();
const getFiles = (path) => readdirSync(path).filter(file => isFile(path, file));
const checkExtensions = (paths: string[], validExtensions: string[]) => {
    const validPaths: string[] = [];
    paths.forEach(path => {
        validExtensions.forEach(validExtension => {
            const splitPath = path.split('.');
            if (splitPath[splitPath.length - 1] === validExtension) {
                validPaths.push(path);
            }
        });
    });
    return validPaths;
};

const testFolder = './tests/';

function getSubdirectoryFiles(directory: string, validExtensions?: string[]): DirectoryData {
    const directoryData: DirectoryData = {
        path: directory,
        subdirectoryData: []
    };
    const subdirectories = getAllSubdirectories(directory);
    for (let i = 0; i < subdirectories.length; i++) {
        let files = getFiles(join(directory, subdirectories[i]));
        if (validExtensions !== null && validExtensions.length > 0) {
            files = checkExtensions(files, validExtensions);
        }
        const subdirectoryData: SubdirectoryData = {
            relativePath: subdirectories[i],
            files: files
        };
        if (subdirectoryData.files.length > 0) {
            directoryData.subdirectoryData.push(subdirectoryData);
        }
    }

    return directoryData;
}

function getAllSubdirectories(source: string, parentPath?: string): string[] {
    if (source === null) {return []; }
    const directories = getDirectories(source);
    // if (typeof directories !== 'object') {return []; }
    const allSubdirectories: string[] = [];
    for (let i = 0; i < directories.length; i++) {
        const subdirectories = getAllSubdirectories(join(source, directories[i]), directories[i]);
         allSubdirectories.push.apply(allSubdirectories, subdirectories);
    }
    directories.push.apply(directories, allSubdirectories);
    if (parentPath !== undefined) {
        return directories.map(directory => join(parentPath, directory));
    }
    return directories;
}

interface SubdirectoryData {
    relativePath: string;
    files: string[];
}

interface DirectoryData {
    path: string;
    subdirectoryData: SubdirectoryData[];
}

export {getDirectories, getFiles, getSubdirectoryFiles, getAllSubdirectories, SubdirectoryData, DirectoryData, checkExtensions};

