({
  access: 'public',
  method: ({ authToken }) => {
    if (!lib.auth.checkToken(authToken)) return new Error('Invalid auth token', 401);
    return { type: lib.interactions.CallbackTypes.Pong };
  },
});
