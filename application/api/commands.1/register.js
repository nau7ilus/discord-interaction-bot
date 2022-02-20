({
  access: 'public',
  method: async ({ authToken }) => {
    await lib.auth.checkToken(authToken);
    const commands = api.commands.get();
    const errored = [];
    for await (const command of commands) {
      const { guildCommandURL, globalCommandURL } = lib.constants;
      const url = command.guildID ? guildCommandURL(command.guildID) : globalCommandURL();
      const discordResponse = await lib.network.discordFetch(url, body, 'POST');
      if (discordResponse.id) console.info(`Registered command: ${command.name}`);
      else errored.push(command);
    }
    if (errored.length > 0) console.error('Errored commands:', errored.map(({ name }) => name).join(', '));
    return { success: true, registredAmount: commands.length - errored.length };
  },
});
