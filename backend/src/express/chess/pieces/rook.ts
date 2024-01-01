import { BLACK, Board, EMPTY, Move, WHITE } from '../types';
import { isCapturePossible, tileNumberToString } from '../utils';

const rookCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: Move[]) => {
    if (board[row][col] === EMPTY) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 0 });
        return false;
    } else if (
        (turn === WHITE && isCapturePossible(board, row, col, WHITE)) ||
        (turn === BLACK && isCapturePossible(board, row, col, BLACK))
    ) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 1 });
        return true;
    }

    return true;
};

export const getRookMoves = (board: Board, row: number, col: number, turn: string) => {
    const legalMoves: Move[] = [];

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
