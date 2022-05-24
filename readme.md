# name to be defined

How to play:
- `yarn`
- `yarn run play`

## How to create items?
add a new file under the folder items
make sure the item returns a function that returns an object. This to make it possible to create more variation in items depending on the character given.

## How to create enemies?
Enemies are created under a location file holding said enemies. (A location holds enemies)

## How to create story / quest?

=> a story is added through updating the characters stage and location.
At this moment, 3 stages are available
- introduction. ()
- idle (for step choices)
- training (for fighting)

## How to progress
=> The character (meaning the player) is able to do stuff
=> Stuff selection is for whenever a player is at a location in a certain stage. With the adding of locations, you can attain different steps.

## progressing ones character
=> it is possible to update a character through the function elevateCharacterStatistics.
=> This works with every statistic (STR, DEF, ...)
=> EXP is always handled as the last statistic for raising a level. (Raising a level will halt the process since the player should be able to select 3 stats to raise.)
=> This way, quests and or items can give a raise on a ststatisticat undependant of leveling.