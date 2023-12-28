import { BLACK, EMPTY, WHITE } from '../types';
import { isCapturePossible, tileNumberToString, convertTileToNumber } from '../utils';

export const getPawnMoves = (
    board: Array<Array<string>>,
    row: number,
    col: number,
    turn: string,
    enPassant?: string,
) => {
    const legalMoves: Array<string> = [];
    if (turn === WHITE) {
        if (/^[A-Z]+$/.test(board[row][col])) {
            if (board[row - 1][col] === EMPTY) legalMoves.push(tileNumberToString(row - 1, col));

            if (row === 6)
                if (board[row - 1][col] === EMPTY && board[row - 2][col] === EMPTY)
                    legalMoves.push(tileNumberToString(row - 2, col));

            if (col > 0 && isCapturePossible(board, row - 1, col - 1, WHITE))
                legalMoves.push(tileNumberToString(row - 1, col - 1));

            if (col < 7 && isCapturePossible(board, row - 1, col + 1, WHITE))
                legalMoves.push(tileNumberToString(row - 1, col + 1));

            if (enPassant) {
                const enPassantRow = Math.floor(convertTileToNumber(enPassant) / 8);
                const enPassantCol = convertTileToNumber(enPassant) % 8;

                if (row - 1 === enPassantRow && Math.abs(col - enPassantCol) === 1) legalMoves.push(enPassant);
            }
        }
    } else {
        if (/^[a-z]+$/.test(board[row][col])) {
            if (board[row + 1][col] === EMPTY) legalMoves.push(tileNumberToString(row + 1, col));

            if (row === 1)
                if (board[row + 1][col] === EMPTY && board[row + 2][col] === EMPTY)
                    legalMoves.push(tileNumberToString(row + 2, col));

            if (col > 0 && isCapturePossible(board, row + 1, col - 1, BLACK))
                legalMoves.push(tileNumberToString(row + 1, col - 1));

            if (col < 7 && isCapturePossible(board, row + 1, col + 1, BLACK))
                legalMoves.push(tileNumberToString(row + 1, col + 1));

            if (enPassant) {
                const enPassantRow = Math.floor(convertTileToNumber(enPassant) / 8);
                const enPassantCol = convertTileToNumber(enPassant) % 8;

                if (row + 1 === enPassantRow && Math.abs(col - enPassantCol) === 1) legalMoves.push(enPassant);
            }
        }
    }

    return legalMoves;
};
