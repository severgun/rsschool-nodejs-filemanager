import fs from "fs/promises";
import { parsePath } from "../utils/parsePath.js";

const cdCmdHandler = async (cmd, context) => {
  try {
    const destPath = parsePath(cmd, context);
    await fs.access(destPath, fs.constants.X_OK);
    context.cwd = destPath;
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default cdCmdHandler;
