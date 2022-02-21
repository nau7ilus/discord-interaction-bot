({
  // TODO: Add aliases for commands
  data: {
    name: 'Узнать аватар пользователя',
    type: lib.interactions.CommandTypes.User,
    guildId: '937062460886769674',
  },

  method: () => {
    const { CallbackTypes } = lib.interactions;
    return { type: CallbackTypes.ChannelMessageWithSource, data: { content: `test` } };
  },
});
