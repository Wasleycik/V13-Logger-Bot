const { MessageEmbed } = require("discord.js");
const hastebin = require("hastebin-gen");
const moment = require("moment");
const database = require("../../Models/database");
const bot = global.client;
moment.locale("tr");

module.exports = async (messages) => {
  var guildData = await database.findOne({
    guildID: messages.first().guild.id,
  });

  if (guildData && guildData.messageLog == false) return;

  var logChannel =
    messages
      .first()
      .guild.channels.cache.get(guildData && guildData.logChannelID) ||
    messages
      .first()
      .guild.channels.cache.get(guildData && guildData.messageChannelID);

  if (!logChannel) return;

  hastebin(
    messages
      .filter((x) => !x.author.bot)
      .map(
        (x) =>
          `Mesaj Sahibi: ${x.author.tag} (${x.author.id}) \nMesaj İçeriği: ${
            x.content
          } \nAtıldığı Zaman: ${moment(x.createdTimestamp).format("LLL")} \n`
      )
      .join("\n"),
    { extension: "txt" }
  ).then((haste) => {
    var embed = new MessageEmbed()
      .setAuthor(
        messages.first().author.tag,
        messages.first().author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `Toplam \`${
          messages.map((x) => x.content).length
        }\` mesaj silindi. \nMesajlar şurada silindi: ${
          messages.first().channel
        }`
      )
      .setColor(messages.first().guild.me.displayHexColor)
      .addField(`Mesaj İçeriği`, `${haste}`)
      .addField(
        `Silindiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${messages.first().author.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  });
};

module.exports.conf = {
  name: "messageDeleteBulk",
};
