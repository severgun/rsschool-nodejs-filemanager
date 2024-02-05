const getUserName = () => {
  const args = process.argv;
  const userNameArgs = args.filter((arg) => arg.startsWith("--username="));

  const userName =
    userNameArgs.length > 0
      ? userNameArgs[0].substring(userNameArgs[0].indexOf("=") + 1)
      : "Username";

  return userName;
};

export default getUserName;
