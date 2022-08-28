const botConfig = require("../Configs/botConfig");
const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(botConfig.mongoDB_ConnectURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      chalk.yellowBright(`[DATABASE] Log systems database connecting.`)
    );
  })
  .catch((err) => {
    console.log(chalk.red(`[DATABASE] Error: ${err}`));
  });
