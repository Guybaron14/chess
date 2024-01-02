import { BLACK, Board, EMPTY, Move, PAWN, Turn, WHITE } from '../types';
import { isCapturePossible, tileNumberToString, convertTileToNumber } from '../utils';

const calcPawnOrderWeight = (board: Board, row: number, col: number, turn: Turn) => {
    const plusOne = turn === WHITE ? -1 : 1;
    if (row + plusOne < 0 || row + plusOne > 7 || col - 1 < 0 || col + 1 > 7) return 0;
    return (board[row + plusOne][col - 1] !== EMPTY && board[row + plusOne][col - 1]?.toUpperCase() !== PAWN) ||
        (board[row + plusOne][col + 1] !== EMPTY && board[row + plusOne][col + 1]?.toUpperCase() !== PAWN)
        ? 1
        : 0;
};

export const getPawnMoves = (board: Board, row: number, col: number, turn: string, enPassant?: string) => {
    const legalMoves: Move[] = [];

    if (turn === WHITE) {
        if (board[row - 1][col] === EMPTY)
            legalMoves.push({
                move: tileNumberToString(row - 1, col),
                score: calcPawnOrderWeight(board, row - 1, col, WHITE),
            });

        if (row === 6)
            if (board[row - 1][col] === EMPTY && board[row - 2][col] === EMPTY) {
                legalMoves.push({
                    move: tileNumberToString(row - 2, col),
                    score: calcPawnOrderWeight(board, row - 2, col, WHITE),
                });
            }
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
        if (board[row + 1][col] === EMPTY)
            legalMoves.push({
                move: tileNumberToString(row + 1, col),
                score: calcPawnOrderWeight(board, row + 1, col, WHITE),
            });

        if (row === 1)
            if (board[row + 1][col] === EMPTY && board[row + 2][col] === EMPTY)
                legalMoves.push({
                    move: tileNumberToString(row + 2, col),
                    score: calcPawnOrderWeight(board, row + 2, col, WHITE),
                });

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
