import fs from "fs";
import path from "path";
import config from "config";
import { Liner } from "./liner.js";

export function mergeFiles(arrFiles, mainDir) {
  
  return new Promise ( async (resolve, _) => { 
    
    let i = 1;

    do {

      const file1 = arrFiles.shift();
      const file2 = arrFiles.shift(); 

      const merged = await mergePair(mainDir, [file1, file2], i); 
      
      arrFiles.push(merged);

      fs.unlinkSync(file1);
      fs.unlinkSync(file2);

      i++;

    } while (arrFiles.length !== 1);

    const sortedFile = path.join(mainDir, 'sortedFile');

    fs.renameSync(arrFiles[0], sortedFile);

    resolve(sortedFile);
  
  })
}

function mergePair(dir, pair, i) {

  return new Promise ( (resolve, _) => {

    const resFile = path.join( dir ,`chunk_m${i}` );

    const writer = fs.createWriteStream(resFile);
  
    const rsFile1 = fs.createReadStream(pair[0]);
    const rsFile2 = fs.createReadStream(pair[1]);

    const tsFile1 = new Liner({ objectMode: true, highWaterMark: 1 });
    const tsFile2 = new Liner({ objectMode: true, highWaterMark: 1 }); 

    rsFile1.pipe(tsFile1);
    rsFile2.pipe(tsFile2);

    let worked = 2;
    let pl1Paused = false;
    let pl2Paused = false;
    let compare1stFile;     
    let compare2ndFile;


    tsFile1.on( "data", chunk => onData(chunk, 0) );
    tsFile2.on( "data", chunk => onData(chunk, 1) );

    tsFile1.on( 'pause', () => onPause() );
    tsFile2.on( 'pause', () => onPause() );
 
    tsFile1.on( "end", () => onEnd(0) );
    tsFile2.on( "end", () => onEnd(1) );

    function onData(chunk, stNumber) {

      if (stNumber === 0) {
          
        compare1stFile = Number(chunk);
        pl1Paused = true;
        tsFile1.pause();

      } else {

        compare2ndFile = Number(chunk);
        pl2Paused = true;
        tsFile2.pause();

      }

    }

    function onPause() {
      
      if ( pl1Paused && pl2Paused ) {
        merge();
      }

    }

    function merge() {

      if ( compare1stFile === null || compare1stFile > compare2ndFile && compare2ndFile !== null ){

        writer.write(compare2ndFile.toString() + "\n");
        pl2Paused = false;
        compare2ndFile = null;
        tsFile2.resume();

      } else if (compare2ndFile === null || compare1stFile < compare2ndFile && compare1stFile !== null) {

        writer.write(compare1stFile.toString() + "\n");
        pl1Paused = false;
        compare1stFile = null;
        tsFile1.resume();

      } else {

        writer.write(compare1stFile.toString() + "\n");
        writer.write(compare2ndFile.toString() + "\n");

        pl1Paused = false;
        pl2Paused = false;
        
        compare1stFile = null;
        compare2ndFile = null;

        tsFile1.resume();
        tsFile2.resume();

      }  
  }

    function onEnd(stNumber) {
      
      --worked;

      if (worked === 0) {

        finish();

      } else {

        if (stNumber === 0) {
          
          if (compare2ndFile) { writer.write(compare2ndFile.toString() + "\n"); }

          pl1Paused = true;
          
          compare1stFile = null;
          compare2ndFile = null; 
          
          tsFile2.resume();

        } else {

          if (compare1stFile) { writer.write(compare1stFile.toString() + "\n"); }
          
          pl2Paused = true; 

          compare1stFile = null;
          compare2ndFile = null; 

          tsFile1.resume();
        }
      }
    }

    function finish() {

      if (compare1stFile){
        writer.write(compare1stFile.toString() + "\n");
      } else if (compare2ndFile) {
        writer.write(compare2ndFile.toString() + "\n");
      }

      worked = null;
      pl1Paused = null;
      pl2Paused = null;
      compare1stFile = null;
      compare2ndFile = null;

      writer.close();
      rsFile1.close();
      rsFile2.close();

      resolve(resFile);

    }
  })
}

// const arr = [
//   'SortFile\\chunk1',
//   'SortFile\\chunk2',
//   // 'SortFile\\chunk3',
//   // 'SortFile\\chunk4',
// ]

// mergeFiles(arr, config.get('dir')).then(res => console.log(res));
