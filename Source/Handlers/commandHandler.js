const fs = require("fs");
const chalk = require("chalk");
const bot = global.client;

const commandFiles = fs
  .readdirSync(`./Source/Commands/`)
  .filter((file) => file.endsWith(".js"));

commandFiles.forEach((file) => {
  const command = require(`../Commands/${file}`);
  bot.commands.set(command.name, command);
});

console.log(chalk.redBright(`[COMMANDS] Log systems commands loading.`));
