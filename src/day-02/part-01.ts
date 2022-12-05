import { getInput } from '@src/lib';

/**
 * Parse the value to choice index.
 */
const memo = {
  A: 0, // 'Rock',
  X: 0, // 'Rock',
  B: 1, // 'Paper',
  Y: 1, // 'Paper',
  C: 2, // 'Scissors',
  Z: 2, // 'Scissors',
};

const draws = [
  'A X', // rock
  'B Y', // paper
  'C Z', // scissors
];

const losses = [
  'B X', // paper beats rock
  'C Y', // scissor beats paper
  'A Z', // rock beats scissor
];

const wins = [
  'B Z', // paper loses to scissors
  'C X', // scissor loses to rock
  'A Y', // rock loses to paper
];

const choiceScores = [
  1, // Rock
  2, // Paper
  3, // Scissors
];

const scores = {
  // Draws
  'A X': 1 + 3, // rock
  'B Y': 2 + 3, // paper
  'C Z': 3 + 3, // scissors
  // Losses
  'B X': 1, // paper beats rock
  'C Y': 2, // scissor beats paper
  'A Z': 3, // rock beats scissor
  // Wins
  'B Z': 3 + 6, // paper loses to scissors
  'C X': 1 + 6, // scissor loses to rock
  'A Y': 2 + 6, // rock loses to paper
};


type Memo = typeof memo;
type MemoKey = keyof Memo;
type MemoValue = Memo[keyof Memo];
type GameInput = [MemoKey, MemoKey];

type ScoreMemo = typeof scores;
type ScoreResult = keyof ScoreMemo;
type ScoreValue = ScoreMemo[ScoreResult];

export function mapInput(input: string) {
  return input.split('\n')
    .filter(Boolean)
    .map((row) => (
      row.split(' ')
    ));
}

function normaliseChoices(input: string) {
  return input.split('\n')
    .filter(Boolean)
    .map((result: ScoreResult) => scores[result]);
}


function main() {
  const games = normaliseChoices(getInput(__dirname));

  console.log(games);

  const total = games.reduce((sum, game) => sum + game, 0);

  console.log(total);

}


if (require.main === module) {
  main();
}
