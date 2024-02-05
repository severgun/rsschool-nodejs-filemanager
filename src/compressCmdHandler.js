import path from "path";
import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

const parsePaths = (cmd, context) => {
  const args = cmd.trim().split(" ");

  if (args.length < 3) {
    const error = new Error(
      "Invalid input. Please provide source and destination paths."
    );
    error.code = "NOARGS";
    throw error;
  }

  const srcPath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(context.cwd, args[1]);

  const destPath = path.isAbsolute(args[2])
    ? args[2]
    : path.join(context.cwd, args[2]);

  return [srcPath, destPath];
};

const compressCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parsePaths(cmd, context);

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
    const [srcPath, destPath] = parsePaths(cmd, context);
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
