const { Permissions } = require("discord.js");
const database = require("../Models/database");

module.exports = {
  name: "log",
  description: "Tek tek ayarlamak yerine bütün komutlara tek bir log ayarlamanıza yarar.",
  guildOnly: true,
  async execute(message, args, bot) {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[1]);
    const guildData = await database.findOne({ guildID: message.guild.id });

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.reply({
        content: `Bu komutu kullanmak için iznin yeterli değil.`,
      });

    if (args[0] === "ayarla" || args[0] === "set") {
      if (!channel)
        return message.reply({
          content: `Ayarlamak için kanal etiketle veya ID'sini yazmalısın.`,
        });

        await database
        .findOneAndUpdate(
          { guildID: message.guild.id },
          {
            $set: {
              logChannelID: channel.id,
            },
          },
          { upsert: true }
        )
        .then(async () => {
          message.reply({ content: `Başarılı log kanalını ayarlandın.` });
        });
    } else {

    if (args[0] === "sıfırla" || args[0] === "reset") {
      if (guildData && guildData.logChannelID) {
        await database
          .findOneAndUpdate(
            { guildID: message.guild.id },
            {
              $unset: {
                logChannelID: ""
              },
            },
            { upsert: true }
          )
          .then(() => {
            message.reply({ content: `Başarılı log kanalını sıfırladın.` });
          });
      } else {
        message.reply({
          content: `Log kanalı zaten ayarlı değil sıfırlayamazsın.`,
        });
      }
    } else {
      return message.reply({
        content: `Geçersiz argüman (ayarla, sıfırla) yazabilirsin.`,
      });
    }
    }
  },
};
