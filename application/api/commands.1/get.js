({
  access: 'public',
  method: () => {
    const commands = [];
    for (const fileName of Object.keys(domain.commands)) {
      if (fileName === 'parent') continue;
      const commandData = domain.commands[fileName].data;
      if (!commandData) continue;
      commands.push({ ...commandData, fileName });
    }
    return commands;
  },
});
