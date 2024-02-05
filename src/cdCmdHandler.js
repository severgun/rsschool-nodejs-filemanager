import path from "path";
import fs from "fs/promises";

const cdCmdHandler = async (cmd, context) => {
  const args = cmd.trim().split(" ");

  if (args.length < 2) {
    console.error("Invalid input. Please provide path.");
    return;
  }

  const destPath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(context.cwd, args[1]);

  try {
    await fs.access(destPath, fs.constants.X_OK);
    context.cwd = destPath;
  } catch (error) {
    console.error(`Operation failed. ${error.message}`);
  }
};

export default cdCmdHandler;
