import { isCapturePossible, tileNumberToString } from './utils';

const knightCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: string[]) => {
    if (row > 7 || row < 0 || col > 7 || col < 0) {
        return;
    }
    if (board[row][col] === '0') {
        legalMoves.push(tileNumberToString(row, col));
    } else if (
        (turn === 'w' && isCapturePossible(board, row, col, 'w')) ||
        (turn === 'b' && isCapturePossible(board, row, col, 'b'))
    ) {
        legalMoves.push(tileNumberToString(row, col));
    }
};

export const getKnightMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];
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
