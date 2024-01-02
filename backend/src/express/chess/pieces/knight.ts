import { checkMove } from '../moves';
import { Board, KNIGHT, Move, Turn } from '../types';

const knightCheck = (board: Board, row: number, col: number, turn: Turn, legalMoves: Move[]) => {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
        return;
    }
    checkMove(board, legalMoves, row, col, turn, KNIGHT);
};

export const getKnightMoves = (board: Board, row: number, col: number, turn: Turn) => {
    const legalMoves: Move[] = [];

    knightCheck(board, row + 2, col + 1, turn, legalMoves);
    knightCheck(board, row + 2, col - 1, turn, legalMoves);
    knightCheck(board, row - 2, col + 1, turn, legalMoves);
    knightCheck(board, row - 2, col - 1, turn, legalMoves);
    knightCheck(board, row + 1, col + 2, turn, legalMoves);
    knightCheck(board, row + 1, col - 2, turn, legalMoves);
    knightCheck(board, row - 1, col + 2, turn, legalMoves);
    knightCheck(board, row - 1, col - 2, turn, legalMoves);

    return legalMoves;
};
