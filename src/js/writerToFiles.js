import fs from "fs";
import { Writable } from "stream";

export class WriteToFiles extends Writable {
  constructor(options) {
    super(options);

    this.rootDir = options.rootDir;
    this.fileSizeInBytes = options.fileSizeInBytes;
    this.numberOfFiles = options.numberOfFiles;
    this.chunkSize = Math.round(this.fileSizeInBytes / this.numberOfFiles);
    this.writed = 0;
    this.currentSize = 0;
    this.streamID = 0;
    this.buffArr = [];
  }

  _write(chunk, _, done) {
    let data = chunk.toString();
    this.buffArr.push(data);

    this.currentSize =
      this.currentSize + new TextEncoder().encode(data + "\n").length;

    if (this.currentSize >= this.chunkSize) {
      this.buffArr.sort((a, b) => {
        return a - b;
      });

      // console.log('befor write', process.memoryUsage());

      const currStream = fs.createWriteStream(
        `${this.rootDir}\\chunk${this.streamID + 1}`
      );

      this.buffArr.forEach((el, index) => {
        let sep = "\n";
        if (index === this.buffArr.length - 1) {
          sep = "";
        }

        currStream.write(el + sep);
      });

      currStream.end();

      this.writed = this.writed + this.currentSize;
      this.streamID++;
      this.currentSize = 0;
      this.buffArr.length = 0;

      // console.log('after write', process.memoryUsage());

      if (this.streamID === this.numberOfFiles - 1) {
        this.chunkSize = this.fileSizeInBytes - this.writed;
      }
    }

    done();
  }
}
