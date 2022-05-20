import { isCapturePossible, tileNumberToString } from './utils';

export const getPawnMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];
    if (turn === 'w') {
        if (/^[A-Z]+$/.test(board[row][col])) {
            if (board[row - 1][col] === '0') {
                legalMoves.push(tileNumberToString(row - 1, col));
            }
            if (row === 6) {
                if (board[row - 1][col] === '0' && board[row - 2][col] === '0') {
                    legalMoves.push(tileNumberToString(row - 2, col));
                }
            }
            if (col > 0 && isCapturePossible(board, row - 1, col - 1, 'w')) {
                legalMoves.push(tileNumberToString(row - 1, col - 1));
            }
            if (col < 7 && isCapturePossible(board, row - 1, col + 1, 'w')) {
                legalMoves.push(tileNumberToString(row - 1, col + 1));
            }
        }
    } else {
        if (/^[a-z]+$/.test(board[row][col])) {
            if (board[row + 1][col] === '0') {
                legalMoves.push(tileNumberToString(row + 1, col));
            }
            if (row === 1) {
                if (board[row + 1][col] === '0' && board[row + 2][col] === '0') {
                    legalMoves.push(tileNumberToString(row + 2, col));
                }
            }
            if (col > 0 && isCapturePossible(board, row + 1, col - 1, 'b')) {
                legalMoves.push(tileNumberToString(row + 1, col - 1));
            }
            if (col < 7 && isCapturePossible(board, row + 1, col + 1, 'b')) {
                legalMoves.push(tileNumberToString(row + 1, col + 1));
            }
        }
    }

    return legalMoves;
};
