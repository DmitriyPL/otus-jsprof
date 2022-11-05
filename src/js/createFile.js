import path from "path";
import fs from "fs";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateFile(dir, size = 1048576) {
  
  return new Promise( (resolve, reject) => {

    const filePath = path.join(dir, "randomNumbers");

    let writeStream = fs.createWriteStream(filePath);
  
    let fileSize = 0;
  
    write();

    function write() {
    
      let ok = true;
  
      do {
        const num = randomIntFromInterval(1, 1000000).toString();
        let lengthInBytes = new TextEncoder().encode(num + "\n").length;
  
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

// const mainDir = "C:\\OTUS\\";

// generateFile(mainDir, 104857600).then( path => console.log(path));
