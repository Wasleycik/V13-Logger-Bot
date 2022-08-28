const { MessageEmbed } = require("discord.js");
const botConfig = require("../Configs/botConfig");

module.exports = {
  name: "yardım",
  description: "Log sistemleri hakkında yardım alırsınız.",
  guildOnly: true,
  async execute(message, args, bot) {
    var embed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        bot.commands
          .map(
            (x) =>
              `\`•\` ${botConfig.botPrefix}${x.name} │ **${x.description}**`
          )
          .join("\n")
      )
      .setColor(message.guild.me.displayHexColor)
      .setFooter(bot.user.username, bot.user.avatarURL({ dynamic: false }))
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
