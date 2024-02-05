import path from "path";
import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { parseSrcDestPath } from "./parsePath.js";

const compressCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parseSrcDestPath(cmd, context);

    await fs.access(srcPath, fs.constants.F_OK | fs.constants.R_OK);
    await fs.access(path.dirname(destPath), fs.constants.W_OK);

    const input = createReadStream(srcPath);
    const output = createWriteStream(destPath);

    input.pipe(createBrotliCompress()).pipe(output);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

const decompressCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parseSrcDestPath(cmd, context);
    await fs.access(srcPath, fs.constants.R_OK);
    await fs.access(path.dirname(destPath), fs.constants.W_OK);

    const input = createReadStream(srcPath);
    const output = createWriteStream(destPath);

    input.pipe(createBrotliDecompress()).pipe(output);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export { compressCmdHandler, decompressCmdHandler };
