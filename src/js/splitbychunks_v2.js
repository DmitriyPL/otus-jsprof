import path from "path";
import fs from "fs";
import { Liner } from "./liner.js";
import { merge_sort } from "./mergesort.js";

export function splitByFiles(dataFile, rootDir, numberOfFiles) {

  return new Promise ( (resolve, reject) => {

    const chunksPath = [];

    const stats = fs.statSync(dataFile);
    const fileSizeInBytes = stats.size;
    let chunkSize = Math.round(fileSizeInBytes / numberOfFiles);
  
    const liner = new Liner({ objectMode: true });
    const readStream = fs.createReadStream(dataFile);
  
    readStream.pipe(liner);
  
    let buffArr = [];
    let currentSize = 0;
    let streamID = 0;
    let writed = 0;
  
    liner.on("readable", function () {
        
      let line;
    
      while ((line = liner.read()) !== null) {
        
        let data = Number(line);
        buffArr.push(data);
    
        currentSize = currentSize + new TextEncoder().encode(line + "\n").length;
    
        if (currentSize >= chunkSize) {
    
          liner.pause();
  
          buffArr = merge_sort(buffArr);
          
          const chukPath = `${rootDir}\\chunk${streamID + 1}`;
          const writeStream = fs.createWriteStream(chukPath);
  
          buffArr.forEach((el) => {
            
            writeStream.write(el.toString() + '\n');
    
          });
    
          writeStream.close();
  
          writed = writed + currentSize;
          streamID++;
          currentSize = 0;
          buffArr.length = 0;
    
          if (streamID === numberOfFiles - 1) {
            chunkSize = fileSizeInBytes - writed;
          }
  
          chunksPath.push(chukPath);

          liner.resume();
        }  
  
      }
  
    });

    liner.on("end", () => {
      resolve(chunksPath);
    })  
  
  })

};

// const mainDir = "C:\\OTUS\\";
// const FILEPATH = path.join(mainDir, "randomNumbers");

// splitByFiles(FILEPATH, mainDir, 4).then( paths => console.log( paths ));
