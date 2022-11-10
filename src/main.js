import config from "config";
import path from "path";
import fs, { constants } from "fs";
import { generateFile } from "./createFile.js";
import { splitByFiles } from "./splitbychunks.js";
import { mergeFiles } from "./sorted.js";

const dir = config.get("dir");
const fileSize = config.get("fileSize");
const numberChunks = config.get("numberChunks"); 

const dirPath = path.join( path.join(), dir);

try {
    fs.accessSync(dirPath, constants.R_OK | constants.W_OK) 
} catch (err) {
    if (err && err.code === 'ENOENT') {
        fs.mkdirSync(dirPath);
    }
}

// generateFile(dirPath, fileSize)
//  .then( fpath => { 
//     console.log(`Create file with random numbers in ${fpath}`);
//     return splitByFiles(fpath, dirPath, numberChunks) } )
//  .then( arrFiles => { 
//     console.log(`Split file by ${numberChunks} chunks`);
//     return mergeFiles(arrFiles, dirPath) })
//  .then( res => console.log(res) )
// .catch((err) => {
//     console.error(err);
// });

// const fpath = path.join(dir, 'randomNumbers');

// console.log(fpath, dirPath);

// splitByFiles(fpath, dir, numberChunks)
// .then( arrFiles => { 
//    console.log(`Split file by ${numberChunks} chunks`);
//    return mergeFiles(arrFiles, dirPath) })
// .then( res => console.log(res) )
// .catch((err) => {
//    console.error(err);
// });