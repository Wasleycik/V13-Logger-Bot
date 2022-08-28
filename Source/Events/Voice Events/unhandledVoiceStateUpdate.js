const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (oldState, newState) => {
  var guildData = await database.findOne({ guildID: oldState.guild.id });

  if (guildData && guildData.voiceLog == false) return;

  var logChannel =
    oldState.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    oldState.guild.channels.cache.get(guildData && guildData.voiceChannelID);

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(
      oldState.member.user.tag,
      oldState.member.user.avatarURL({ dynamic: true })
    )
    .setDescription(
      `\`${oldState.member.user.tag}\` ses ile ilgili bir olay gerçekleşti ama bulamadım`
    )
    .setColor(oldState.guild.me.displayHexColor)
    .addField(`Zaman`, "<t:" + Math.floor(Date.now() / 1000) + ":F>")
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${oldState.member.user.id}\nSunucu = ${oldState.guild.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "unhandledVoiceStateUpdate",
};
