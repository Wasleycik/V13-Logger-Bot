const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (member, muteType) => {
  var guildData = await database.findOne({ guildID: member.guild.id });

  if (guildData && guildData.voiceLog == false) return;

  var logChannel =
    member.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    member.guild.channels.cache.get(guildData && guildData.voiceChannelID);

  if (!logChannel) return;

  var mutetip = muteType
    .replace("self-muted", "Kendisini Susturmuştu")
    .replace(`server-muted`, "Sunucudan Susturulmuştu");

  var embed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
    .setDescription(
      `\`${member.user.tag}\` susturulması açıldı ${member.voice.channel}`
    )
    .setColor(member.guild.me.displayHexColor)
    .addField(`Mute Tip`, `${mutetip}`)
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
  name: "voiceChannelUnmute",
};
