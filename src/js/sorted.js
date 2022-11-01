import path from "path";
import fs from "fs";
import { Liner } from "./liner.js";
import EventEmitter from "events";

function readFromStreams(arrFiles, resFile) {
  const arrStreams = [];

  arrFiles.forEach((filePath) => {
    arrStreams.push([
      fs.createReadStream(filePath),
      new Liner({ objectMode: true }),
    ]);
  });

  let worked = 0;
  let waited = 0;

  let iterChunk = [];

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
        iterChunk.push(Number(line));
        currLiner.pause();

        waited++;

        if (waited === worked) {
          writer.write(merge_sort(iterChunk)[0].toString() + "\n");

          iterChunk.length = 0;
          waited = 0;
          restart.emit("resumeStreams");
        }
      }
    });

    currLiner.on("end", () => {
      --worked;
    });
  });
}

function merge_sort(A) {
  if (A.length === 1 || A.length === 0) {
    return A;
  }

  const mid = Math.floor(A.length / 2);
  let L = merge_sort(A.slice(0, mid)); //[:len(A) // 2])
  let R = merge_sort(A.slice(mid));

  let n = 0;
  let m = 0;
  let k = 0;

  const lengthL = L.length;
  const lengthR = R.length;

  let C = new Array(lengthL + lengthR).fill(0);

  while (n < lengthL && m < lengthR) {
    if (L[n] <= R[m]) {
      C[k] = L[n];
      n++;
    } else {
      C[k] = R[m];
      m++;
    }
    k++;
  }

  while (n < lengthL) {
    C[k] = L[n];
    n++;
    k++;
  }

  while (m < lengthR) {
    C[k] = R[m];
    m++;
    k++;
  }

  for (let i = 0; i < A.length; i++) {
    A[i] = C[i];
  }

  return A;
}

function main() {
  const mainDir = "C:\\OTUS\\";
  const resFile = path.join(mainDir, "sortedFile");

  const arrFiles = [
    path.join(mainDir, "chunk1"),
    path.join(mainDir, "chunk2"),
    path.join(mainDir, "chunk3"),
    path.join(mainDir, "chunk4"),
    path.join(mainDir, "chunk5"),
  ];

  readFromStreams(arrFiles, resFile);
}

main();
