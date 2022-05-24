const {
  itemTypes,
  attackTypes,
  lists: { attack },
} = require('../constants');
const { systemMessage } = require('./messages');
const { optionAction } = require('./promptActions');

const avoid = (val) => {
  const randomizer = Math.floor(Math.random() * 100);
  return randomizer >= 100 - val.dodge;
};

const dodged = (val) => {
  // dodgeChance is maxed at 30%;
  const randomizer = Math.floor(Math.random() * 100);
  const dodgeChance = 100 - val.dodge > 70 ? 100 - val.dodge : 70;
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

const physicalHit = (att, def) => {
  if (dodged(def)) return { type: attackTypes.dodged };
  if (hit(att)) {
    const attValue = Math.floor(
      Math.random() * parseInt(att.physicalOffence * 0.8, 10),
    );
    const defValue = Math.floor(
      Math.random() * parseInt(def.physicalDefence * 0.5, 10),
    );
    const hitValue = attValue - defValue;
    if (hitValue < 0) return { type: attackTypes.retaliated, value: -hitValue };
    else {
      if (deflected(def)) {
        return { type: attackTypes.deflected, value: hitValue };
      }
      return { type: attackTypes.hit, value: hitValue };
    }
  }
  return { type: attackTypes.missed };
};

const arcaneHit = (att, def) => {
  if (dodged(def)) return { type: attackTypes.dodged };
  if (hit(att)) {
    const attValue = Math.floor(Math.random() * (att.INT * 0.8));
    const defValue = Math.floor(Math.random() * (def.WIS * 0.5));
    const hitValue = attValue - defValue;
    if (hitValue < 0)
      return { type: attackTypes.retaliated, value: -parseInt(hitValue, 10) };
    else {
      if (deflected(def)) {
        return { type: attackTypes.deflected, value: parseInt(hitValue, 10) };
      }
      return { type: attackTypes.hit, value: parseInt(hitValue, 10) };
    }
  }
  return { type: attackTypes.missed };
};

const doAttack = (att, def) => {
  const rollAgainst =
    att.offenceType === itemTypes.physical
      ? itemTypes.physicalDefensive
      : itemTypes.arcaneDefensive;
  switch (rollAgainst) {
    case itemTypes.physicalDefensive:
      return physicalHit(att, def);
    case itemTypes.arcaneDefensive:
      return arcaneHit(att, def);
    default:
      throw new Error('Itemtype unexisting');
  }
};

const getDamage = async (requester) => {
  if (requester.characterAttack && !requester.auto) {
    const option = await optionAction('What do you do?', attack);
    switch (option.key) {
      case 'A':
        requester.auto = true;
        systemMessage('You cannot intervene anymore in this fight.');
        return doAttack(requester.att, requester.def);
      case '2':
        return avoid(requester.att)
          ? { type: attackTypes.avoided }
          : { type: attackTypes.avoidFailed };
      default:
        return doAttack(requester.att, requester.def);
    }
  }
  return doAttack(requester.att, requester.def);
};

module.exports = {
  getDamage,
};
