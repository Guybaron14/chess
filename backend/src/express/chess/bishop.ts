import { isCapturePossible, tileNumberToString } from './utils';

const bishopCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: string[]) => {
    if (board[row][col] === '0') {
        legalMoves.push(tileNumberToString(row, col));
    } else if (
        (turn === 'w' && isCapturePossible(board, row, col, 'w')) ||
        (turn === 'b' && isCapturePossible(board, row, col, 'b'))
    ) {
        legalMoves.push(tileNumberToString(row, col));
        return true;
    } else {
        return true;
    }

    return false;
};

export const getBishopMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];

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
