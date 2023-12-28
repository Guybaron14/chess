import { isCapturePossible, tileNumberToString } from '../utils';

const kingCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: string[]) => {
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

export const getKingMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];
    kingCheck(board, row + 1, col + 1, turn, legalMoves);
    kingCheck(board, row + 1, col - 1, turn, legalMoves);
    kingCheck(board, row - 1, col + 1, turn, legalMoves);
    kingCheck(board, row - 1, col - 1, turn, legalMoves);
    kingCheck(board, row + 1, col, turn, legalMoves);
    kingCheck(board, row - 1, col, turn, legalMoves);
    kingCheck(board, row , col + 1, turn, legalMoves);
    kingCheck(board, row , col - 1, turn, legalMoves);
    return legalMoves;
};
