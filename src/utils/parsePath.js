import path from "path";

const parsePath = (cmd, context) => {
  const args = cmd.trim().split(" ");

  if (args.length < 2) {
    const error = new Error("Invalid input. Please provide file path.");
    error.code = "NOARGS";
    throw error;
  }

  const filePath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(context.cwd, args[1]);

  return filePath;
};

const parseSrcDestPath = (cmd, context) => {
  const args = cmd.trim().split(" ");

  if (args.length < 3) {
    const error = new Error(
      "Invalid input. Please provide source and destination paths."
    );
    error.code = "NOARGS";
    throw error;
  }

  const srcPath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(context.cwd, args[1]);

  const destPath = path.isAbsolute(args[2])
    ? args[2]
    : path.join(context.cwd, args[2]);

  return [srcPath, destPath];
};

export { parsePath, parseSrcDestPath };
