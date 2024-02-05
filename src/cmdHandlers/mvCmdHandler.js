import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import { pipeline } from "stream/promises";
import { parseSrcDestPath } from "../utils/parsePath.js";

const mvCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parseSrcDestPath(cmd, context);
    const input = createReadStream(srcPath);
    const output = createWriteStream(destPath);

    await pipeline(input, output);

    await rm(srcPath);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default mvCmdHandler;
