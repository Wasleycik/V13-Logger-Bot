const botConfig = require("../../Configs/botConfig");
const bot = global.client;

module.exports = async (message) => {
  const args = message.content
    .slice(botConfig.botPrefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLocaleLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!message.content.startsWith(botConfig.botPrefix) || !command) return;

  if (command.guildOnly && message.channel.type == "dm") return;

  try {
    command.execute(message, args, bot);
  } catch (err) {
    console.error(err);
  }
};

module.exports.conf = {
  name: "messageCreate",
};
