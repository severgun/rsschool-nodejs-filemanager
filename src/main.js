import repl from "repl";
import getUserName from "./getUserName.js";

const main = () => {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
  const replServer = repl.start("> ");
  replServer.on("exit", () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  });
};

main();
