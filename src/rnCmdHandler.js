import fs from "fs/promises";
import { parseSrcDestPath } from "./parsePath.js";

const rnCmdHandler = async (cmd, context) => {
  try {
    const [srcPath, destPath] = parseSrcDestPath(cmd, context);
    await fs.rename(srcPath, destPath);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default rnCmdHandler;
