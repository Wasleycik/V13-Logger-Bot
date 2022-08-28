const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (guild, afkChannel) => {
  var guildData = await database.findOne({ guildID: guild.id });

  if (guildData && guildData.guildLog == false) return;

  var logChannel =
    guild.channels.cache.get(guildData && guildData.logChannelID) ||
    guild.channels.cache.get(guildData && guildData.guildChannelID);

  if (!logChannel) return;

  var fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "GUILD_UPDATE",
  });

  var guildLog = fetchedLogs.entries.first();

  var embed = new MessageEmbed()
    .setAuthor(
      guildLog.executor.tag,
      guildLog.executor.avatarURL({ dynamic: true })
    )
    .setDescription(`Sunucuda Afk Kanalı Değiştirildi ${afkChannel}`)
    .setColor(guild.me.displayHexColor)
    .addField(`Üye`, `${guildLog.executor} \`(${guildLog.executor.id})\``)
    .addField(
      `Afk Kanalı Değiştirildiği Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı: ${guildLog.executor.id} \nSunucu = ${guild.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "guildAfkChannelAdd",
};
