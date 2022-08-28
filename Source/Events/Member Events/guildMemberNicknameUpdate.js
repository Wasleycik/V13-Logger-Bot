const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (member, oldNickname, newNickname) => {
  var guildData = await database.findOne({ guildID: member.guild.id });

  if (guildData && guildData.memberLog == false) return;

  var logChannel =
    member.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    member.guild.channels.cache.get(guildData && guildData.memberChannelID);

  if (!logChannel) return;

  var fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_UPDATE",
  });

  var memberLog = fetchedLogs.entries.first();

  var embed = new MessageEmbed()
    .setAuthor(
      memberLog.executor.tag,
      memberLog.executor.avatarURL({ dynamic: true })
    )
    .setDescription(`İsim Değiştirildi \`${member.user.tag}\``)
    .setColor(member.guild.me.displayHexColor)
    .addField(`Üye`, `${member.user} \`(${member.user.id})\``)
    .addField(
      `İsim`,
      `Eski: ${oldNickname ? oldNickname : `Bulunamıyor.`} Yeni: ${
        newNickname ? newNickname : `Bulunamıyor.`
      }`
    )
    .addField(
      `İsim Değiştirildi Zaman`,
      "<t:" + Math.floor(Date.now() / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${memberLog.executor.id}\nSunucu = ${member.guild.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "guildMemberNicknameUpdate",
};
