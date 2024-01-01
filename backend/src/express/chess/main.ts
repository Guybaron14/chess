import { BLACK, Board, Turn } from './types';
import { minimax } from './bot/minimax';
import { getLegalMoves } from './moves';
import { evaluate } from './bot/evaluate';

const DEPTH = 6;
const GREEDINESS = 1000;

export const main = (board: Board, gameString: string) => {
    const [turn, casteling, _enPassant, _moveCounter] = gameString.split('-');

    const legalMoves = getLegalMoves(board, turn as Turn, casteling);
    const legalMoves2 = {};

    for (const move of Object.keys(legalMoves)) {
        legalMoves2[move] = legalMoves[move].map((move) => move.move);
    }

    if (turn === BLACK) {
        console.time('minimax');
        console.log('Calculating.....');

        const currentEvaluation = evaluate(board);

        const res = minimax(
            board,
            DEPTH,
            false,
            -Infinity,
            Infinity,
            DEPTH,
            Math.abs(currentEvaluation) + GREEDINESS,
            '',
            undefined,
        );
        console.log(res);
        console.timeEnd('minimax');

        return { move: res.move, tile: res.tile };
    }

    return legalMoves2;
};
