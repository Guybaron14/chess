import { checkMove } from '../moves';
import { Board, KING, Move, Turn } from '../types';

const kingCheck = (board: Board, row: number, col: number, turn: Turn, legalMoves: Move[]) => {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
        return;
    }
    checkMove(board, legalMoves, row, col, turn, KING);
};

export const getKingMoves = (board: Board, row: number, col: number, turn: Turn) => {
    const legalMoves: Move[] = [];

    kingCheck(board, row + 1, col + 1, turn, legalMoves);
    kingCheck(board, row + 1, col - 1, turn, legalMoves);
    kingCheck(board, row - 1, col + 1, turn, legalMoves);
    kingCheck(board, row - 1, col - 1, turn, legalMoves);
    kingCheck(board, row + 1, col, turn, legalMoves);
    kingCheck(board, row - 1, col, turn, legalMoves);
    kingCheck(board, row, col + 1, turn, legalMoves);
    kingCheck(board, row, col - 1, turn, legalMoves);

    return legalMoves;
};
