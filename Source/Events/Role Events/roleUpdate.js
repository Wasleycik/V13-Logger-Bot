const { MessageEmbed } = require("discord.js");
const database = require("../../Models/database");
const bot = global.client;

module.exports = async (oldRole, newRole) => {
  var guildData = await database.findOne({ guildID: oldRole.guild.id });

  if (guildData && guildData.roleLog == false) return;

  var logChannel =
    oldRole.guild.channels.cache.get(guildData && guildData.logChannelID) ||
    oldRole.guild.channels.cache.get(guildData && guildData.roleChannelID);

  if (!logChannel) return;

  var fetchedLogs = await newRole.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_UPDATE",
  });

  var roleLog = fetchedLogs.entries.first();

  var perms = {
    CREATE_INSTANT_INVITE: "CREATE_INSTANT_INVITE",
    KICK_MEMBERS: "KICK_MEMBERS",
    BAN_MEMBERS: "BAN_MEMBERS",
    ADMINISTRATOR: "ADMINISTRATOR",
    MANAGE_CHANNELS: "MANAGE_CHANNELS",
    MANAGE_GUILD: "MANAGE_GUILD",
    ADD_REACTIONS: "ADD_REACTIONS",
    VIEW_AUDIT_LOG: "VIEW_AUDIT_LOG",
    PRIORITY_SPEAKER: "PRIORITY_SPEAKER",
    STREAM: "STREAM",
    VIEW_CHANNEL: "VIEW_CHANNEL",
    SEND_MESSAGES: "SEND_MESSAGES",
    SEND_TTS_MESSAGES: "SEND_TTS_MESSAGES",
    MANAGE_MESSAGES: "MANAGE_MESSAGES",
    EMBED_LINKS: "EMBED_LINKS",
    ATTACH_FILES: "ATTACH_FILES",
    READ_MESSAGE_HISTORY: "READ_MESSAGE_HISTORY",
    MENTION_EVERYONE: "MENTION_EVERYONE",
    USE_EXTERNAL_EMOJIS: "USE_EXTERNAL_EMOJIS",
    VIEW_GUILD_INSIGHTS: "VIEW_GUILD_INSIGHTS",
    CONNECT: "CONNECT",
    SPEAK: "SPEAK",
    MUTE_MEMBERS: "MUTE_MEMBERS",
    DEAFEN_MEMBERS: "DEAFEN_MEMBERS",
    MOVE_MEMBERS: "MOVE_MEMBERS",
    USE_VAD: "USE_VAD",
    CHANGE_NICKNAME: "CHANGE_NICKNAME",
    MANAGE_NICKNAMES: "MANAGE_NICKNAMES",
    MANAGE_ROLES: "MANAGE_ROLES",
    MANAGE_WEBHOOKS: "MANAGE_WEBHOOKS",
    MANAGE_EMOJIS_AND_STICKERS: "MANAGE_EMOJIS_AND_STICKERS",
    USE_APPLICATION_COMMANDS: "USE_APPLICATION_COMMANDS",
    REQUEST_TO_SPEAK: "REQUEST_TO_SPEAK",
    MANAGE_THREADS: "MANAGE_THREADS",
    USE_PUBLIC_THREADS: "USE_PUBLIC_THREADS",
    CREATE_PUBLIC_THREADS: "CREATE_PUBLIC_THREADS",
    USE_PRIVATE_THREADS: "USE_PRIVATE_THREADS",
    CREATE_PRIVATE_THREADS: "CREATE_PRIVATE_THREADS",
    USE_EXTERNAL_STICKERS: "USE_EXTERNAL_STICKERS",
    SEND_MESSAGES_IN_THREADS: "SEND_MESSAGES_IN_THREADS",
    START_EMBEDDED_ACTIVITIES: "START_EMBEDDED_ACTIVITIES",
  };

  if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
    const oldPermissions = newRole.permissions
      .toArray()
      .filter((x) => !oldRole.permissions.toArray().includes(x));

    const newPermissions = oldRole.permissions
      .toArray()
      .filter((x) => !newRole.permissions.toArray().includes(x));

    var embed = new MessageEmbed()
      .setAuthor(
        roleLog.executor.tag,
        roleLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Rol İzini Güncellendi \`${newRole.name}\``)
      .setColor(newRole.guild.me.displayHexColor)
      .addField(
        `Rolü Düzenleyen Üye`,
        `${roleLog.executor} \`(${roleLog.executor.id})\``
      )
      .addField(
        `Eklenen İzinler`,
        `\`\`\`diff\n${
          oldPermissions.map((perm) => `+ ${perms[perm]}`).join("\n") ||
          `Hiç bir izin eklenmemiş!`
        }\n\`\`\``
      )
      .addField(
        `Çıkartılan İzinler`,
        `\`\`\`diff\n${
          newPermissions.map((perm) => `- ${perms[perm]}`).join("\n") ||
          `Hiç bir izin çıkartılmamış!`
        }\n\`\`\``
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${oldRole.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldRole.name !== newRole.name) {
    var embed = new MessageEmbed()
      .setAuthor(
        roleLog.executor.tag,
        roleLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Rol İsmi Güncellendi \`${oldRole.name}\``)
      .setColor(newRole.guild.me.displayHexColor)
      .addField(
        `Rolü Düzenleyen Üye`,
        `${roleLog.executor} \`(${roleLog.executor.id})\``
      )
      .addField(`Rol İsmi`, `Eski: ${oldRole.name} Yeni: ${newRole.name}`)
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${oldRole.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldRole.hexColor !== newRole.hexColor) {
    var embed = new MessageEmbed()
      .setAuthor(
        roleLog.executor.tag,
        roleLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Rol Rengi Güncellendi \`${oldRole.name}\``)
      .setColor(newRole.guild.me.displayHexColor)
      .addField(
        `Rolü Düzenleyen Üye`,
        `${roleLog.executor} \`(${roleLog.executor.id})\``
      )
      .addField(
        `Rol Rengi`,
        `Eski: ${oldRole.hexColor} Yeni: ${newRole.hexColor}`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${oldRole.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldRole.hoist !== newRole.hoist) {
    var embed = new MessageEmbed()
      .setAuthor(
        roleLog.executor.tag,
        roleLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Rol Güncellendi \`${oldRole.name}\``)
      .setColor(newRole.guild.me.displayHexColor)
      .addField(
        `Rolü Düzenleyen Üye`,
        `${roleLog.executor} \`(${roleLog.executor.id})\``
      )
      .addField(
        `Rolü Üyelerden Ayrı Göster`,
        `Eski: ${(oldRole.hoist === false && `Kapalı`) || `Açık`} Yeni: ${
          (newRole.hoist === false && `Kapalı`) || `Açık`
        }`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${oldRole.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }

  if (oldRole.mentionable !== newRole.mentionable) {
    var embed = new MessageEmbed()
      .setAuthor(
        roleLog.executor.tag,
        roleLog.executor.avatarURL({ dynamic: true })
      )
      .setDescription(`Rol Bahsedilebilirliği Güncellendi \`${oldRole.name}\``)
      .setColor(newRole.guild.me.displayHexColor)
      .addField(
        `Rolü Düzenleyen Üye`,
        `${roleLog.executor} \`(${roleLog.executor.id})\``
      )
      .addField(
        `Rol Bahsedilebilirliği`,
        `Eski: ${(oldRole.mentionable === false && `Kapalı`) || `Açık`} Yeni: ${
          (newRole.mentionable === false && `Kapalı`) || `Açık`
        }`
      )
      .addField(
        `Düzenlendiği Zaman`,
        "<t:" + Math.floor(Date.now() / 1000) + ":F>"
      )
      .addField(
        `ID`,
        `\`\`\`\nKullanıcı = ${roleLog.executor.id}\nRol = ${oldRole.id}\n\`\`\``
      )
      .setFooter(
        `${bot.user.username}#${bot.user.discriminator}`,
        bot.user.avatarURL()
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  }
};

module.exports.conf = {
  name: "roleUpdate",
};
