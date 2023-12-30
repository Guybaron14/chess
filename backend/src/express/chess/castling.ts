import { KING_BLACK, KING_WHITE, QUEEN_BLACK, QUEEN_WHITE, ROOK_BLACK, ROOK_WHITE, WHITE } from './types';

export const getCastlingMoves = (board: string[][], castling: string, turn: string) => {
    const legalMoves: string[] = [];

    if (turn === WHITE) {
        if (castling.includes(KING_WHITE)) {
            if (
                board[7][5] === '0' &&
                board[7][6] === '0' &&
                board[7][7] === ROOK_WHITE &&
                board[7][4] === KING_WHITE
            ) {
                legalMoves.push('O-O');
            }
        }
        if (castling.includes(QUEEN_WHITE)) {
            if (
                board[7][1] === '0' &&
                board[7][2] === '0' &&
                board[7][3] === '0' &&
                board[7][0] === ROOK_WHITE &&
                board[7][4] === KING_WHITE
            ) {
                legalMoves.push('O-O-O');
            }
        }
    } else {
        if (castling.includes(KING_BLACK)) {
            if (
                board[0][5] === '0' &&
                board[0][6] === '0' &&
                board[0][7] === ROOK_BLACK &&
                board[0][4] === KING_BLACK
            ) {
                legalMoves.push('O-O');
            }
        }
        if (castling.includes(QUEEN_BLACK)) {
            if (
                board[0][1] === '0' &&
                board[0][2] === '0' &&
                board[0][3] === '0' &&
                board[0][0] === ROOK_BLACK &&
                board[0][4] === KING_BLACK
            ) {
                legalMoves.push('O-O-O');
            }
        }
    }

    return legalMoves;
};
