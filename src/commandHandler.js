import path from "path";
import hashCmdHandler from "./cmdHandlers/hashCmdHandler.js";
import lsCmdHandler from "./cmdHandlers/lsCmdHandler.js";
import osCmdHandler from "./cmdHandlers/osCmdHandler.js";
import cdCmdHandler from "./cmdHandlers/cdCmdHandler.js";
import addCmdHandler from "./cmdHandlers/addCmdHandler.js";
import cpCmdHandler from "./cmdHandlers/cpCmdHandler.js";
import rnCmdHandler from "./cmdHandlers/rnCmdHandler.js";
import mvCmdHandler from "./cmdHandlers/mvCmdHandler.js";
import rmCmdHandler from "./cmdHandlers/rmCmdHandler.js";
import {
  compressCmdHandler,
  decompressCmdHandler,
} from "./cmdHandlers/compressCmdHandler.js";
import catCmdHandler from "./cmdHandlers/catCmdHandler.js";

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

    case /^add\s+/.test(trimmedCmd):
      await addCmdHandler(trimmedCmd, context);
      break;

    case /^cat\s+/.test(trimmedCmd):
      await catCmdHandler(trimmedCmd, context);
      break;

    case /^rn\s+/.test(trimmedCmd):
      await rnCmdHandler(trimmedCmd, context);
      break;

    case /^cp\s+/.test(trimmedCmd):
      await cpCmdHandler(trimmedCmd, context);
      break;

    case /^rm\s+/.test(trimmedCmd):
      await rmCmdHandler(trimmedCmd, context);
      break;

    case /^mv\s+/.test(trimmedCmd):
      await mvCmdHandler(trimmedCmd, context);
      break;

    case /^os\s+/.test(trimmedCmd):
      osCmdHandler(trimmedCmd);
      break;

    case /^hash\s+/.test(trimmedCmd):
      await hashCmdHandler(trimmedCmd, context);
      break;

    case /^cd\s+/.test(trimmedCmd):
      await cdCmdHandler(trimmedCmd, context);
      break;

    case /^compress\s+/.test(trimmedCmd):
      await compressCmdHandler(trimmedCmd, context);
      break;

    case /^decompress\s+/.test(trimmedCmd):
      await decompressCmdHandler(trimmedCmd, context);
      break;

    default:
      console.error(cmdNotFoundMsg);
      break;
  }

  console.log(`\nYou are currently in '${context.cwd}' directory.`);
  cb(null);
};

export default commandHandler;
