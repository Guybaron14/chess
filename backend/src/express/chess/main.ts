import { checkCheck } from './check';
import { getQueenMoves } from './pieces/queen';
import { getBishopMoves } from './pieces/bishop';
import { getPawnMoves } from './pieces/pawn';
import { getRookMoves } from './pieces/rook';
import { tileNumberToString } from './utils';
import { getKnightMoves } from './pieces/knight';
import { getKingMoves } from './pieces/king';
import { getCastlingMoves } from './castling';
import { BISHOP, BLACK, Board, EMPTY, KING, KNIGHT, PAWN, QUEEN, ROOK, Turn, WHITE } from './types';
import { minimax } from './bot/minimax';

const movesMap = {
    [PAWN]: getPawnMoves,
    [ROOK]: getRookMoves,
    [BISHOP]: getBishopMoves,
    [QUEEN]: getQueenMoves,
    [KNIGHT]: getKnightMoves,
    [KING]: getKingMoves,
};

export const getLegalMoves = (board: Board, turn: Turn, casteling: string, enPassant?: string) => {
    const legalMoves = {};
    legalMoves['castling'] = getCastlingMoves(board, casteling, turn);

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const piece = board[i][j];

            if (piece === EMPTY) continue;
            if (turn === WHITE && piece !== piece.toUpperCase()) continue;
            if (turn === BLACK && piece !== piece.toLowerCase()) continue;

            const possibleMoves =
                piece.toLowerCase() === PAWN
                    ? getPawnMoves(board, i, j, turn, enPassant)
                    : movesMap[piece.toUpperCase()](board, i, j, turn);

            legalMoves[tileNumberToString(i, j)] = possibleMoves;
        }
    }

    for (let key in legalMoves) {
        for (let i = 0; i < legalMoves[key].length; i++) {
            if (checkCheck(board, key, legalMoves[key][i], turn as Turn)) {
                legalMoves[key].splice(i, 1);
                i--;
            }
        }
    }

    return legalMoves;
};

export const main = (board: Board, gameString: string) => {
    const [turn, casteling, enPassant, _moveCounter] = gameString.split('-');

    const legalMoves = getLegalMoves(board, turn as Turn, casteling, enPassant);

    if (turn === BLACK) {
        console.log("Calculating bot's move...");
        console.log(minimax(board, 5, false, -Infinity, Infinity, 5,  casteling, enPassant));
    }

    return legalMoves;
};
