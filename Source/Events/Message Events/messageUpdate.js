const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;

  var guildData = await database.findOne({ guildID: oldMessage.guild.id });

  if (guildData && guildData.messageLog == false) return;

  var logChannel =
    oldMessage.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    oldMessage.guild.channels.cache.get(
      guildData && guildData.messageChannelID
    );

  if (!logChannel) return;

  var embed = new MessageEmbed()
    .setAuthor(
      oldMessage.author.tag,
      oldMessage.author.avatarURL({ dynamic: true })
    )
    .setDescription(`Mesaj şurada düzenlendi: ${oldMessage.channel}`)
    .setColor(oldMessage.guild.me.displayHexColor)
    .addField(
      `Mesaj İçeriği`,
      `Eski: ${oldMessage.content} Yeni: ${newMessage.content}`
    )
    .addField(
      `Atıldığı Zaman`,
      "<t:" + Math.floor(oldMessage.createdTimestamp / 1000) + ":F>"
    )
    .addField(
      `Düzenlendiği Zaman`,
      "<t:" + Math.floor(newMessage.createdTimestamp / 1000) + ":F>"
    )
    .addField(
      `ID`,
      `\`\`\`\nKullanıcı = ${oldMessage.author.id}\nMesaj = ${oldMessage.id}\n\`\`\``
    )
    .setFooter(
      `${bot.user.username}#${bot.user.discriminator}`,
      bot.user.avatarURL()
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });
};

module.exports.conf = {
  name: "messageUpdate",
};
