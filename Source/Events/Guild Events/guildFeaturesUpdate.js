const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (oldGuild, newGuild) => {
  var guildData = await database.findOne({ guildID: oldGuild.id });

  if (guildData && guildData.guildLog == false) return;

  var logChannel =
    oldGuild.channels.cache.get(guildData && guildData.logChannelID) ||
    oldGuild.channels.cache.get(guildData && guildData.guildChannelID);

  if (!logChannel) return;

  var fetchedLogs = await oldGuild.fetchAuditLogs({
    limit: 1,
    type: "GUILD_UPDATE",
  });

  var guildLog = fetchedLogs.entries.first();

  var embed = new MessageEmbed()
    .setAuthor(
      guildLog.executor.tag,
      guildLog.executor.avatarURL({ dynamic: true })
    )
    .setDescription(`Sunucu Özellikleri Değiştirildi`)
    .setColor(oldGuild.me.displayHexColor)
    .addField(`Üye`, `${guildLog.executor} \`(${guildLog.executor.id})\``)
    .addField(
      `Özellikler`,
      `Eski: ${oldGuild.features.join(", ")} \n\nYeni: ${newGuild.features.join(
        ", "
      )}`
    )
    .addField(
      `Özellikleri Değiştirildiği Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı: ${guildLog.executor.id} \nSunucu = ${oldGuild.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "guildFeaturesUpdate",
};
