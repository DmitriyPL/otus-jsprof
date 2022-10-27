import { promises } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

export async function tree() {
  const startPath = argv[2];

  let fsMap = {
    files: [],
    folders: [],
  };

  try {
    await promises.access(startPath);
  } catch (err) {
    console.log(`${startPath} ${err ? "does not exist" : "exists"}`);
    return fsMap;
  }

  fsMap.folders.push(startPath);
  await getSubDir(startPath, fsMap);

  return fsMap;
}

async function getSubDir(startPath, fsMap) {
  const folders = await promises.readdir(startPath, { withFileTypes: true });

  for (let folder of folders) {
    let newPath = path.join(startPath, folder.name);

    if (folder.isDirectory()) {
      fsMap.folders.push(newPath);
      await getSubDir(newPath, fsMap);
    } else {
      fsMap.files.push(newPath);
    }
  }
}

console.log(await tree());
