import { BLACK, Board, Turn } from './types';
import { minimax } from './bot/minimax';
import { getLegalMoves } from './moves';

export const main = (board: Board, gameString: string) => {
    const [turn, casteling, _enPassant, _moveCounter] = gameString.split('-');

    const legalMoves = getLegalMoves(board, turn as Turn, casteling, undefined);

    if (turn === BLACK) {
        console.time('minimax');
        console.log('Calculating.....');

        const res = minimax(board, 5, false, -Infinity, Infinity, 5, '', undefined);
        console.log(res);
        console.timeEnd('minimax');

        return { move: res.move, tile: res.tile };
    }

    return legalMoves;
};
