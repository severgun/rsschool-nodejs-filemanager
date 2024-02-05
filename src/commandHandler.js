import path from "path";
import hashCmdHandler from "./hashCmdHandler.js";
import lsCmdHandler from "./lsCmdHandler.js";
import osCmdHandler from "./osCmdHandler.js";

const commandHandler = async (cmd, context, file, cb) => {
  const trimmedCmd = cmd.trimStart();

  const cmdNotFoundMsg = `Invalid input. Command ${trimmedCmd.trimEnd()} not found.`;

  switch (true) {
    case /^up\s+/.test(trimmedCmd):
      context.cwd = path.dirname(context.cwd);
      break;

    case /^ls\s+/.test(trimmedCmd):
      await lsCmdHandler(trimmedCmd, context);
      break;

    case /^os\s+/.test(trimmedCmd):
      osCmdHandler(trimmedCmd);
      break;

    case /^hash\s+/.test(trimmedCmd):
      await hashCmdHandler(trimmedCmd, context);
      break;

    default:
      console.error(cmdNotFoundMsg);
      break;
  }

  console.log(`\nYou are currently in '${context.cwd}' directory.`);
  cb(null);
};

export default commandHandler;
