import { Board, Move } from '../types';
import { isCapturePossible, tileNumberToString } from '../utils';

const kingCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: Move[]) => {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
        return;
    }
    if (board[row][col] === '0') {
        legalMoves.push({ move: tileNumberToString(row, col), score: 0 });
    } else if (
        (turn === 'w' && isCapturePossible(board, row, col, 'w')) ||
        (turn === 'b' && isCapturePossible(board, row, col, 'b'))
    ) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 3 });
    }
};

export const getKingMoves = (board: Board, row: number, col: number, turn: string) => {
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
