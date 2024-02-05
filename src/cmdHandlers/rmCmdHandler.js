import { rm } from "fs/promises";
import { parsePath } from "../utils/parsePath.js";

const rmCmdHandler = async (cmd, context) => {
  try {
    const filePath = parsePath(cmd, context);
    await rm(filePath);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default rmCmdHandler;
