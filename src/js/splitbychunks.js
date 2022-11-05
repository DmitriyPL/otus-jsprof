import path from "path";
import fs from "fs";
import { Liner } from "./liner.js";
import { WriteToFiles } from "./writerToFiles.js";

function splitByFiles(dataFile, rootDir, numberOfFiles) {

  const stats = fs.statSync(dataFile);
  const fileSizeInBytes = stats.size;

  const writer = new WriteToFiles({
    rootDir: rootDir,
    fileSizeInBytes: fileSizeInBytes,
    numberOfFiles: numberOfFiles,
  });
  const liner = new Liner({ objectMode: true });
  const readStream = fs.createReadStream(dataFile);

  console.log('start splited');

  readStream.pipe(liner).pipe(writer);
}

const mainDir = "C:\\OTUS\\";
const FILEPATH = path.join(mainDir, "randomNumbers");

splitByFiles(FILEPATH, mainDir, 4);
