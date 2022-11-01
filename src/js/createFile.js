import path from "path";
import fs from "fs";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateFile(filePath, size = 1048576) {
  let writeStream = fs.createWriteStream(filePath);

  let fileSize = 0;

  write();

  function write() {
    let ok = true;

    do {
      const num = randomIntFromInterval(1, 1000000).toString();
      let lengthInBytes = new TextEncoder().encode(num + "\n").length;

      let sep = "\n";

      if (fileSize + lengthInBytes > size) {
        sep = "";
        lengthInBytes = lengthInBytes - new TextEncoder().encode("\n").length;
      }

      ok = writeStream.write(num + sep);
      if (ok) {
        fileSize = fileSize + lengthInBytes;
      }
    } while (ok && fileSize < size);

    if (fileSize < size) {
      writeStream.once("drain", write);
    }

    if (fileSize >= size) {
      writeStream.close();
      console.log(`File is done! File size is ${fileSize}`);
    }
  }
}

const mainDir = "C:\\OTUS\\";
const FILEPATH = path.join(mainDir, "randomNumbers");

generateFile(FILEPATH, 104857600);
