import fs, { readdir } from "fs/promises";

const lsCmdHandler = async (cmd, context) => {
  const path = context.cwd;

  try {
    await fs.access(path, fs.constants.X_OK);

    const dirContent = (await readdir(path, { withFileTypes: true })).sort(
      (a, b) => {
        if (a.isDirectory() && !b.isDirectory()) {
          return -1;
        }
        return 0;
      }
    );

    let padEndIndex = dirContent.length.toString().length;
    padEndIndex =
      padEndIndex > "Index".length ? padEndIndex + 2 : "Index".length + 2;
    const padEndName =
      dirContent.reduce(
        (acc, curr) => (acc.name.length > curr.name.length ? acc : curr),
        {
          name: "",
        }
      ).name.length + 2;

    // prettier-ignore
    const header = `|  ${'Index'.padEnd(padEndIndex)}|  ${'Name'.padEnd(padEndName)}|  ${'Type'.padEnd(11)}|`;
    const divider = "-".repeat(header.length);

    console.log(divider);
    console.log(header);
    console.log(divider);

    dirContent.forEach((entry, index) => {
      const type = entry.isDirectory() ? "directory" : "file";
      // prettier-ignore
      console.log(`|  ${index.toString().padEnd(padEndIndex)}|  ${entry.name.padEnd(padEndName)}|  ${type.padEnd(11)}|`);
    });

    console.log(divider);
  } catch (err) {
    console.error(`Operation failed. ${err.message}`);
  }
};

export default lsCmdHandler;
