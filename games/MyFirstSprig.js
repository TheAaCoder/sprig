/*
@title: getting_started
@tags: ['beginner', 'tutorial']
@addedOn: 2022-07-26
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const enemy = "e"
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [enemy, bitmap`
.........
..77777..
.7777777.
.7777777.
..77777..
.........
`]

);
const melody = tune`
145.27845036319613,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: A4-72.63922518159806,
72.63922518159806: B4^72.63922518159806,
72.63922518159806: A4-72.63922518159806 + B4~72.63922518159806,
72.63922518159806: A4-72.63922518159806 + B4~72.63922518159806,
72.63922518159806: A4-72.63922518159806 + B4~72.63922518159806,
72.63922518159806: A4-72.63922518159806 + B4~72.63922518159806,
72.63922518159806: A4-72.63922518159806 + B4~72.63922518159806`
const win = tune`
108.69565217391305: A4-108.69565217391305,
108.69565217391305: A4-108.69565217391305,
108.69565217391305: A4-108.69565217391305,
108.69565217391305: A4-108.69565217391305,
108.69565217391305: A4-108.69565217391305,
108.69565217391305: A4-108.69565217391305,
108.69565217391305: B4/108.69565217391305,
108.69565217391305: C5^108.69565217391305,
108.69565217391305: B4/108.69565217391305,
108.69565217391305: C5^108.69565217391305,
108.69565217391305: B4/108.69565217391305,
108.69565217391305: B4~108.69565217391305,
2173.913043478261`
// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p..g
.b..
..e.
....`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall, enemy]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});
const playback = playTune(melody, Infinity)
function enemyLoop() {
  // inputs for player movement control


  // these get run after every input
  
  getAll(enemy).forEach(enemy => {
    enemy.y -= 1; // Update the position of the enemy sprite
  });
}
setInterval(enemyLoop, 1000)
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards

});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {

    // count the number of tiles with goals
    const targetNumber = tilesWith(goal).length;

    // count the number of tiles with goals and boxes
    const numberCovered = tilesWith(goal, box).length;

    // if the number of goals is the same as the number of goals covered
    // all goals are covered and we can go to the next level
    if (numberCovered === targetNumber) {
      // increase the current level number
      level = level + 1;

      const currentLevel = levels[level];

      // make sure the level exists and if so set the map
      // otherwise, we have finished the last level, there is no level
      // after the last level
      if (currentLevel !== undefined) {
        setMap(currentLevel);

      } else {
        addText("you win!", { y: 4, color: color`3` });
        playback.end()
        playTune(win)
      }
    }
  });