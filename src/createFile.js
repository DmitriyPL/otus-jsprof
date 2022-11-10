import config from "config";
import path from "path";
import fs from "fs";


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateFile(dir, size) {
  
  return new Promise( (resolve, _) => {
    
    const filePath = path.join(dir, "randomNumbers");

    let writeStream = fs.createWriteStream(filePath);
  
    let fileSize = 0;
    const from = config.get("from");
    const to = config.get("to");

    write();

    function write() {
    
      let ok = true;
  
      do {
        const num = randomIntFromInterval(from, to).toString();        
        let lengthInBytes = Buffer.byteLength(num + "\n", 'utf8');
  
        ok = writeStream.write(num + "\n");
        if (ok) {
          fileSize = fileSize + lengthInBytes;

        }

      } while (ok && fileSize < size);
  
      if (fileSize < size) {
        writeStream.once("drain", write);
      }
  
      if (fileSize >= size) {
        writeStream.close();        
        resolve(filePath);
      }

    }

  })

}

// const dir = config.get("dir");
// const fileSize = config.get("fileSize");

// generateFile(dir, fileSize).then( path => console.log(path));
