import path from "path";
import fs from "fs";
import { Liner } from "./liner.js";
import EventEmitter from "events";

export function mergeToFiles(arrFiles, resFile) {
  
  const arrStreams = [];
  const compareQueues = [];

  arrFiles.forEach((filePath) => {
    arrStreams.push([
      fs.createReadStream(filePath),
      new Liner({ objectMode: true }),
    ]);
    compareQueues.push([]);
  });

  let worked = 0;
  let waited = 0;

  const restart = new EventEmitter();

  restart.on("resumeStreams", () => {
    arrStreams.forEach((streamCombo) => {
      streamCombo[1].resume();
    });
  });

  const writer = fs.createWriteStream(resFile);

  arrStreams.forEach((streamCombo) => {
    
    worked++;

    const currRS = streamCombo[0];
    const currLiner = streamCombo[1];

    currRS.pipe(currLiner);

    currLiner.on("readable", function () {
      
      let line;

      while ((line = currLiner.read()) !== null) {
        
        compareQueues[waited].push(Number(line));
        currLiner.pause();

        waited++;

        if (waited === worked) {

          let compareQueue1stFile = compareQueues[0];     
          let compareQueue2ndFile = compareQueues[1];

          let posQ1 = 0;
          let posQ2 = 0;

          do {

            const elFrom1stFile = compareQueue1stFile[posQ1];
            const elFrom2ndFile = compareQueue2ndFile[posQ2];

            if (elFrom1stFile <= elFrom2ndFile){
              writer.write(elFrom1stFile.toString() + "\n");
              posQ1++;
            } else {
              writer.write(elFrom2ndFile.toString() + "\n");
              posQ2++;
            }  


          } while (posQ1 < compareQueue1stFile.length && posQ2 < compareQueue2ndFile.length)

          compareQueues[0] = compareQueue1stFile.slice(posQ1);
          compareQueues[1] = compareQueue2ndFile.slice(posQ2);

          waited = 0;
          restart.emit("resumeStreams");

        }
      }
    });

    currLiner.on("end", () => {
      
      --worked;

      if (worked === 0) {      

        compareQueues.forEach(queue => {
          queue.forEach(el => {
            writer.write(el.toString() + "\n");         
          });             
        });

      }

    });

  });
}

// function  main() {
//   const mainDir = "C:\\OTUS\\";
//   const resFile = path.join(mainDir, "sortedFile");
//   const buffSorted1 = path.join(mainDir, "buffSortedFile1");
//   const buffSorted2 = path.join(mainDir, "buffSortedFile2");

//   // const arrFiles1 = [
//   //   path.join(mainDir, "chunk1"),
//   //   path.join(mainDir, "chunk2"),
//   // ];

//   // mergeToFiles(arrFiles1, buffSorted1);

//   // const arrFiles2 = [
//   //   path.join(mainDir, "chunk3"),
//   //   path.join(mainDir, "chunk4"),
//   // ];

//   // mergeToFiles(arrFiles2, buffSorted2);
  
//   const arrFiles3 = [
//     buffSorted1,
//     buffSorted2,
//   ];

//   mergeToFiles(arrFiles3, resFile);

// }

// main();
