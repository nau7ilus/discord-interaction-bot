({
  access: 'public',
  method: async ({ authToken, rawInteraction }) => {
    await lib.auth.checkToken(authToken);
    const interaction = await lib.interactions.parse(rawInteraction);
    const commands = api.commands.get();
    const command = commands.find(({ name }) => name === interaction.data.name);
    if (!command) return { type: lib.interactions.CallbackTypes.ChannelMessageWithSource, data: { content: 'Error ' } };
    return domain.commands[command.fileName].method(interaction);
  },
});
