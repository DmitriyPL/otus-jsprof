import { generateFile } from "./createFile.js"
import { splitByFiles } from "./splitbychunks_v2.js"

const mainDir = "C:\\OTUS\\";
const fileSize = 104857600;

generateFile(mainDir, fileSize)
.then( fpath => { return splitByFiles(fpath, mainDir, 2) } )
.then( res => console.log(res));