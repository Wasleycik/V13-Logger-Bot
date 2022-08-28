const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (message) => {
  if (message.author.bot) return;

  var guildData = await database.findOne({ guildID: message.guild.id });

  if (guildData && guildData.messageLog == false) return;

  var logChannel =
    message.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    message.guild.channels.cache.get(guildData && guildData.messageChannelID);

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setDescription(`Mesaj şurada silindi: ${message.channel}`)
    .setColor(message.guild.me.displayHexColor)
    .addField(`Mesaj İçeriği`, `${message.content}`)
    .addField(
      `Atıldığı Zaman`,
      "<t:" + Math.floor(message.createdTimestamp / 1000) + ":F>"
    )
    .addField(`Silindiği Zaman`, "<t:" + Math.floor(Date.now() / 1000) + ":F>")
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${message.author.id}\nMesaj = ${message.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "messageDelete",
};
