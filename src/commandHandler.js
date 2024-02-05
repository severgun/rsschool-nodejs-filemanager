import osCmdHandler from "./osCmdHandler.js";

const commandHandler = (cmd, context, file, cb) => {
  const trimmedCmd = cmd.trimStart();

  const cmdNotFoundMsg = `Command ${trimmedCmd.trimEnd()} not found`;

  switch (true) {
    case /^os\s+/.test(trimmedCmd):
      osCmdHandler(trimmedCmd);
      break;

    default:
      console.error(cmdNotFoundMsg);
      break;
  }

  console.log(`\nYou are currently in '${context.cwd}' directory.`);
  cb(null);
};

export default commandHandler;
