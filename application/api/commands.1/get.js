({
  access: 'public',
  method: () => {
    const commands = [];
    for (const fileName of Object.keys(lib.commands)) {
      if (fileName === 'parent') continue;
      const commandData = lib.commands[fileName].data;
      if (!commandData) continue;
      commands.push({ ...commandData, fileName });
    }
    return commands;
  },
});
