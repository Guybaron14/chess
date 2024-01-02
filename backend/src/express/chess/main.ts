import { BLACK, Board, Turn } from './types';
import { minimax } from './bot/minimax';
import { getLegalMoves } from './moves';
import { evaluate } from './bot/evaluate';
import { handleOpening } from './openings';

const DEPTH = 6;
const GREEDINESS = 1000;

export const main = (board: Board, gameString: string) => {
    const [turn, casteling, _enPassant, _moveCounter] = gameString.split('-');

    const legalMoves = getLegalMoves(board, turn as Turn, casteling, _enPassant );
    const legalMoves2 = {};

    for (const move of Object.keys(legalMoves)) {
        legalMoves2[move] = legalMoves[move].map((move) => move.move);
    }

    if (turn === BLACK) {
        const opening = handleOpening(board);
        if (opening) return opening;

        console.time('minimax');
        console.log('Calculating.....');

        const currentEvaluation = evaluate(board);

        let lastRes = minimax(
            board,
            DEPTH,
            false,
            -Infinity,
            Infinity,
            DEPTH,
            Math.abs(currentEvaluation) + GREEDINESS,
            casteling,
            undefined,
        );

        let count = 0;
        let lastTile = lastRes.tile;
        let lastMove = lastRes.move;

        while (lastRes.evaluation === -Infinity) {
            count++;
            lastTile = lastRes.tile;
            lastMove = lastRes.move;

            lastRes = minimax(
                board,
                DEPTH - count,
                false,
                -Infinity,
                Infinity,
                DEPTH - count,
                Math.abs(currentEvaluation) + GREEDINESS,
                '',
                undefined,
            );
        }

        console.log({ move: lastMove, tile: lastTile });
        console.timeEnd('minimax');

        return { move: lastMove, tile: lastTile };
    }

    return legalMoves2;
};
