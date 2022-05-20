import { isCapturePossible, tileNumberToString } from './utils';

const rookCheck = (board: string[][], row: number, col: number, turn: string, legalMoves: string[]) => {
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

export const getRookMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];
    for (let index= row + 1; index< 8; index++) {
        if (rookCheck(board, index, col, turn, legalMoves)) {
            break;
        }
    }

    for (let index= row - 1; index>= 0; index--) {
        if (rookCheck(board, index, col, turn, legalMoves)) {
            break;
        }
    }

    for (let index= col + 1; index< 8; index++) {
        if (rookCheck(board, row, index, turn, legalMoves)) {
            break;
        }
    }

    for (let index= col - 1; index>= 0; index--) {
        if (rookCheck(board, row, index, turn, legalMoves)) {
            break;
        }
    }

    return legalMoves;
};
