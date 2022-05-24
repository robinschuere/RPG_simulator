const { attackTypes, statistics, fightStallTime } = require('../constants');
const { elevateCharacterStatistics } = require('../helpers/characterHelpers');
const { getCharacterStatistics } = require('../helpers/combatHelpers');
const { getDamage } = require('../helpers/fightHelpers');
const { getItem } = require('../helpers/itemHelpers');
const { addDropToInventory } = require('../helpers/inventoryHelpers');
const {
  arenaAnyMessage,
  arenaDamageMessage,
  arenaStatusMessage,
  systemMessage,
} = require('../helpers/messages');
const staller = require('../helpers/staller');

const attainAttackerAndDefender = (character, enemy) => {
  if (character.SPD === enemy.SPD) {
    const randomizer = Math.floor(Math.random() * 100);
    if (randomizer <= 50) {
      return {
        att: character,
        def: enemy,
        characterAttack: true,
      };
    }
    return {
      att: enemy,
      def: character,
      characterAttack: false,
    };
  }
  return character.SPD > enemy.SPD
    ? { att: character, def: enemy, characterAttack: true }
    : { att: enemy, def: character, characterAttack: false };
};

const defineDrop = ({ drops = [] }) => {
  const chanceCounter = {};
  drops.forEach(({ chance, ...rest }) => {
    const firstKey = Object.keys(chanceCounter).length;
    for (let i = 0; i < chance; i++) {
      const key = firstKey + i;
      chanceCounter[key] = { ...rest };
    }
  });
  const randomizer = Math.floor(
    Math.random() * Object.keys(chanceCounter).length,
  );
  return chanceCounter[randomizer];
};

const getMoment = (v) =>
  `${v.name} HP: ${v.HP >= 0 ? v.HP : 0}/${v.MAXHP} | MANA ${
    v.MANA >= 0 ? v.MANA : 0
  }/${v.MAXMANA}`;

const getArenaStatus = (val) => {
  console.log();
  arenaStatusMessage(
    val.characterAttack
      ? `${getMoment(val.att)} ( VS ) ${getMoment(val.def)}`
      : `${getMoment(val.def)} ( VS ) ${getMoment(val.att)}`,
  );
  console.log();
};

const endFight = async (character, enemy, val) => {
  const characterIsDead = val.characterAttack
    ? val.att.HP <= 0
    : val.def.HP <= 0;
  if (characterIsDead) {
    character.stage = 'death';
    character.location = 'deathOffice';
  } else {
    character.HP = val.characterAttack ? val.att.HP : val.def.HP;
    const drop = defineDrop(enemy);
    const item = getItem(character, drop.name);
    const name = val.characterAttack ? val.def.name : val.att.name;
    const plural = drop.amount > 1 ? 's' : '';
    addDropToInventory(character, drop);

    console.log();
    arenaStatusMessage(`Hooray. You have defeated the ${name}!`);
    arenaStatusMessage(
      `The ${name} drops ${drop.amount} ${item.name}${plural}`,
    );
    arenaStatusMessage(`You receive ${enemy.experience} experience ...`);

    await elevateCharacterStatistics(character, [
      { statName: statistics.EXP, value: enemy.experience },
    ]);
  }
};

const switchPlaces = (val) => {
  if (parseInt(val.att.SPD / val.def.SPD) > 2) {
    arenaStatusMessage(
      `Because of an immence difference in speed, ${
        val.characterAttack ? 'you can attack again' : 'you are attacked again.'
      }`,
    );
    const randomizer = Math.floor(Math.random() * 100);
    if (randomizer >= 90) {
      return;
    }
  }

  const oldAttacker = { ...val.att };
  const oldDefender = { ...val.def };

  val.att = oldDefender;
  val.def = oldAttacker;
  val.characterAttack = !val.characterAttack;
};

const runFight = async (character, enemy, options) => {
  const characterValues = getCharacterStatistics(character);
  const enemyValues = getCharacterStatistics(enemy);

  const requester = attainAttackerAndDefender(characterValues, enemyValues);
  getArenaStatus(requester);
  let sequence = true;

  const doNextAttack = async (val) => {
    getArenaStatus(val);
    await staller(options.stall || fightStallTime);
    const isFight = val.att.HP > 0 && val.def.HP > 0;
    if (!isFight) {
      await endFight(character, enemy, val);
      sequence = false;
      return;
    }
    switchPlaces(val);
  };

  systemMessage(
    `You encounter a ${
      requester.characterAttack ? requester.def.name : requester.att.name
    }`,
  );
  while (sequence) {
    const damage = await getDamage(requester, options);

    switch (damage.type) {
      case attackTypes.dodged:
        arenaAnyMessage(
          requester.characterAttack
            ? `You attack the ${requester.def.name} but it dodges you.`
            : `The ${requester.att.name} attacks you, but you manage to dodge the attack.`,
        );
        await doNextAttack(requester);
        break;
      case attackTypes.missed:
        arenaAnyMessage(
          requester.characterAttack
            ? `You attack but miss the ${requester.def.name}.`
            : `The ${requester.att.name} attacks but misses you.`,
        );
        await doNextAttack(requester);
        break;
      case attackTypes.hit:
        arenaDamageMessage(
          requester.characterAttack
            ? `You manage to land a hit on the ${requester.def.name} for ${damage.value} HP.`
            : `The ${requester.att.name} damages you for ${damage.value} HP.`,
        );
        requester.def.HP -= parseInt(damage.value, 10);
        await doNextAttack(requester);
        break;
      case attackTypes.deflected:
        const deflected = parseInt(damage.value * 0.15, 10);
        arenaDamageMessage(
          requester.characterAttack
            ? `You manage to land a hit on the ${requester.def.name} for ${damage.value} HP, somehow it deflects ${deflected} HP.`
            : `The ${requester.att.name} hits you for ${damage.value} HP. You manage to deflect ${deflected} HP.`,
        );
        requester.def.HP -= damage.value;
        requester.att.HP -= deflected;
        await doNextAttack(requester);
        break;
      case attackTypes.avoided:
        arenaAnyMessage(
          `Instead of attacking, you turn yourself around and start running. You succesfully avoid the combat.`,
        );
        sequence = false;
        break;
      case attackTypes.avoidFailed:
        const failDamage = parseInt(requester.att.maxHealth * 0.1, 10);
        arenaDamageMessage(
          `While trying to run away, the ${requester.def.name} hits you on the back for ${failDamage} HP`,
        );
        requester.att.HP -= failDamage;
        await doNextAttack(requester);
        break;
      case attackTypes.retaliated:
        arenaDamageMessage(
          requester.characterAttack
            ? `You stumble during your attack. The ${requester.def.name} sees a chance to hit you for ${damage.value} HP.`
            : `The ${requester.att.name} stumbles. You use the chance and hit ${damage.value} HP.`,
        );
        requester.att.HP -= damage.value;
        await doNextAttack(requester);
        break;
    }
  }
};

module.exports = {
  runFight,
};
