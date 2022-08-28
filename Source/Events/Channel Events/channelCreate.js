const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (channel) => {
  var guildData = await database.findOne({ guildID: channel.guild.id });

  if (guildData && guildData.channelLog == false) return;

  var logChannel =
    channel.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    channel.guild.channels.cache.get(guildData && guildData.channelChannelID);

  if (!logChannel) return;

  var fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE",
  });

  var channelLog = fetchedLogs.entries.first();

  var embed = new MessageEmbed()
    .setAuthor(
      channelLog.executor.tag,
      channelLog.executor.avatarURL({ dynamic: true })
    )
    .setDescription(`Oluşturulan Kanal: ${channel}`)
    .setColor(channel.guild.me.displayHexColor)
    .addField(
      `Kanalı Oluşturan Üye`,
      `${channelLog.executor} \`(${channelLog.executor.id})\``
    )
    .addField(
      `Oluşturulduğu Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${channel.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "channelCreate",
};
