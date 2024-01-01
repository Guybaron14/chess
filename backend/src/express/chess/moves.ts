import { getCastlingMoves } from './castling';
import { checkCheck } from './check';
import { getBishopMoves } from './pieces/bishop';
import { getKingMoves } from './pieces/king';
import { getKnightMoves } from './pieces/knight';
import { getPawnMoves } from './pieces/pawn';
import { getQueenMoves } from './pieces/queen';
import { getRookMoves } from './pieces/rook';
import { PAWN, ROOK, BISHOP, QUEEN, KNIGHT, KING, Board, Turn, EMPTY, WHITE, BLACK, Move } from './types';
import { tileNumberToString } from './utils';

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

            const possibleMoves =
                piece.toUpperCase() === PAWN
                    ? getPawnMoves(board, i, j, turn, enPassant)
                    : movesMap[piece.toUpperCase()](board, i, j, turn);

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
