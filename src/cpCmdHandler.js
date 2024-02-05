import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { parseSrcDestPath } from "./parsePath.js";

const cpCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parseSrcDestPath(cmd, context);
    const input = createReadStream(srcPath);
    const output = createWriteStream(destPath);

    await pipeline(input, output);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default cpCmdHandler;
