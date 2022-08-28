const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (member, deafType) => {
  var guildData = await database.findOne({ guildID: member.guild.id });

  if (guildData && guildData.voiceLog == false) return;

  var logChannel =
    member.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    member.guild.channels.cache.get(guildData && guildData.voiceChannelID);

  if (!logChannel) return;

  var deaftip = deafType
    .replace("self-deafed", "Kendisini Sağırlaştırmıştı")
    .replace(`server-v`, "Sunucudan Sağırlaştırılmıştı");

  var embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
    .setDescription(
      `\`${member.user.tag}\` sağırlaştırılması açıldı ${member.voice.channel}`
    )
    .setColor(member.guild.me.displayHexColor)
    .addField(`Sağırlaştırma Tip`, `${deaftip}`)
    .addField(`Zaman`, "<t:" + Math.floor(Date.now() / 1000) + ":F>")
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
  name: "voiceChannelUndeaf",
};
