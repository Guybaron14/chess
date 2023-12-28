import { BLACK, EMPTY, WHITE } from '../types';
import { isCapturePossible, tileNumberToString } from '../utils';

const rookCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: string[]) => {
    if (board[row][col] === EMPTY) {
        legalMoves.push(tileNumberToString(row, col));
        return false;
    } else if (
        (turn === WHITE && isCapturePossible(board, row, col, WHITE)) ||
        (turn === BLACK && isCapturePossible(board, row, col, BLACK))
    ) {
        legalMoves.push(tileNumberToString(row, col));
        return true;
    }

    return true;
};

export const getRookMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];

    for (let index = row + 1; index < 8; index++) {
        if (rookCheck(board, index, col, turn, legalMoves)) break;
    }

    for (let index = row - 1; index >= 0; index--) {
        if (rookCheck(board, index, col, turn, legalMoves)) break;
    }

    for (let index = col + 1; index < 8; index++) {
        if (rookCheck(board, row, index, turn, legalMoves)) break;
    }

    for (let index = col - 1; index >= 0; index--) {
        if (rookCheck(board, row, index, turn, legalMoves)) break;
    }

    return legalMoves;
};
