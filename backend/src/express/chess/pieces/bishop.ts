import { Board, Move } from '../types';
import { isCapturePossible, tileNumberToString } from '../utils';

const bishopCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: Move[]) => {
    if (board[row][col] === '0') {
        legalMoves.push({ move: tileNumberToString(row, col), score: 0 });
    } else if (
        (turn === 'w' && isCapturePossible(board, row, col, 'w')) ||
        (turn === 'b' && isCapturePossible(board, row, col, 'b'))
    ) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 1 });
        return true;
    } else {
        return true;
    }

    return false;
};

export const getBishopMoves = (board: Board, row: number, col: number, turn: string) => {
    const legalMoves: Move[] = [];

    let i = row + 1;
    let j = col + 1;
    while (i < 8 && j <= 7) {
        if (bishopCheck(board, i, j, turn, legalMoves)) {
            break;
        }
        i++;
        j++;
    }

    i = row - 1;
    j = col - 1;
    while (i >= 0 && j >= 0) {
        if (bishopCheck(board, i, j, turn, legalMoves)) {
            break;
        }
        i--;
        j--;
    }

    i = row - 1;
    j = col + 1;
    while (i >= 0 && j <= 7) {
        if (bishopCheck(board, i, j, turn, legalMoves)) {
            break;
        }
        i--;
        j++;
    }

    i = row + 1;
    j = col - 1;
    while (i <= 7 && j >= 0) {
        if (bishopCheck(board, i, j, turn, legalMoves)) {
            break;
        }
        i++;
        j--;
    }

    return legalMoves;
};
