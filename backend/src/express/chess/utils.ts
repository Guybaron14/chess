import {
    BISHOP_BLACK,
    BISHOP_WHITE,
    Board,
    KING_BLACK,
    KING_WHITE,
    KNIGHT_BLACK,
    KNIGHT_WHITE,
    PAWN_BLACK,
    PAWN_WHITE,
    QUEEN_BLACK,
    QUEEN_WHITE,
    ROOK_BLACK,
    ROOK_WHITE,
    WHITE,
} from './types';

export const tileNumberToString = (row: number, col: number): string => {
    return `${String.fromCharCode(col + 97)}${8 - row}`;
};

export const isCapturePossible = (board: Board, row: number, col: number, turn: string) => {
    if (turn === WHITE) {
        if (
            board[row][col] === PAWN_BLACK ||
            board[row][col] === KNIGHT_BLACK ||
            board[row][col] === BISHOP_BLACK ||
            board[row][col] === ROOK_BLACK ||
            board[row][col] === QUEEN_BLACK ||
            board[row][col] === KING_BLACK
        )
            return board[row][col];
    } else {
        if (
            board[row][col] === PAWN_WHITE ||
            board[row][col] === KNIGHT_WHITE ||
            board[row][col] === BISHOP_WHITE ||
            board[row][col] === ROOK_WHITE ||
            board[row][col] === QUEEN_WHITE ||
            board[row][col] === KING_WHITE
        )
            return board[row][col];
    }

    return false;
};

export const convertTileToNumber = (tile: string) => {
    let [col, row] = tile.split('');
    return 64 - (8 - (col.charCodeAt(0) - 97)) - (Number(row) - 1) * 8;
};
