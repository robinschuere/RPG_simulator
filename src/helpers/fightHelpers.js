const {
  itemTypes,
  attackTypes,
  options: { attack },
} = require('../constants');
const { systemMessage, arenaStatusMessage } = require('./messages');
const { optionAction } = require('./promptActions');

const avoid = (val) => {
  const randomizer = Math.floor(Math.random() * 100);
  return randomizer >= 100 - val.dodge;
};

const dodged = (val) => {
  // dodgeChance is maxed at 30%;
  const randomizer = Math.floor(Math.random() * 100);
  const chance = 100 - val.dodge > 70;
  const dodgeChance = chance ? 100 - val.dodge : 70;
  return randomizer >= dodgeChance;
};

const deflected = (val) => {
  const randomizer = Math.floor(Math.random() * 100);
  return randomizer <= val.blocked;
};

const hit = (val) => {
  const randomizer = Math.floor(Math.random() * 100);
  if (val.accuracy < 50) {
    return randomizer >= 50;
  } else {
    return randomizer >= 100 - val.accuracy;
  }
};

const physicalHit = (attacker, defender) => {
  if (dodged(defender)) return { type: attackTypes.dodged };
  if (hit(attacker)) {
    const attValue = Math.floor(
      Math.random() * parseInt(attacker.physicalOffence * 0.8, 10),
    );
    const defValue = Math.floor(
      Math.random() * parseInt(defender.physicalDefence * 0.5, 10),
    );
    const hitValue = attValue - defValue;
    if (hitValue < 0) return { type: attackTypes.retaliated, value: -hitValue };
    else {
      if (deflected(defender)) {
        return { type: attackTypes.deflected, value: hitValue };
      }
      return { type: attackTypes.hit, value: hitValue };
    }
  }
  return { type: attackTypes.missed };
};

const arcaneHit = (attacker, defender) => {
  if (dodged(defender)) return { type: attackTypes.dodged };
  if (hit(attacker)) {
    const attValue = Math.floor(Math.random() * (attacker.INT * 0.8));
    const defValue = Math.floor(Math.random() * (defender.WIS * 0.5));
    const hitValue = attValue - defValue;
    if (hitValue < 0)
      return { type: attackTypes.retaliated, value: -parseInt(hitValue, 10) };
    else {
      if (deflected(defender)) {
        return { type: attackTypes.deflected, value: parseInt(hitValue, 10) };
      }
      return { type: attackTypes.hit, value: parseInt(hitValue, 10) };
    }
  }
  return { type: attackTypes.missed };
};

const doAttack = (attacker, defender) => {
  const rollAgainst =
    attacker.offenceType === itemTypes.physical
      ? itemTypes.physicalDefensive
      : itemTypes.arcaneDefensive;
  switch (rollAgainst) {
    case itemTypes.physicalDefensive:
      return physicalHit(attacker, defender);
    case itemTypes.arcaneDefensive:
      return arcaneHit(attacker, defender);
    default:
      throw new Error('Itemtype unexisting');
  }
};

const getDamage = async (round, { auto = false }) => {
  if (round.characterAttack && !auto) {
    const option = await optionAction('What do you do?', attack);

    switch (option.key) {
      case '2':
        return avoid(round.attacker)
          ? { type: attackTypes.avoided }
          : { type: attackTypes.avoidFailed };
      default:
        return doAttack(round.attacker, round.defender);
    }
  }
  return doAttack(round.attacker, round.defender);
};

module.exports = {
  getDamage,
};
