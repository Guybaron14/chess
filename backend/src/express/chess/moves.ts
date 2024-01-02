import { scoresMap } from './bot/evaluate';
import { getCastlingMoves } from './castling';
import { checkCheck } from './check';
import { getBishopMoves } from './pieces/bishop';
import { getKingMoves } from './pieces/king';
import { getKnightMoves } from './pieces/knight';
import { getPawnMoves } from './pieces/pawn';
import { getQueenMoves } from './pieces/queen';
import { getRookMoves } from './pieces/rook';
import { PAWN, ROOK, BISHOP, QUEEN, KNIGHT, KING, Board, Turn, EMPTY, WHITE, BLACK, Move, Piece } from './types';
import { isCapturePossible, tileNumberToString } from './utils';

const movesMap = {
    [PAWN]: getPawnMoves,
    [ROOK]: getRookMoves,
    [BISHOP]: getBishopMoves,
    [QUEEN]: getQueenMoves,
    [KNIGHT]: getKnightMoves,
    [KING]: getKingMoves,
};

export const getLegalMoves = (
    board: Board,
    turn: Turn,
    casteling: string,
    enPassant?: string,
): Record<string, Move[]> => {
    const legalMoves: Record<string, Move[]> = {};
    legalMoves['castling'] = getCastlingMoves(board, casteling, turn);

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const piece = board[i][j];

            if (piece === EMPTY) continue;
            if (turn === WHITE && piece !== piece.toUpperCase()) continue;
            if (turn === BLACK && piece !== piece.toLowerCase()) continue;

            // bishop bug
            const possibleMoves =
                piece.toUpperCase() === PAWN
                    ? getPawnMoves(board, i, j, turn, enPassant)
                    : (movesMap[piece.toUpperCase()] || getBishopMoves)(board, i, j, turn);

            legalMoves[tileNumberToString(i, j)] = possibleMoves;
        }
    }

    for (let key in legalMoves) {
        for (let i = 0; i < legalMoves[key].length; i++) {
            if (checkCheck(board, key, legalMoves[key][i].move, turn as Turn)) {
                legalMoves[key].splice(i, 1);
                i--;
            }
        }
    }

    return legalMoves;
};

export const checkMove = (board: Board, legalMoves: Move[], row: number, col: number, turn: Turn, piece: Piece) => {
    if (board[row][col] === EMPTY) {
        legalMoves.push({ move: tileNumberToString(row, col), score: 0 });
        return false;
    } else {
        const capturedPiece = isCapturePossible(board, row, col, turn);
        if (capturedPiece)
            legalMoves.push({
                move: tileNumberToString(row, col),
                score:
                    scoresMap[capturedPiece] > scoresMap[piece]
                        ? 2
                        : Math.abs(scoresMap[capturedPiece] - scoresMap[piece]) <= 10
                        ? 1.5
                        : scoresMap[piece] - scoresMap[capturedPiece] > 500
                        ? -0.5
                        : 1,
            });
    }

    return true;
};
