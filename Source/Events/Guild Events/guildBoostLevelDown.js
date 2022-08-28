const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (guild, oldLevel, newLevel) => {
  var guildData = await database.findOne({ guildID: guild.id });

  if (guildData && guildData.guildLog == false) return;

  var logChannel =
    guild.channels.cache.get(guildData && guildData.logChannelID) ||
    guild.channels.cache.get(guildData && guildData.guildChannelID);

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setDescription(`Sunucunun Seviyesi Düştü \`${guild.name}\``)
    .setColor(guild.me.displayHexColor)
    .addField(`Seviye`, `Eski: ${oldLevel} Yeni: ${newLevel}`)
    .addField(
      `Seviye Düşüldüğü Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(`ID`, `\`\`\`\nSunucu = ${guild.id}\n\`\`\``)
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "guildBoostLevelDown",
};
