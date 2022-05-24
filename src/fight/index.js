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

const defineFirstRound = (character, enemy) => {
  if (character.SPD === enemy.SPD) {
    const randomizer = Math.floor(Math.random() * 100);
    return {
      attacker: randomizer <= 50 ? character : enemy,
      defender: randomizer <= 50 ? enemy : character,
      characterAttack: randomizer <= 50,
    };
  }
  return {
    attacker: character.SPD > enemy.SPD ? character : enemy,
    defender: character.SPD > enemy.SPD ? enemy : character,
    characterAttack: character.SPD > enemy.SPD,
  };
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

const endFight = async (character, enemy, val) => {
  const characterIsDead = val.characterAttack
    ? val.attacker.HP <= 0
    : val.defender.HP <= 0;
  if (characterIsDead) {
    character.stage = 'death';
    character.location = 'deathOffice';
  } else {
    character.HP = val.characterAttack ? val.attacker.HP : val.defender.HP;
    const drop = defineDrop(enemy);
    const item = getItem(character, drop.name);
    const name = val.characterAttack ? val.defender.name : val.attacker.name;
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
  if (parseInt(val.attacker.SPD / val.defender.SPD) > 2) {
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

  const oldAttacker = { ...val.attacker };
  const oldDefender = { ...val.defender };

  val.attacker = oldDefender;
  val.defender = oldAttacker;
  val.characterAttack = !val.characterAttack;
};

const getArenaStatus = (round) => {
  arenaStatusMessage(
    round.characterAttack
      ? `${getMoment(round.attacker)} ( VS ) ${getMoment(round.defender)}`
      : `${getMoment(round.defender)} ( VS ) ${getMoment(round.attacker)}`,
  );
};

const runFight = async (character, enemy, options) => {
  systemMessage(`You encounter a ${enemy.name}\n\n`);

  const characterValues = getCharacterStatistics(character);
  const enemyValues = getCharacterStatistics(enemy);

  const round = defineFirstRound(characterValues, enemyValues);
  
  let sequence = true;

  const doNextAttack = async () => {
    await staller(options.stall || fightStallTime);
    const isFight = round.attacker.HP > 0 && round.defender.HP > 0;
    if (!isFight) {
      await endFight(character, enemy, round);
      sequence = false;
      return;
    }
    switchPlaces(round);
  };

  while (sequence) {
    const damage = await getDamage(round, options);
    if (round.characterAttack) {
      console.clear();
      console.log();
      getArenaStatus(round);
      console.log();
    }
    switch (damage.type) {
      case attackTypes.dodged:
        arenaAnyMessage(
          round.characterAttack
            ? `You attack the ${round.defender.name} but it dodges you.`
            : `The ${round.attacker.name} attacks you, but you manage to dodge the attack.`,
        );
        await doNextAttack(round);
        break;
      case attackTypes.missed:
        arenaAnyMessage(
          round.characterAttack
            ? `You attack but miss the ${round.defender.name}.`
            : `The ${round.attacker.name} attacks but misses you.`,
        );
        await doNextAttack(round);
        break;
      case attackTypes.hit:
        arenaDamageMessage(
          round.characterAttack
            ? `You manage to land a hit on the ${round.defender.name} for ${damage.value} HP.`
            : `The ${round.attacker.name} damages you for ${damage.value} HP.`,
        );
        round.defender.HP -= parseInt(damage.value, 10);
        await doNextAttack(round);
        break;
      case attackTypes.deflected:
        const deflected = parseInt(damage.value * 0.15, 10);
        arenaDamageMessage(
          round.characterAttack
            ? `You manage to land a hit on the ${round.defender.name} for ${damage.value} HP, somehow it deflects ${deflected} HP.`
            : `The ${round.attacker.name} hits you for ${damage.value} HP. You manage to deflect ${deflected} HP.`,
        );
        round.defender.HP -= damage.value;
        round.attacker.HP -= deflected;
        await doNextAttack(round);
        break;
      case attackTypes.avoided:
        arenaAnyMessage(
          `Instead of attacking, you turn yourself around and start running. You succesfully avoid the combat.`,
        );
        sequence = false;
        break;
      case attackTypes.avoidFailed:
        const failDamage = parseInt(round.attacker.MAXHP * 0.1, 10);
        arenaDamageMessage(
          `While trying to run away, the ${round.defender.name} hits you on the back for ${failDamage} HP`,
        );
        round.attacker.HP -= failDamage;
        await doNextAttack(round);
        break;
      case attackTypes.retaliated:
        arenaDamageMessage(
          round.characterAttack
            ? `You stumble during your attack. The ${round.defender.name} sees a chance to hit you for ${damage.value} HP.`
            : `The ${round.attacker.name} stumbles. You use the chance and hit ${damage.value} HP.`,
        );
        round.attacker.HP -= damage.value;
        await doNextAttack(round);
        break;
    }
  }
};

module.exports = {
  runFight,
};
