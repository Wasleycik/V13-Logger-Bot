const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (member) => {
  var guildData = await database.findOne({ guildID: member.guild.id });

  if (guildData && guildData.memberLog == false) return;

  var logChannel =
    member.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    member.guild.channels.cache.get(guildData && guildData.memberChannelID);

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
    .setDescription(`Sunucuya Girdi \`${member.user.tag}\``)
    .setColor(member.guild.me.displayHexColor)
    .addField(`Üye`, `${member.user} \`(${member.user.id})\``)
    .addField(
      `Hesabını Oluşturduğu Zaman`,
      "<t:" + Math.floor(member.user.createdTimestamp / 1000) + ":F>"
    )
    .addField(
      `Sunucuya Girdiği Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${member.user.id}\nSunucu = ${member.guild.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "guildMemberAdd",
};
