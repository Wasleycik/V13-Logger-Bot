const chalk = require("chalk");
const botConfig = require("../../Configs/botConfig");
const bot = global.client;

module.exports = async () => {
  try {
    bot.user.setPresence({ activities: [{ name: botConfig.botPlaying }] });
    console.log(
      chalk.blueBright(`[BOT] Log systems successfully set bot playing.`)
    );
  } catch (err) {
    console.log(chalk.red(`[BOT] Log systems unsuccessful bot playing.`));
  }
};

module.exports.conf = {
  name: "ready",
};
