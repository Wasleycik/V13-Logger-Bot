const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (role) => {
  var guildData = await database.findOne({ guildID: role.guild.id });

  if (guildData && guildData.roleLog == false) return;

  var logChannel =
    role.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    role.guild.channels.cache.get(guildData && guildData.roleChannelID);

  if (!logChannel) return;

  var fetchedLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_DELETE",
  });

  var roleLog = fetchedLogs.entries.first();

  var embed = new MessageEmbed()
    .setAuthor(
      roleLog.executor.tag,
      roleLog.executor.avatarURL({ dynamic: true })
    )
    .setDescription(`Silinen Rol: \`${role.name}\``)
    .setColor(role.guild.me.displayHexColor)
    .addField(
      `Rolü Silen Üye`,
      `${roleLog.executor} \`(${roleLog.executor.id})\``
    )
    .addField(
      `Oluşturulduğu Zaman`,
      "<t:" + Math.floor(role.createdTimestamp / 1000) + ":F>"
    )
    .addField(`Silindiği Zaman`, "<t:" + Math.floor(Date.now() / 1000) + ":F>")
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${role.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "roleDelete",
};
