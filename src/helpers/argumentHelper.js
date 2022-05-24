const argumentTranslator = (args) => {
  const variables = {};
  const acceptedVariables = [
    '--stall', '-s', 
    '--no-clear', '-c', 
    '--help', '-h',
    '--auto', '-a',
  ];

  args.forEach((f) => {
    const chars = f.split('=');
    if (acceptedVariables.includes(f)) {
      if (['--stall', '-s'].includes(f)) {
        variables.stall = 0.1;
      }
      if (['--no-clear', '-c'].includes(f)) {
        variables.doNotCleanConsole = true;
      }
      if (['--help', '-h'].includes(f)) {
        variables.help = true;
      } 
      if (['--auto', '-a'].includes(f)) {
        variables.auto = true;
      } 
    }
  });
  return variables;
};

module.exports = {
  argumentTranslator,
};
