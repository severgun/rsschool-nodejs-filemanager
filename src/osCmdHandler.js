import os from "os";
const osCmdHandler = (cmd) => {
  if (cmd.includes("--EOL")) {
    switch (os.EOL) {
      case "\r":
        console.log("Current EOL is CR");
        break;
      case "\n":
        console.log("Current EOL is LF");
        break;
      case "\r\n":
        console.log("Current EOL is CRLF");
        break;

      default:
        break;
    }
    return;
  }

  if (cmd.includes("--cpus")) {
    const cpus = os.cpus();
    console.log(`Total ${cpus.length} cores`);
    cpus.forEach((cpu, index, cpus) => {
      console.log(
        `${index}: ${cpu.model}\tCurrent freq:\t${cpu.speed / 1000}\tGHz`
      );
    });
    return;
  }

  if (cmd.includes("--homedir")) {
    console.log(os.homedir());
    return;
  }

  if (cmd.includes("--username")) {
    console.log(os.userInfo().username);
    return;
  }

  if (cmd.includes("--architecture")) {
    console.log(os.arch());
    return;
  }

  console.log(
    "Command 'os' requires additional params.\nAvailable params: --EOL, --cpus, --homedir, --username, --architecture."
  );
  return;
};

export default osCmdHandler;
