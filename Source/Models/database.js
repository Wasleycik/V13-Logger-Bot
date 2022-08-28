const { Schema, model } = require("mongoose");

const logger = Schema({
  guildID: String,
  logChannelID: String,
  channelChannelID: String,
  guildChannelID: String,
  memberChannelID: String,
  messageChannelID: String,
  roleChannelID: String,
  voiceChannelID: String,
  channelLog: { type: Boolean, default: false },
  guildLog: { type: Boolean, default: false },
  memberLog: { type: Boolean, default: false },
  messageLog: { type: Boolean, default: false },
  roleLog: { type: Boolean, default: false },
  voiceLog: { type: Boolean, default: false },
});

module.exports = model("logger", logger);
