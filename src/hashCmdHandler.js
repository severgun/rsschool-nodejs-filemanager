import { createHash } from "crypto";
import { createReadStream } from "fs";
import fs from "fs/promises";
import path from "path";

const hashCmdHandler = async (cmd, context) => {
  const args = cmd.trim().split(" ");

  if (args.length < 2) {
    console.error("Invalid input. Please provide file path.");
    return;
  }

  const filePath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(context.cwd, args[1]);

  try {
    await fs.access(filePath, fs.constants.R_OK);
    console.log("here");

    const hash = createHash("sha256");

    const input = createReadStream(filePath);
    for await (const chunk of input) {
      hash.update(chunk);
    }

    console.log(`\n SHA256 sum for ${filePath} is ${hash.digest("hex")}`);
  } catch (error) {
    console.error(`Operation failed. ${error.message}`);
  }
};

export default hashCmdHandler;
