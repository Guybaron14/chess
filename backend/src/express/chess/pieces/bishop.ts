import { checkMove } from '../moves';
import { BISHOP, Board, Move, QUEEN, Turn } from '../types';

export const getBishopMoves = (board: Board, row: number, col: number, turn: Turn, queen = false) => {
    const legalMoves: Move[] = [];

    let i = row + 1;
    let j = col + 1;
    while (i < 8 && j <= 7) {
        if (checkMove(board, legalMoves, i, j, turn, queen ? QUEEN : BISHOP)) {
            break;
        }
        i++;
        j++;
    }

    i = row - 1;
    j = col - 1;
    while (i >= 0 && j >= 0) {
        if (checkMove(board, legalMoves, i, j, turn, queen ? QUEEN : BISHOP)) {
            break;
        }
        i--;
        j--;
    }

    i = row - 1;
    j = col + 1;
    while (i >= 0 && j <= 7) {
        if (checkMove(board, legalMoves, i, j, turn, queen ? QUEEN : BISHOP)) {
            break;
        }
        i--;
        j++;
    }

    i = row + 1;
    j = col - 1;
    while (i <= 7 && j >= 0) {
        if (checkMove(board, legalMoves, i, j, turn, queen ? QUEEN : BISHOP)) {
            break;
        }
        i++;
        j--;
    }

    return legalMoves;
};
