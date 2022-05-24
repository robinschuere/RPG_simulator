const argumentTranslator = (args) => {
  const variables = {};
  const acceptedVariables = ['stall', 'levelboost'];
  const numberArguments = ['stall', 'levelboost'];

  args.forEach((f) => {
    const chars = f.split('=');
    if (chars.length === 2) {
      if (acceptedVariables.includes(chars[0])) {
        const isNumber = numberArguments.includes(chars[0]);
        variables[chars[0]] = isNumber ? parseInt(chars[1], 10) : chars[1];
      }
    } else {
      if (acceptedVariables.includes(f)) {
        variables[f] = true;
      }
    }
  });
  return variables;
};

module.exports = {
  argumentTranslator,
};
