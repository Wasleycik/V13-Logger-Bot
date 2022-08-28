const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (member, voiceChannel) => {
  var guildData = await database.findOne({ guildID: member.guild.id });

  if (guildData && guildData.voiceLog == false) return;

  var logChannel =
    member.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    member.guild.channels.cache.get(guildData && guildData.voiceChannelID);

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
    .setDescription(`\`${member.user.tag}\` yayın açtı`)
    .setColor(member.guild.me.displayHexColor)
    .addField(`Kanal`, `${voiceChannel} \`(${voiceChannel.id})\``)
    .addField(`Açtığı Zaman`, "<t:" + Math.floor(Date.now() / 1000) + ":F>")
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${member.user.id}\nChannel = ${voiceChannel.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "voiceStreamingStart",
};
