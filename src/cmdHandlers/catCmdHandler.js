import { parsePath } from "../utils/parsePath.js";
import { createReadStream, createWriteStream } from "fs";

const catCmdHandler = async (cmd, context) => {
  try {
    const filePath = parsePath(cmd, context);
    const input = createReadStream(filePath);
    const output = createWriteStream("", { fd: process.stdout.fd });
    for await (const chunk of input) {
      output.write(chunk);
    }
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default catCmdHandler;
