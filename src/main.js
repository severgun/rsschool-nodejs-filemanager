import repl from "repl";
import os from "os";
import getUserName from "./utils/getUserName.js";
import commandHandler from "./commandHandler.js";

const main = () => {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);

  const currentWorkingDir = os.homedir();
  console.log(`You are currently in '${currentWorkingDir}' directory.`);

  const replServer = repl.start({
    prompt: "> ",
    eval: commandHandler,
  });

  replServer.context.cwd = currentWorkingDir;

  replServer.on("exit", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  });
};

main();
