import fs from "fs";
import path from "path";
import config from "config";
import process from "process";
import EventEmitter from "events";
import { Liner } from "./liner.js";
import { Buffer } from "buffer";

export function splitByFiles(dataFile, rootDir, numberOfFiles) {

  return new Promise ( (resolve, _) => {

    const writeChunk = new EventEmitter();
    const chunksPath = [];

    const stats = fs.statSync(dataFile);
    const fileSizeInBytes = stats.size;
    let chunkSize = Math.round(fileSizeInBytes / numberOfFiles);
  
    const liner = new Liner({ objectMode: true, highWaterMark: 1 });
    const readStream = fs.createReadStream(path.join(path.join(),dataFile));
  
    readStream.pipe(liner);
    
    let buffArr = [];
    let currentSize = 0;
    let streamID = 0;
    let writed = 0;
  
    liner.on("data", line => {
      
        buffArr.push(Number(line));
    
        currentSize = currentSize + Buffer.byteLength(line + "\n", 'utf8');
    
        if (currentSize >= chunkSize) {
    
          liner.pause();
          
          const chunkPath = `${rootDir}\\chunk${streamID + 1}`;

          writeChunk.emit("letsWrite", chunkPath);

        }  
      }
    );

    liner.on("end", () => {

      readStream.close();

      resolve(chunksPath);
    })  

    writeChunk.on("letsWrite", (chunkPath) => {
          
      buffArr.sort( (a, b) => {
        return a - b;
      });

      const ws = fs.createWriteStream(chunkPath);

      buffArr.forEach((el) => {
        
        ws.write(el.toString() + '\n');

      });

      ws.close();

      writed = writed + currentSize;
      streamID++;
      currentSize = 0;
      buffArr.length = 0;

      if (streamID === numberOfFiles - 1) {
        chunkSize = fileSizeInBytes - writed;
      }

      chunksPath.push(chunkPath);

      liner.resume();

    });

  })

};

// console.log('start - ', process.memoryUsage());

// const mainDir = config.get("dir");
// const FILEPATH = path.join(mainDir, "randomNumbers");
// const chunks = config.get("numberChunks");

// splitByFiles(FILEPATH, mainDir, chunks).then( paths => console.log( paths ));
