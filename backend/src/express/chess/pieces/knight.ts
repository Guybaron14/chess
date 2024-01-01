import { Board, Move } from '../types';
import { isCapturePossible, tileNumberToString } from '../utils';

const knightCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: Move[]) => {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
        return;
    }
    if (board[row][col] === '0') {
        legalMoves.push({ move: tileNumberToString(row, col), score: 0 });
    } else if (
        (turn === 'w' && isCapturePossible(board, row, col, 'w')) ||
        (turn === 'b' && isCapturePossible(board, row, col, 'b'))
    ) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 1 });
    }
};

export const getKnightMoves = (board: Board, row: number, col: number, turn: string) => {
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
