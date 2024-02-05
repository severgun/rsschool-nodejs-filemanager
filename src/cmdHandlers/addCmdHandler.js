import fs from "fs/promises";
import { parsePath } from "../utils/parsePath.js";

const addCmdHandler = async (cmd, context) => {
  try {
    const filePath = parsePath(cmd, context);
    const fileHandle = await fs.open(filePath, "wx");
    await fileHandle?.close();
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default addCmdHandler;
