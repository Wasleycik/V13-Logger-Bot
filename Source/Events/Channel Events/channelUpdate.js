const { MessageEmbed, Permissions } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (oldChannel, newChannel) => {
  var guildData = await database.findOne({ guildID: oldChannel.guild.id });

  if (guildData && guildData.channelLog == false) return;

  var logChannel =
    oldChannel.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    oldChannel.guild.channels.cache.get(
      guildData && guildData.channelChannelID
    );

  if (!logChannel) return;

  var fetchedLogs = await oldChannel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_UPDATE",
  });

  var channelLog = fetchedLogs.entries.first();

  if (oldChannel.name !== newChannel.name) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal İsmi Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal İsmi`,
        `Eski: ${oldChannel.name} Yeni: ${newChannel.name}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.topic !== newChannel.topic) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal Başlığı Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Başlığı`,
        `Eski: ${
          (oldChannel.topic === null && `Başlık Bulunmuyor`) ||
          `${oldChannel.topic}`
        } Yeni: ${
          (newChannel.topic === null && `Başlık Bulunmuyor`) ||
          `${newChannel.topic}`
        }`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.nsfw !== newChannel.nsfw) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal NSFW Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal NSFW`,
        `Eski: ${(oldChannel.nsfw === false && `Kapalı`) || `Açık`} Yeni: ${
          (newChannel.nsfw === false && `Kapalı`) || `Açık`
        }`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.bitrate !== newChannel.bitrate) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal Bitrate Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Bitrate`,
        `Eski: ${oldChannel.bitrate.toLocaleString()} Yeni: ${newChannel.bitrate.toLocaleString()}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.userLimit !== newChannel.userLimit) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal Kullanıcı Limit Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Kullanıcı Limit`,
        `Eski: ${oldChannel.userLimit} Yeni: ${newChannel.userLimit}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.parent !== newChannel.parent) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal Kategori Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Kategori`,
        `Eski: ${oldChannel.parent} Yeni: ${newChannel.parent}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal Zaman Aşımı Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Yavaş Mod`,
        `Eski: ${oldChannel.rateLimitPerUser} Yeni: ${newChannel.rateLimitPerUser}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldChannel.rtcRegion !== newChannel.rtcRegion) {
    var embed = new MessageEmbed()
      .setAuthor(
        channelLog.executor.tag,
        channelLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Kanal RTC Bölge Güncellendi ${oldChannel}`)
      .setColor(newChannel.guild.me.displayHexColor)
      .addField(
        `Kanalı Düzenleyen Üye`,
        `${channelLog.executor} \`(${channelLog.executor.id})\``
      )
      .addField(
        `Kanal Bölge`,
        `Eski: ${oldChannel.rtcRegion === null && `Bulunamıyor`} Yeni: ${
          newChannel.rtcRegion
        }`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${channelLog.executor.id}\nKanal = ${oldChannel.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  //channelUpdate - Perm #Soon
};

module.exports.conf = {
  name: "channelUpdate",
};
