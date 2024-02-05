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
    dirContent.forEach((entry, index) => {
      const type = entry.isDirectory() ? "directory" : "file";

      // TODO: prettify output
      console.log(`|\t${index}\t|\t${entry.name}\t\t|\t${type}\t|`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default lsCmdHandler;
