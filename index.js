const { Client, Collection } = require("discord.js");
const bot = (global.client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_WEBHOOKS",
    "GUILD_VOICE_STATES",
  ],
}));
const botConfig = require("./Source/Configs/botConfig");
const chalk = require("chalk");
const logs = require("discord-logs");
logs(bot, {
  debug: false,
});

bot.commands = new Collection();

require("./Source/Handlers/eventsHandler");
require("./Source/Handlers/mongoHandler");
require("./Source/Handlers/commandHandler");

bot
  .login(botConfig.botToken)
  .then(() => console.log(chalk.greenBright(`[BOT] ${bot.user.tag} Online.`)))
  .catch((err) => console.log(chalk.red(`[BOT] Error: ${err}`)));

  
client.on('messageCreate', async message => {
  if (message.content === '!fk') { // - yerine prefixi yaz
    client.emit('guildMemberAdd', message.member || await message.guild.members.fetch(message.author));
      }
  
      if (message.content === '!fa') { // - yerine prefixi yaz
          client.emit('guildMemberRemove', message.member || await message.guild.members.fetch(message.author));
      }
  });