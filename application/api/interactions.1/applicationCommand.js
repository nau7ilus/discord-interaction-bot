({
  access: 'public',
  method: ({ authToken, rawInteraction }) => {
    if (!lib.auth.checkToken(authToken)) return new Error('Invalid auth token', 401);
    const interaction = lib.util.objectToCamel(rawInteraction);
    const commands = api.commands.get();
    const command = commands.find(({ name }) => name === interaction.data.name);
    if (!command) return lib.interactions.replyWithMessage('Command not found');
    return domain.commands[command.fileName].method(interaction);
  },
});
