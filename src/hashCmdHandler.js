import { createHash } from "crypto";
import { createReadStream } from "fs";
import fs from "fs/promises";
import { parsePath } from "./parsePath.js";

const hashCmdHandler = async (cmd, context) => {
  try {
    const filePath = parsePath(cmd, context);
    await fs.access(filePath, fs.constants.R_OK);

    const hash = createHash("sha256");

    const input = createReadStream(filePath);
    for await (const chunk of input) {
      hash.update(chunk);
    }

    console.log(`\n SHA256 sum for ${filePath} is ${hash.digest("hex")}`);
  } catch (error) {
    if (error.code === "NOARGS") {
      console.error(error.message);
    } else {
      console.error(`Operation failed. ${error.message}`);
    }
  }
};

export default hashCmdHandler;
