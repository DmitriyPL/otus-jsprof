import { generateFile } from "./createFile.js"
import { splitByFiles } from "./splitbychunks.js"
import { mergeToFiles } from "./sorted.js"

const mainDir = "C:\\OTUS\\";
const fileSize = 104857600;

generateFile(mainDir, fileSize)
.then( fpath => { return splitByFiles(fpath, mainDir, 2) } )
.then( arrFiles => { return mergeToFiles(arrFiles, mainDir) })
.then( res => console.log(res) )
.catch((err) => {
    console.error(err);
});