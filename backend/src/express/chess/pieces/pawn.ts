import { BLACK, Board, EMPTY, Move, WHITE } from '../types';
import { isCapturePossible, tileNumberToString, convertTileToNumber } from '../utils';

export const getPawnMoves = (board: Board, row: number, col: number, turn: string, enPassant?: string) => {
    const legalMoves: Move[] = [];

    if (turn === WHITE) {
        if (board[row - 1][col] === EMPTY) legalMoves.push({ move: tileNumberToString(row - 1, col), score: 0 });

        if (row === 6)
            if (board[row - 1][col] === EMPTY && board[row - 2][col] === EMPTY)
                legalMoves.push({ move: tileNumberToString(row - 2, col), score: 0 });

        if (col > 0 && isCapturePossible(board, row - 1, col - 1, WHITE))
            legalMoves.push({ move: tileNumberToString(row - 1, col - 1), score: 2 });

        if (col < 7 && isCapturePossible(board, row - 1, col + 1, WHITE))
            legalMoves.push({ move: tileNumberToString(row - 1, col + 1), score: 2 });

        if (enPassant) {
            const enPassantRow = Math.floor(convertTileToNumber(enPassant) / 8);
            const enPassantCol = convertTileToNumber(enPassant) % 8;

            if (row - 1 === enPassantRow && Math.abs(col - enPassantCol) === 1)
                legalMoves.push({ move: enPassant, score: 2 });
        }
    } else {
        if (board[row + 1][col] === EMPTY) legalMoves.push({ move: tileNumberToString(row + 1, col), score: 0 });

        if (row === 1)
            if (board[row + 1][col] === EMPTY && board[row + 2][col] === EMPTY)
                legalMoves.push({ move: tileNumberToString(row + 2, col), score: 0 });

        if (col > 0 && isCapturePossible(board, row + 1, col - 1, BLACK))
            legalMoves.push({ move: tileNumberToString(row + 1, col - 1), score: 2 });

        if (col < 7 && isCapturePossible(board, row + 1, col + 1, BLACK))
            legalMoves.push({ move: tileNumberToString(row + 1, col + 1), score: 2 });

        if (enPassant) {
            const enPassantRow = Math.floor(convertTileToNumber(enPassant) / 8);
            const enPassantCol = convertTileToNumber(enPassant) % 8;

            if (row + 1 === enPassantRow && Math.abs(col - enPassantCol) === 1)
                legalMoves.push({ move: enPassant, score: 2 });
        }
    }

    return legalMoves;
};
