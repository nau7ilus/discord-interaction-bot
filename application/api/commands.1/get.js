({
  access: 'public',
  method: () => {
    const commands = [];
    for (const commandName of Object.keys(lib.commands)) {
      if (commandName === 'parent') continue;
      const commandData = lib.commands[commandName].data;
      if (!commandData) continue;
      commands.push(commandData);
    }
    return commands;
  },
});
