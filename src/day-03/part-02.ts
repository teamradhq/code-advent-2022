import { getInput } from '@src/lib';
import { mapInput } from '@src/day-02/part-01';


const score = {
  pieces: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
  outcomes: {
    lose: 0,
    draw: 3,
    win: 6,
  },
};

type Score = typeof score;
type PieceKey = keyof Score['pieces'];
type OutcomeKey = keyof Score['outcomes'];

function calculate(outcome: OutcomeKey, piece: PieceKey): number {
  return score.pieces[piece] + score.outcomes[outcome];
}

const results = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

type ResultRecord = Record<'X' | 'Y' | 'Z', number>;

const resultScores: Record<'A' | 'B' | 'C', ResultRecord> = {
  A: { // Rock
    X: calculate('lose', 'scissors'),
    Y: calculate('draw', 'rock'),
    Z: calculate('win', 'paper'),
  },
  B: { // paper
    X: calculate('lose', 'rock'),
    Y: calculate('draw', 'paper'),
    Z: calculate('win', 'scissors'),
  },
  C: { // scissors
    X: calculate('lose', 'paper'),
    Y: calculate('draw', 'scissors'),
    Z: calculate('win', 'rock'),
  },
};

if (require.main === module) {

  const result = mapInput(getInput(__dirname))
    .map(([a, b]) => resultScores[a][b])
    .reduce((sum, score) => sum + score, 0);

  console.log(result);
}
