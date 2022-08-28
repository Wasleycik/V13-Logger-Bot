const fs = require("fs");
const chalk = require("chalk");
const bot = global.client;

fs.readdirSync("./Source/Events/").forEach((folder) => {
  const eventFiles = fs
    .readdirSync(`./Source/Events/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  eventFiles.forEach((file) => {
    const event = require(`../Events/${folder}/${file}`);
    bot.on(event.conf.name, event);
  });
});

console.log(chalk.cyanBright(`[EVENTS] Log systems events loading.`));
