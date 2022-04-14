({
  discordAPI: 'https://discord.com/api/v8',
  guildCommandURL: (guildID) =>
    `${lib.constants.discordAPI}/applications/${process.env.APPLICATION_ID}/guilds/${guildID}/commands`,
  globalCommandURL: () => `${lib.constants.discordAPI}/applications/${process.env.APPLICATION_ID}/commands`,
});
