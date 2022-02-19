({
  access: 'public',
  method: async ({ authToken }) => {
    await lib.auth.checkToken(authToken);
    return { type: lib.interactions.CallbackTypes.Pong };
  },
});
