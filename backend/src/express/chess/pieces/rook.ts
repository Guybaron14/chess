import { checkMove } from '../moves';
import { Board, Move, QUEEN, ROOK, Turn } from '../types';

export const getRookMoves = (board: Board, row: number, col: number, turn: Turn, queen = false) => {
    const legalMoves: Move[] = [];

    for (let index = row + 1; index < 8; index++) {
        if (checkMove(board, legalMoves, index, col, turn, queen ? QUEEN : ROOK)) break;
    }

    for (let index = row - 1; index >= 0; index--) {
        if (checkMove(board, legalMoves, index, col, turn, queen ? QUEEN : ROOK)) break;
    }

    for (let index = col + 1; index < 8; index++) {
        if (checkMove(board, legalMoves, row, index, turn, queen ? QUEEN : ROOK)) break;
    }

    for (let index = col - 1; index >= 0; index--) {
        if (checkMove(board, legalMoves, row, index, turn, queen ? QUEEN : ROOK)) break;
    }

    return legalMoves;
};
