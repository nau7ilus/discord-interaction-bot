({
  CallbackTypes: {
    Pong: 1,
    ChannelMessageWithSource: 4,
    DeferredChannelMessageWithSource: 5,
    DeferredUpdateMessage: 6,
    UpdateMessage: 7,
    CommandAutocompleteResult: 8,
    Modal: 9,
  },
  CommandTypes: {
    ChatInput: 1,
    User: 2,
    Message: 3,
  },
  replyWithMessage: async (content, options = {}) => {
    // TODO: Add support of embeds
    const { CallbackTypes } = lib.interactions;
    return { type: CallbackTypes.ChannelMessageWithSource, data: { content, ...options } };
  },
});
